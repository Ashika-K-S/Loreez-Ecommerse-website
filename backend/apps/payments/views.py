from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from django.shortcuts import get_object_or_404
from django.db import transaction

from apps.orders.models import Order
from .models import Payment
from .gateway import client

import hmac
import hashlib


from django.db import transaction
from django.utils import timezone


class CreatePaymentView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request, order_id):
        order = get_object_or_404(
            Order,
            id=order_id,
            user=request.user
        )

        if order.status != "pending":
            return Response(
                {"detail": "Order already processed"},
                status=status.HTTP_400_BAD_REQUEST
            )

       
        razorpay_order = client.order.create({
            "amount": int(order.total_amount * 100),  # paise
            "currency": "INR",
            "payment_capture": 1
        })

        payment = Payment.objects.create(
            order=order,
            gateway="razorpay",
            amount=order.total_amount,
            status="created",
            payment_id=razorpay_order["id"]
        )

        return Response({
            "razorpay_order_id": razorpay_order["id"],
            "amount": order.total_amount,
            "key": "PUBLIC_KEY_GOES_TO_FRONTEND"
        })


class VerifyPaymentView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        data = request.data

        payment = get_object_or_404(
            Payment,
            payment_id=data["razorpay_order_id"]
        )

        order = Order.objects.select_for_update().get(
            id=payment.order.id
        )

        if order.status != "pending":
            return Response(
                {"detail": "Order already processed"},
                status=status.HTTP_400_BAD_REQUEST
            )

       
        generated_signature = hmac.new(
            settings.RAZORPAY_KEY_SECRET.encode(),
            f"{data['razorpay_order_id']}|{data['razorpay_payment_id']}".encode(),
            hashlib.sha256
        ).hexdigest()

        if generated_signature != data["razorpay_signature"]:
            payment.status = "failed"
            payment.save()
            return Response(
                {"detail": "Payment verification failed"},
                status=status.HTTP_400_BAD_REQUEST
            )

        payment.status = "success"
        payment.save()

        order.status = "paid"
        order.paid_at = timezone.now()
        order.save()

        return Response({"detail": "Payment successful"})
