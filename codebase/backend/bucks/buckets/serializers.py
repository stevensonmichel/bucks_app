# In serializers.py
from rest_framework import serializers
from .models import Bucket  # Adjust the import if your Bucket model is in a different module

class BucketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucket
        fields = ['id', 'name', 'description', 'max_amount', 'deadline'] 