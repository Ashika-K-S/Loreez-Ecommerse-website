from django.contrib.auth.models import AbstractUser

from django.db import models
class User(AbstractUser):
    ROLE_CHOICES=(
        ('user','user'),
        ('admin','admin')
    )
    role=models.CharField(max_length=15,choices=ROLE_CHOICES,default='user')
    status=models.CharField(max_length=10, default='active')

    def __str__(self):
        return self.username