import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.users.models import User

users = User.objects.all()
for u in users:
    print(f"Username: {u.username}, Email: {u.email}, Active: {u.is_active}, Status: {u.status}, Has Password: {bool(u.password)}")
