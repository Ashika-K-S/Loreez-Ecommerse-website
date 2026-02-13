from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404

from .models import Wishlist
from .serializers import WishlistSerializer
from apps.products.models import Product


class WishlistView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        wishlist = Wishlist.objects.filter(user=request.user)
        serializer = WishlistSerializer(wishlist, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product_id')
        product = get_object_or_404(Product, id=product_id)

        wishlist_item, created = Wishlist.objects.get_or_create(
            user=request.user,
            product=product
        )

        if not created:
            return Response(
                {"detail": "Product already in wishlist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        return Response(
            {"detail": "Added to wishlist"},
            status=status.HTTP_201_CREATED
        )


class WishlistDeleteView(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        wishlist_item = get_object_or_404(
            Wishlist,
            id=pk,
            user=request.user
        )
        wishlist_item.delete()
        return Response(
            {"detail": "Removed from wishlist"},
            status=status.HTTP_204_NO_CONTENT
        )

