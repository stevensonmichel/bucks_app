from django.db import models

from django.contrib.auth.models import User
from buckets.models import Bucket
from accounts.models import Account

# class Expense(models.Model):
#     name = models.CharField(max_length=255)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     bucket = models.ForeignKey(Bucket, on_delete=models.CASCADE)
#     amount = models.DecimalField(max_digits=10, decimal_places=2)
#     bucket = models.CharField(max_length=100)
#     description = models.TextField(blank=True)
#     date = models.DateField(auto_now_add=True)

#     def __str__(self):
#         return self.name



class Expense(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the User
    bucket = models.ForeignKey(Bucket, on_delete=models.CASCADE)  # Link to the Bucket (category)
    account = models.ForeignKey(Account, on_delete=models.CASCADE)  # Link to the Account
    amount = models.DecimalField(max_digits=10, decimal_places=2)  # Expense amount
    description = models.TextField(blank=True, null=True)  # Optional description of the expense
    date = models.DateField()  # Date of the expense
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the expense was created

    def __str__(self):
        return f'{self.amount} spent in {self.bucket.name}'