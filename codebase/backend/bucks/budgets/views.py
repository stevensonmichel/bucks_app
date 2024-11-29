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
    permission_classes = [IsAuthenticated]  # Ensure only authenticated users can access

    def get_queryset(self):
        # Filter budgets by the authenticated user
        return Budget.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        # Automatically set the user to the currently authenticated user
        serializer.save(user=self.request.user)


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    Handles retrieving, updating, and deleting a specific budget
    belonging to the authenticated user.
    """
    serializer_class = BudgetSerializer

    def get_queryset(self):
        # Filter budgets to only include those owned by the authenticated user
        return Budget.objects.filter(user=self.request.user)
