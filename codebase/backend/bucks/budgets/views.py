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
from notifications.models import Notification
from datetime import timezone

class BudgetListCreateView(generics.ListCreateAPIView):
    queryset = Budget.objects.all()
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        active_budget = Budget.objects.filter(user=self.request.user, is_active=True).first()
        print("we found that budget", active_budget)
        if active_budget:
            # Wrap the single object in a queryset-like structure
            return Budget.objects.filter(id=active_budget.id)
        else:
            return Budget.objects.none() 

    def perform_create(self, serializer):
        user = self.request.user
        
        # Deactivate all existing budgets for the user
        Budget.objects.filter(user=user).update(is_active=False)
        
        # Save the new budget and set it as active
        serializer.save(user=user, is_active=True)
        budget = self.request.data
        
        Notification.objects.create(
                user=user,
                message=f'A new budget "{budget["name"]}" has been set (active).',
                type='budget',
                date=timezone.now(),
                read=False,
            )
        


class BudgetDetailView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = BudgetSerializer
    permission_classes = [IsAuthenticated] 

    def get_queryset(self):
        """
        Limit the queryset to budgets belonging to the logged-in user.
        """
        return Budget.objects.filter(user=self.request.user)

    def retrieve(self, request, *args, **kwargs):
        """
        Override the retrieve method to return the budget details.
        """
        instance = self.get_object()
        serializer = self.get_serializer(instance)
        return Response(serializer.data)

    def update(self, request, *args, **kwargs):
        """
        Override the update method to ensure that only the budget owner can update it.
        Also handle the updating logic for buckets or any additional fields.
        """
        instance = self.get_object()

        # Ensure the user owns the budget
        if instance.user != request.user:
            raise PermissionDenied("You do not have permission to edit this budget.")

        # Deserialize and validate the incoming data
        serializer = self.get_serializer(instance, data=request.data, partial=True)  # Allow partial updates
        serializer.is_valid(raise_exception=True)

        # Perform the update
        self.perform_update(serializer)

        # Return the updated budget data
        return Response(serializer.data)

    def perform_update(self, serializer):
        """
        Handle additional logic when updating the budget, such as buckets or related data.
        """
        serializer.save()