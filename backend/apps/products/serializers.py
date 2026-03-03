from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug']


class ProductSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source='category.name', read_only=True)
    category_slug = serializers.CharField(source='category.slug', read_only=True)
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = [
            'id',
            'name',
            'category',
            'category_name',
            'category_slug',
            'price',
            'stock',
            'image',
            'description',
            'discount',
            'shipping_days',
            'return_policy',
            'created_at',
        ]

    def get_image(self, obj):
        if not obj.image:
            return None
        
        # If it's a FileField/ImageField, use its .url property
        # django-storages will automatically return the full S3 URL
        try:
            url = obj.image.url
            if url:
                # If for some reason it's relative, make it absolute using request
                if not url.startswith(('http://', 'https://')):
                    request = self.context.get('request')
                    if request:
                        return request.build_absolute_uri(url)
                return url
        except Exception:
            # Fallback if .url fails (e.g. if data in DB is just a string URL)
            image_str = str(obj.image)
            if image_str.startswith(('http://', 'https://')):
                return image_str
        
        return None
