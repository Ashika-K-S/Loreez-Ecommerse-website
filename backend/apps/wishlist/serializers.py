from rest_framework import serializers
from .models import Wishlist
from apps.products.models import Product


class WishlistProductSerializer(serializers.ModelSerializer):
    image = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = ['id', 'name', 'image', 'price']

    def get_image(self, obj):
        if obj.image and not obj.image.startswith('http'):
            return f"http://127.0.0.1:8000/static/{obj.image}"
        return obj.image


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
