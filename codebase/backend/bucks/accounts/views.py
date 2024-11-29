from rest_framework import generics, status
from .models import Account
from rest_framework.response import Response
from .serializers import AccountSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated

class AccountListView(generics.ListCreateAPIView):
    def get(self, request):
        accounts = Account.objects.filter(user=request.user)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data)
    
    
class AccountDetailView(APIView):
    permission_classes = [IsAuthenticated]
    def get_object(self, pk):
        print("Received pk is", pk)
        try:
            return Account.objects.get(pk=pk)
        except Account.DoesNotExist:
            return None
        
    def get(self, request, pk, format=None):
        account = self.get_object(pk)
        if account is None:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AccountSerializer(account)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        account = self.get_object(pk)
        if account is None:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = AccountSerializer(account, data=request.data)
        print("The request touches here", request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def patch(self, request, pk, format=None):
        account = self.get_object(pk)
        if account is None:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = AccountSerializer(account, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save
            return Response(serializer.data)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    def delete(self, request, pk, format=None):
        print("The api for delete hits heere", request)
        account = self.get_object(pk)
        if account is None:
            return Response({"error": "Account not found"}, status=status.HTTP_404_NOT_FOUND)
        account.delete()
        return Response({"message": "account has been deleted"}, status=status.HTTP_204_NO_CONTENT)
        
            

