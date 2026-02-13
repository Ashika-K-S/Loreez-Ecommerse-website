from django.urls import path
from .views import CartView, AddToCartView, CartItemDetailView

urlpatterns = [
    path('', CartView.as_view()),
    path('add/', AddToCartView.as_view()),
    path('item/<int:item_id>/', CartItemDetailView.as_view()),
]
