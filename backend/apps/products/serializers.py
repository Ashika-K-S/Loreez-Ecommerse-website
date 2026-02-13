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
