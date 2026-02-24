import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')
django.setup()

from django.contrib.auth import get_user_model
from django.db.models import Count

User = get_user_model()

duplicates = User.objects.values('email').annotate(email_count=Count('email')).filter(email_count__gt=1)

if duplicates:
    print("Duplicate emails found:")
    for entry in duplicates:
        print(f"Email: {entry['email']}, Count: {entry['email_count']}")
else:
    print("No duplicate emails found.")

print("\nTotal users:", User.objects.count())
for user in User.objects.all()[:10]:
    print(f"User: {user.username}, Email: {user.email}")
