from rest_framework.response import Response
from rest_framework import status, generics
from rest_framework.views import APIView
from .serializers import BudgetSerializer
from .models import Budget

from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Budget
from .serializers import BudgetSerializer

class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BudgetSerializer

    def get_queryset(self):
        print("I see the request, hell yeah", self.request)
        return Budget.objects.filter(user=self.request.user)
    
    def retrieve(self, request, *args, **kwargs):
        """
        Override the retrieve method to print the response before returning it.
        """
        instance = self.get_object() 
        serializer = self.get_serializer(instance)  
        response_data = serializer.data  
        print("Response Data:", response_data) 
        return Response(response_data)  
