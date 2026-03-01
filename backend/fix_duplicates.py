import os
import django
from dotenv import load_dotenv
from django.db.models import Count
from django.db import transaction

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(os.path.join(BASE_DIR, ".env"))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cart.models import Cart
from apps.wishlist.models import Wishlist

def cleanup_duplicates():
    print("Starting data cleanup...")

    # 1. Cleanup Duplicate Active Carts
    with transaction.atomic():
        duplicate_cart_users = Cart.objects.filter(is_active=True).values('user').annotate(
            cart_count=Count('id')
        ).filter(cart_count__gt=1)
        
        for entry in duplicate_cart_users:
            user_id = entry['user']
            active_carts = Cart.objects.filter(user_id=user_id, is_active=True).order_by('-created_at')
            keep_cart = active_carts.first()
            to_deactivate = active_carts.exclude(id=keep_cart.id)
            
            print(f"User ID {user_id}: Keeping cart {keep_cart.id}, deactivating {to_deactivate.count()} others.")
            to_deactivate.update(is_active=False)

    # 2. Cleanup Duplicate Wishlist Entries
    with transaction.atomic():
        wishlist_duplicates = Wishlist.objects.values('user', 'product').annotate(
            entry_count=Count('id')
        ).filter(entry_count__gt=1)
        
        for entry in wishlist_duplicates:
            user_id = entry['user']
            product_id = entry['product']
            items = Wishlist.objects.filter(user_id=user_id, product_id=product_id).order_by('-created_at')
            keep_item = items.first()
            to_delete = items.exclude(id=keep_item.id)
            
            print(f"User ID {user_id}, Product ID {product_id}: Keeping entry {keep_item.id}, deleting {to_delete.count()} duplicates.")
            to_delete.delete()

    print("Cleanup complete successfully.")

if __name__ == "__main__":
    cleanup_duplicates()
