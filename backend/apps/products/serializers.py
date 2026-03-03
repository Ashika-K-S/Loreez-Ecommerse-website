from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    
    # Redefine image to allow both strings and internal file objects during creation
    image = serializers.Field(required=False, allow_null=True)

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'category', 'category_name', 'category_slug',
            'price', 'stock', 'image', 'description', 'discount',
            'shipping_days', 'return_policy', 'created_at',
        ]

    def _handle_upload(self, validated_data):
        image_data = validated_data.get('image')
        # If it's a file-like object (not a string), upload to S3 manually
        if image_data and not isinstance(image_data, str):
            from django.core.files.storage import default_storage
            filename = getattr(image_data, 'name', 'product_image.jpg')
            path = default_storage.save(f"products/{filename}", image_data)
            validated_data['image'] = default_storage.url(path)
        return validated_data

    def create(self, validated_data):
        validated_data = self._handle_upload(validated_data)
        return super().create(validated_data)

    def update(self, instance, validated_data):
        validated_data = self._handle_upload(validated_data)
        return super().update(instance, validated_data)

    def to_representation(self, instance):
        data = super().to_representation(instance)
        
        # Defensive check for image URL representation
        image_val = data.get('image')
        if not image_val:
            return data
            
        image_str = str(image_val)
        if not image_str.startswith(('http://', 'https://')):
            request = self.context.get('request')
            if request:
                data['image'] = request.build_absolute_uri(image_str)
        else:
            data['image'] = image_str
            
        return data
