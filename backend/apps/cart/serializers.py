from rest_framework import serializers
from .models import Cart, CartItem
from apps.products.models import Product


# -----------------------------
# Product Serializer (for cart)
# -----------------------------
class CartItemProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'image']
        # If using S3, Django automatically returns full URL via image.url


# -----------------------------
# Cart Item Serializer
# -----------------------------
class CartItemSerializer(serializers.ModelSerializer):
    product = CartItemProductSerializer(read_only=True)
    product_name = serializers.CharField(source='product.name', read_only=True)
    subtotal = serializers.SerializerMethodField()

    class Meta:
        model = CartItem
        fields = [
            'id',
            'product',
            'product_name',
            'quantity',
            'price_at_added',
            'subtotal'
        ]

    def get_subtotal(self, obj):
        return obj.quantity * obj.price_at_added


# -----------------------------
# Cart Serializer
# -----------------------------
class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)
    total_amount = serializers.SerializerMethodField()
    total_items = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = [
            'id',
            'items',
            'total_items',
            'total_amount'
        ]

    def get_total_amount(self, obj):
        return sum(item.quantity * item.price_at_added for item in obj.items.all())

    def get_total_items(self, obj):
        return sum(item.quantity for item in obj.items.all())