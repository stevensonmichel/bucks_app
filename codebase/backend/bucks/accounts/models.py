from django.db import models
from django.contrib.auth.models import User



class Account(models.Model):
    ACCOUNT_TYPES = [
        ('checking', 'Checking'),
        ('savings', 'Savings'),
        ('credit', 'Credit'),
        ('cash', 'Cash'),
    ]
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the User
    account_name = models.CharField(max_length=255)  # Account name
    balance = models.DecimalField(max_digits=12, decimal_places=2)  # Account balance
    account_type = models.CharField(max_length=50, choices=ACCOUNT_TYPES)  # Type of account
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.account_name
