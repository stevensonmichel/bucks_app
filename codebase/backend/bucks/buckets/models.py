from django.db import models
from django.contrib.auth.models import User
from decimal import Decimal


class Bucket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    max_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    current_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)


    @property
    def remaining_amount(self):
        if self.max_amount is not None:
            current_amount = self.current_amount or 0 
            return self.max_amount - current_amount
        return None
    
    
    @property
    def status(self):
        if self.current_amount is None or self.max_amount is None or self.max_amount == 0:
            return "None"  # Undefined if no budget or max_amount is zero

        # Ensure both operands are Decimal
        current_amount = Decimal(self.current_amount)
        max_amount = Decimal(self.max_amount)

        percentage = (current_amount / max_amount) * 100

        if percentage < 70:
            return "Healthy"
        elif 70 <= percentage < 100:
            return "Critical"
        elif percentage == 100:
            return "At Limit"
        else:
            return "Over Budget"

    def __str__(self):
        return self.name
