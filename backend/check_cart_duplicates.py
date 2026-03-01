import os
import django
from dotenv import load_dotenv
from django.db.models import Count

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cart.models import Cart
from apps.wishlist.models import Wishlist
from django.contrib.auth import get_user_model

User = get_user_model()

print("Checking for duplicate active carts...")
duplicates = Cart.objects.filter(is_active=True).values('user').annotate(cart_count=Count('id')).filter(cart_count__gt=1)
if duplicates:
    for d in duplicates:
        user_id = d['user']
        count = d['cart_count']
        user = User.objects.get(id=user_id)
        print(f"User: {user.email} (ID: {user_id}) has {count} active carts.")
else:
    print("No duplicate active carts found.")

print("\nChecking for duplicate wishlist entries...")
wishlist_dims = Wishlist.objects.values('user', 'product').annotate(count=Count('id')).filter(count__gt=1)
if wishlist_dims:
    for w in wishlist_dims:
        user_id = w['user']
        product_id = w['product']
        count = w['count']
        user = User.objects.get(id=user_id)
        print(f"User: {user.email}, Product ID: {product_id} has {count} wishlist entries.")
else:
    print("No duplicate wishlist entries found.")
