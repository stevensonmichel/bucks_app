from django.db import models
from django.contrib.auth.models import User



class Account(models.Model):
    ACCOUNT_TYPES = [
        ('checking', 'Checking'),
        ('savings', 'Savings'),
        ('credit', 'Credit'),
        ('cash', 'Cash'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE) 
    plaid_account_id = models.CharField(max_length=100)
    name = models.CharField(max_length=255)  
    balance = models.DecimalField(max_digits=12, decimal_places=2)
    type = models.CharField(max_length=50)  # Type of account
    subtype = models.CharField(max_length=50, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
