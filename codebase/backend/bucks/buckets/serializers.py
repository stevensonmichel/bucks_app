# In serializers.py
from rest_framework import serializers
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Bucket


class BucketSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bucket
        fields = ['id', 'name', 'description', 'max_amount', 'current_amount', 'remaining_amount'] 