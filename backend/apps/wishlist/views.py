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
        # Filter out orphaned product references
        valid_items = []
        for item in wishlist:
            if item.product:
                valid_items.append(item)
            else:
                
                item.delete()
        
        serializer = WishlistSerializer(valid_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        product_id = request.data.get('product_id')
        product = get_object_or_404(Product, id=product_id)

        wishlist_items = Wishlist.objects.filter(
            user=request.user,
            product=product
        )

        if wishlist_items.exists():
            # Already exists, cleanup duplicates if any
            if wishlist_items.count() > 1:
                wishlist_item = wishlist_items[0]
                wishlist_items.exclude(id=wishlist_item.id).delete()
            return Response(
                {"detail": "Product already in wishlist"},
                status=status.HTTP_400_BAD_REQUEST
            )

        Wishlist.objects.create(
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

