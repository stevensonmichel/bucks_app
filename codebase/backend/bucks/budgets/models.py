from django.db import models
from django.contrib.auth.models import User
from buckets.serializers import BucketSerializer

class Budget(models.Model):
    name = models.CharField(max_length=255)
    start_date = models.DateField()
    end_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    selected_buckets = models.JSONField()  # Assuming the IDs of the buckets are stored as a list
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True, blank=True)
    
    def __str__(self):
        return self.name
    
    @property
    def total_expenses(self):
        """
        Calculate the total expenses for all selected buckets.
        """
        from buckets.models import Bucket  # Import here to avoid circular imports
        bucket_ids = self.selected_buckets
        buckets = Bucket.objects.filter(id__in=bucket_ids)
        total_expenses = sum(bucket.current_amount or 0 for bucket in buckets)
        return total_expenses
    
    
    # def get_buckets(self, obj):
    #     """
    #     Fetch details of buckets associated with this budget.
    #     """
    #     bucket_ids = obj.selected_buckets  # List of bucket IDs
    #     from buckets.models import Bucket  # Avoid circular imports
    #     buckets = Bucket.objects.filter(id__in=bucket_ids)
    #     return BucketSerializer(buckets, many=True).data
