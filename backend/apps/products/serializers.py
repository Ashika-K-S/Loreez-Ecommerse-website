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
        
        image_url = str(obj.image)
        
        # If it's already a full URL, return it
        if image_url.startswith(('http://', 'https://')):
            return image_url
            
        # Try to use request context to build absolute URI
        request = self.context.get('request')
        if request:
            try:
                return request.build_absolute_uri(obj.image.url)
            except:
                pass
                
        # Manual S3 domain fallback if configured
        from django.conf import settings
        aws_domain = getattr(settings, 'AWS_S3_CUSTOM_DOMAIN', None)
        if aws_domain:
            return f"https://{aws_domain}/{image_url.lstrip('/')}"
            
        # Last resort: simple path
        return image_url
