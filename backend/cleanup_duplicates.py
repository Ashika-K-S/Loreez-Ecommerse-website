import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.db.models import Count

User = get_user_model()

# Find all emails that have duplicates
duplicate_emails = User.objects.values('email').annotate(email_count=Count('email')).filter(email_count__gt=1)

for entry in duplicate_emails:
    email = entry['email']
    if not email: continue
    
    users = list(User.objects.filter(email=email).order_by('id'))
    keep_user = users[0]
    delete_users = users[1:]
    
    print(f"Keeping user: {keep_user.username} (ID: {keep_user.id}) for email: {email}")
    for u in delete_users:
        print(f"  Deleting duplicate user: {u.username} (ID: {u.id})")
        u.delete()

print("Cleanup complete.")
