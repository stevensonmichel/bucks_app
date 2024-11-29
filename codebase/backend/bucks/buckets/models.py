from django.db import models
from django.contrib.auth.models import User


class Bucket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    name = models.CharField(max_length=255)
    description = models.TextField(blank=True, null=True)
    max_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    current_amount =  models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)


    @property
    def remaining_amount(self):
        # Dynamically calculate the remaining amount
        if self.max_amount is not None:
            return self.max_amount - self.current_amount
        return None
    
    
    @property
    def status(self):
        # Determine status based on remaining amount
        if self.remaining_amount is None:
            return "No Budget Set"
        elif self.remaining_amount > 100:  # Adjust threshold as needed
            return "Healthy"
        elif 0 < self.remaining_amount <= 100:
            return "Critical"
        else:
            return "Over Budget"


    def __str__(self):
        return self.name
