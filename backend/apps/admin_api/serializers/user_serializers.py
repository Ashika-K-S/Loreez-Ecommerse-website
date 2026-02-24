from rest_framework import serializers
from apps.users.models import User

class AdminUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 'email', 'username',
            'role', 'is_active', 'date_joined'
        ]