from rest_framework import serializers
from .models import Budget
from buckets.serializers import BucketSerializer

class BudgetSerializer(serializers.ModelSerializer):
    total_expenses = serializers.SerializerMethodField() 
    buckets = serializers.SerializerMethodField()
    
    class Meta:
        model = Budget
        fields = '__all__'
        
        
    def get_total_expenses(self, obj):
        return obj.total_expenses
    
    def get_buckets(self, obj):
        """
        Fetch details of buckets associated with this budget.
        """
        bucket_ids = obj.selected_buckets  # List of bucket IDs
        from buckets.models import Bucket  # Avoid circular imports
        buckets = Bucket.objects.filter(id__in=bucket_ids)
        return BucketSerializer(buckets, many=True).data
