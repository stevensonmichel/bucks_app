from django.db import models
from django.contrib.auth.models import User

# class Bucket(models.Model):
#     name = models.CharField(max_length=255)
#     user = models.ForeignKey(User, on_delete=models.CASCADE)
#     target_amount = models.DecimalField(max_digits=10, decimal_places=2)
#     description = models.TextField(blank=True)

#     def __str__(self):
#         return f"{self.name} - Target: ${self.target_amount}"


class Bucket(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the User
    name = models.CharField(max_length=255)  # Name of the bucket
    description = models.TextField(blank=True, null=True)  # Optional description
    max_amount = models.DecimalField(max_digits=10, decimal_places=2, null=True)  # Max budget amount
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the bucket was created

    def __str__(self):
        return self.name
