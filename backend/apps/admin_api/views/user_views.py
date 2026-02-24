from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404

from apps.admin_api.permissions import IsAdminUserOnly
from apps.admin_api.serializers.user_serializers import AdminUserSerializer
from apps.users.models import User

class AdminUserListView(APIView):
    permission_classes = [IsAdminUserOnly]

    def get(self, request):
        users = User.objects.all()
        serializer = AdminUserSerializer(users, many=True)
        return Response(serializer.data)

class AdminUserBlockView(APIView):
    permission_classes = [IsAdminUserOnly]

    def patch(self, request, pk):
        user = get_object_or_404(User, pk=pk)
        user.is_active = not user.is_active
        user.save()
        return Response({"message": "User status updated"})