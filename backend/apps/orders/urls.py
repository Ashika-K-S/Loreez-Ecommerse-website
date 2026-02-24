from django.urls import path
from .views import OrderListView, OrderDetailView, CheckoutView, OrderPaymentView

urlpatterns = [
    path('', OrderListView.as_view()),
    path('checkout/', CheckoutView.as_view()),
    path('<int:pk>/', OrderDetailView.as_view()),
    path('<int:pk>/pay/', OrderPaymentView.as_view()),
]
