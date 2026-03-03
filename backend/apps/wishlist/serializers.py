from rest_framework import serializers
from .models import Wishlist
from apps.products.models import Product


class WishlistProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'price']

    def get_image(self, obj):
        if not obj.image:
            return None
        
        # Safely convert to string in case it's a FieldFile or other object
        image_str = str(obj.image)
        if image_str.startswith(('http://', 'https://')):
            return image_str
            
        request = self.context.get('request')
        if request:
            # If the value is a relative path, build an absolute URI
            return request.build_absolute_uri(image_str)
            
        return image_str


class WishlistSerializer(serializers.ModelSerializer):
    product = WishlistProductSerializer(read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(
        source='product.price',
        max_digits=10,
        decimal_places=2,
        read_only=True
    )

    class Meta:
        model = Wishlist
        fields = [
            'id',
            'product',
            'product_name',
            'product_price',
            'created_at'
        ]
