from django.urls import path
from .views import RegisterView, MeView, UserListView, UserUpdateView, LoginView

urlpatterns = [
    path('register/', RegisterView.as_view()),
    path('login/', LoginView.as_view()),
    path('me/', MeView.as_view()),
    path('', UserListView.as_view()),
    path('<int:pk>/', UserUpdateView.as_view()),

]
