from rest_framework import serializers
from .models import Account  # Import your Account model

class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'  # This will include all fields from the Account model. You can list specific fields if needed.
