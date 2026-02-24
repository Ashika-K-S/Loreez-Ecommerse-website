from django.urls import path
from apps.admin_api.views.dashboard_views import AdminDashboardView
from apps.admin_api.views.user_views import (AdminUserListView,AdminUserBlockView)
from apps.admin_api.views.product_views import (AdminProductListCreateView,AdminProductDetailView)
from apps.admin_api.views.order_views import (AdminOrderListView,AdminOrderDetailView,AdminOrderStatusUpdateView)
from apps.admin_api.views.order_views import (AdminOrderListView,AdminOrderDetailView,AdminOrderStatusUpdateView)
from apps.admin_api.views.analytics_views import (AdminMonthlyRevenueView,AdminTopSellingProductsView)

urlpatterns = [

    path('dashboard/', AdminDashboardView.as_view(), name='admin-dashboard'),

    path('users/', AdminUserListView.as_view(), name='admin-user-list'),
    path('users/<int:pk>/block/', AdminUserBlockView.as_view(), name='admin-user-block'),

    path('products/', AdminProductListCreateView.as_view(), name='admin-product-list-create'),
    path('products/<int:pk>/', AdminProductDetailView.as_view(), name='admin-product-detail'),

       
    path('orders/', AdminOrderListView.as_view()),
    path('orders/<int:pk>/', AdminOrderDetailView.as_view()),
    path('orders/<int:pk>/status/', AdminOrderStatusUpdateView.as_view()),


    path('orders/', AdminOrderListView.as_view()),
    path('orders/<int:pk>/', AdminOrderDetailView.as_view()),
    path('orders/<int:pk>/status/', AdminOrderStatusUpdateView.as_view()),

    path('analytics/monthly-revenue/', AdminMonthlyRevenueView.as_view()),
    path('analytics/top-products/', AdminTopSellingProductsView.as_view()),

]