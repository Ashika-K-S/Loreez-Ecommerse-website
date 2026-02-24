from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser

from django.db.models import Sum, F, ExpressionWrapper, DecimalField
from django.db.models.functions import TruncMonth
from django.utils.timezone import now

from apps.orders.models import Order, OrderItem




class AdminMonthlyRevenueView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        year = request.query_params.get("year")

  
        if not year:
            year = now().year
        else:
            try:
                year = int(year)
            except ValueError:
                return Response({"error": "Invalid year"}, status=400)

        monthly_data = (
            Order.objects
            .filter(status="delivered", created_at__year=year)
            .annotate(month=TruncMonth("created_at"))
            .values("month")
            .annotate(revenue=Sum("total_amount"))
            .order_by("month")
        )

        result = [
            {
                "month": entry["month"].strftime("%Y-%m"),
                "revenue": float(entry["revenue"]) if entry["revenue"] else 0
            }
            for entry in monthly_data
        ]

        return Response({
            "year": year,
            "data": result
        })





class AdminTopSellingProductsView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        limit = request.query_params.get("limit", 5)

        try:
            limit = int(limit)
        except ValueError:
            return Response({"error": "Invalid limit value"}, status=400)

        top_products = (
            OrderItem.objects
            .filter(order__status="delivered")
            .values("product", "product__name")
            .annotate(
                total_quantity_sold=Sum("quantity"),
                total_revenue=Sum(
                    ExpressionWrapper(
                        F("price") * F("quantity"),
                        output_field=DecimalField()
                    )
                )
            )
            .order_by("-total_quantity_sold")[:limit]
        )

        result = [
            {
                "product_id": item["product"],
                "product_name": item["product__name"],
                "total_quantity_sold": item["total_quantity_sold"],
                "total_revenue": float(item["total_revenue"]) if item["total_revenue"] else 0
            }
            for item in top_products
        ]

        return Response(result)



class AdminCategoryRevenueView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):

        category_data = (
            OrderItem.objects
            .filter(order__status="delivered")
            .values("product__category", "product__category__name")
            .annotate(
                total_quantity_sold=Sum("quantity"),
                total_revenue=Sum(
                    ExpressionWrapper(
                        F("price") * F("quantity"),
                        output_field=DecimalField()
                    )
                )
            )
            .order_by("-total_revenue")
        )

        result = [
            {
                "category_id": item["product__category"],
                "category_name": item["product__category__name"],
                "total_quantity_sold": item["total_quantity_sold"],
                "total_revenue": float(item["total_revenue"]) if item["total_revenue"] else 0
            }
            for item in category_data
        ]

        return Response(result)