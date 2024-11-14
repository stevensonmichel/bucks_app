from rest_framework import serializers
from .models import Expense
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt



class ExpenseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Expense
        fields = ['name', 'description', 'amount', 'date', 'bucket'] 