import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from rest_framework_simplejwt.tokens import RefreshToken

User = get_user_model()

try:
    user = User.objects.all().first()
    if not user:
        print("No users found in database.")
    else:
        print(f"Testing token generation for user: {user.username}")
        refresh = RefreshToken.for_user(user)
        print("Success: Token generated.")
        print(f"Access token: {str(refresh.access_token)}")
except Exception as e:
    print(f"Error: {str(e)}")
    import traceback
    traceback.print_exc()
