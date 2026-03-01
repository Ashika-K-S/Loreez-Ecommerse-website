from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework import status

from django.db import transaction
from django.utils import timezone

from .models import Order, OrderItem
from .serializers import OrderReadSerializer
from apps.cart.models import Cart
from apps.products.models import Product

class OrderListView(APIView): 
    permission_classes = [IsAuthenticated]

    def get(self, request):
        if request.user.role == "admin":
            orders = Order.objects.all().order_by("-created_at")
        else:
            orders = Order.objects.filter(user=request.user).order_by("-created_at")

        serializer = OrderReadSerializer(orders, many=True)
        return Response(serializer.data)

class OrderDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        try:
            return Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return None

    def get(self, request, pk):
        order = self.get_object(pk)
        if not order:
            return Response(
                {"detail": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if request.user.role != "admin" and order.user != request.user:
            raise PermissionDenied("Permission denied")

        return Response(OrderReadSerializer(order).data)

class CheckoutView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        active_carts = Cart.objects.filter(
            user=request.user,
            is_active=True
        ).select_for_update().order_by('-created_at')
        
        cart = active_carts.first()
        
        if cart and active_carts.count() > 1:
            active_carts.exclude(id=cart.id).update(is_active=False)

        if not cart or not cart.items.exists():
            return Response(
                {"detail": "Cart is empty"},
                status=status.HTTP_400_BAD_REQUEST
            )

        total_amount = 0

      
        for item in cart.items.all():
            if item.quantity > item.product.stock:
                return Response(
                    {"detail": f"Not enough stock for {item.product.name}"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            total_amount += item.quantity * item.price_at_added

        order = Order.objects.create(
            user=request.user,
            total_amount=total_amount,
            status="pending"
        )

        for item in cart.items.all():
            OrderItem.objects.create(
                order=order,
                product=item.product,
                quantity=item.quantity,
                price=item.price_at_added
            )

            product = item.product
            product.stock -= item.quantity
            product.save()

        cart.is_active = False
        cart.save()

        return Response(
            {
                "detail": "Order placed successfully",
                "order_id": order.id
            },
            status=status.HTTP_201_CREATED
        )

class OrderPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, pk):
        try:
            order = Order.objects.select_for_update().get(pk=pk)
        except Order.DoesNotExist:
            return Response(
                {"detail": "Order not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        if order.user != request.user:
            raise PermissionDenied("You cannot pay for this order")

        if order.status != "pending":
            return Response(
                {
                    "detail": "Order already processed",
                    "status": order.status
                },
                status=status.HTTP_400_BAD_REQUEST
            )

 
        paid_amount = order.total_amount

        order.status = "paid"
        order.paid_at = timezone.now()
        order.save()

        return Response(
            {
                "detail": "Payment successful",
                "order_id": order.id,
                "paid_amount": paid_amount
            },
            status=status.HTTP_200_OK
        )
