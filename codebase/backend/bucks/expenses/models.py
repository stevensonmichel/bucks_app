from django.db import models
from django.contrib.auth.models import User
from buckets.models import Bucket
from accounts.models import Account


class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    bucket = models.ForeignKey(Bucket, on_delete=models.SET_NULL, null=True, blank=True)
    plaid_transaction_id = models.CharField(max_length=100)
    name = models.CharField(max_length=255) 
    account = models.ForeignKey(Account, on_delete=models.SET_NULL, null=True, blank=True)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField(blank=True, null=True) 
    date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True) 

    def __str__(self):
        return f'{self.amount} spent in {self.bucket.name}'