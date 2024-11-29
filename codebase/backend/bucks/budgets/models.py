from django.db import models
from django.contrib.auth.models import User

class Budget(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    selected_buckets = models.JSONField()  # Assuming the IDs of the buckets are stored as a list
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.name
