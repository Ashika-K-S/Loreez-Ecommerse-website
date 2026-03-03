from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'category_slug',
            'price', 'stock', 'image', 'description', 'discount',
            'shipping_days', 'return_policy', 'created_at',
        ]

    def _handle_upload(self, validated_data):
        image_data = validated_data.get('image')
        # If it's a file (not a string), we upload it manually
        if image_data and not isinstance(image_data, str):
            from django.core.files.storage import default_storage
            # Save the file to S3
            path = default_storage.save(f"products/{getattr(image_data, 'name', 'upload.jpg')}", image_data)
            # Store the resulting URL in the database
            validated_data['image'] = default_storage.url(path)
        return validated_data

    def validate_image(self, value):
        # Allow both strings (URLs) and Files (uploads)
        return value

    def create(self, validated_data):
        validated_data = self._handle_upload(validated_data)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data = self._handle_upload(validated_data)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Ensure that whatever is stored is returned as a full URL if relative
        image_url = data.get('image')
        if image_url and not image_url.startswith(('http://', 'https://')):
            request = self.context.get('request')
            if request:
                data['image'] = request.build_absolute_uri(image_url)
        return data
