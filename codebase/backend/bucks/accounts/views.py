from rest_framework import generics
from .models import Account
from rest_framework.response import Response
from .serializers import AccountSerializer

class AccountListView(generics.ListCreateAPIView):
    def get(self, request):
        # Query the database for all Bucket instances
        accounts = Account.objects.all()
        print("From Accounts, the user is", request.user, request.user.id)
        

        # Serialize the data
        serializer = AccountSerializer(accounts, many=True)

        # Return the serialized data as a JSON response
        return Response(serializer.data)

