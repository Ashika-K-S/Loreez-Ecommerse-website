
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import(
    TokenObtainPairView,
    TokenRefreshView,
)
urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/token/', TokenObtainPairView.as_view()),
    path('api/token/refresh/', TokenRefreshView.as_view()),
    path('api/users/', include('apps.users.urls')),
    path('api/', include('apps.products.urls')),
    path('api/orders/', include('apps.orders.urls')),
    path('api/cart/', include('apps.cart.urls')),
    path('api/wishlist/', include('apps.wishlist.urls')),
    path("api/payments/", include("apps.payments.urls")),
    path('api/admin/', include('apps.admin_api.urls')),



]
