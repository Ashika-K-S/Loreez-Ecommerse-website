from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer
from ..admin_api.permissions import IsAdminUserOnly
from .pagination import ProductPagination

class CategoryListView(APIView):
    def get(self, request):
        categories = Category.objects.all()
        serializer = CategorySerializer(categories, many=True)
        return Response(serializer.data)

class ProductListView(APIView):

    def get(self, request):
        products = Product.objects.all()

        category_slug = request.query_params.get("category")
        if category_slug and category_slug != "All":
            products = products.filter(category__slug=category_slug)

        search_query = request.query_params.get("search")
        if search_query:
            from django.db.models import Q
            products = products.filter(
                Q(name__icontains=search_query) | 
                Q(description__icontains=search_query) |
                Q(category__name__icontains=search_query)
            )

        if request.query_params.get("no_pagination") == "true":
            serializer = ProductSerializer(products, many=True)
            return Response(serializer.data)

        paginator = ProductPagination()
        paginated_products = paginator.paginate_queryset(products, request)

        serializer = ProductSerializer(paginated_products, many=True)
        return paginator.get_paginated_response(serializer.data)

    def post(self, request):
        if not request.user.is_authenticated or request.user.role != "admin":
            return Response(
                {"detail": "Admin only"},
                status=status.HTTP_403_FORBIDDEN
            )

        serializer = ProductSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data, status=status.HTTP_201_CREATED)


class ProductDetailView(APIView):

    def get_object(self, pk):
        return get_object_or_404(Product, pk=pk)

    def get(self, request, pk):
        product = self.get_object(pk)
        return Response(ProductSerializer(product).data)

    def put(self, request, pk):
        if not request.user.is_authenticated or request.user.role != "admin":
            return Response(
                {"detail": "Admin only"},
                status=status.HTTP_403_FORBIDDEN
            )

        product = self.get_object(pk)
        serializer = ProductSerializer(product, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        return Response(serializer.data)

    def patch(self, request, pk):
        return self.put(request, pk)

    def delete(self, request, pk):
        if not request.user.is_authenticated or request.user.role != "admin":
            return Response(
                {"detail": "Admin only"},
                status=status.HTTP_403_FORBIDDEN
            )

        product = self.get_object(pk)
        product.delete()

        return Response(status=status.HTTP_204_NO_CONTENT)
