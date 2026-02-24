from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from rest_framework import status

from apps.orders.models import Order
from apps.admin_api.serializers.order_serializers import AdminOrderSerializer
from rest_framework.generics import ListAPIView
from rest_framework.permissions import IsAdminUser
from django.db.models import Prefetch

from apps.orders.models import Order
from apps.admin_api.serializers.order_serializers import AdminOrderSerializer


class AdminOrderListView(ListAPIView):
    permission_classes = [IsAdminUser]
    serializer_class = AdminOrderSerializer

    def get_queryset(self):
        queryset = (
            Order.objects
            .select_related('user')
            .prefetch_related('items__product')
            .order_by('-id')
        )

        status_filter = self.request.query_params.get('status')
        search = self.request.query_params.get('search')

        if status_filter:
            queryset = queryset.filter(status=status_filter)

        if search:
            queryset = queryset.filter(user__email__icontains=search)

        return queryset

class AdminOrderDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

        serializer = AdminOrderSerializer(order)
        return Response(serializer.data)


class AdminOrderStatusUpdateView(APIView):
    permission_classes = [IsAdminUser]

    def put(self, request, pk):
        try:
            order = Order.objects.get(pk=pk)
        except Order.DoesNotExist:
            return Response({"error": "Order not found"}, status=404)

        new_status = request.data.get("status")

        if not new_status:
            return Response({"error": "Status is required"}, status=400)

        
        valid_statuses = [choice[0] for choice in Order.STATUS_CHOICES]

        if new_status not in valid_statuses:
            return Response(
                {
                    "error": "Invalid status",
                    "allowed_statuses": valid_statuses
                },
                status=400
            )

        order.status = new_status
        order.save()

        return Response({
            "message": "Order status updated successfully",
            "order_id": order.id,
            "new_status": order.status
        })