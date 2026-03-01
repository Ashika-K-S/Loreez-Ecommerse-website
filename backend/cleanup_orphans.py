import os
import django

# Setup Django environment
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from apps.cart.models import CartItem
from apps.wishlist.models import Wishlist
from apps.products.models import Product

def cleanup():
    print("Starting data cleanup...")
    
    # 1. Cleanup CartItems with non-existent products
    print("\nChecking Cart Items...")
    cart_items = CartItem.objects.all()
    orphaned_cart_items = 0
    for item in cart_items:
        try:
            if not item.product:
                print(f"Removing CartItem {item.id} - No product associated")
                item.delete()
                orphaned_cart_items += 1
        except Exception:
            print(f"Removing CartItem {item.id} - Product does not exist")
            item.delete()
            orphaned_cart_items += 1
    
    # 2. Cleanup Wishlist with non-existent products
    print("\nChecking Wishlist Items...")
    wishlist_items = Wishlist.objects.all()
    orphaned_wishlist_items = 0
    for item in wishlist_items:
        try:
            if not item.product:
                print(f"Removing Wishlist entry {item.id} - No product associated")
                item.delete()
                orphaned_wishlist_items += 1
        except Exception:
            print(f"Removing Wishlist entry {item.id} - Product does not exist")
            item.delete()
            orphaned_wishlist_items += 1
            
    print("\nCleanup Complete!")
    print(f"Orphaned Cart Items removed: {orphaned_cart_items}")
    print(f"Orphaned Wishlist Items removed: {orphaned_wishlist_items}")

if __name__ == "__main__":
    cleanup()
