from rest_framework import generics
from rest_framework.views import APIView, status
from .models import Expense
from rest_framework.response import Response
from .serializers import ExpenseSerializer
from django.utils import timezone
from notifications.models import Notification

class ExpenseListView(generics.ListCreateAPIView):
    def get(self, request):
        # Query the database for all Bucket instances
        expenses = Expense.objects.all()
        print("From Expenses, the user is", request.user, request.user.id)
        

        # Serialize the data
        serializer = ExpenseSerializer(expenses, many=True)

        # Return the serialized data as a JSON response
        return Response(serializer.data)


class ExpenseAddView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        # Custom logic for creating an expense, if applicable
        user = self.request.user
        if user.is_authenticated:
            print("Adding new expense for user:", user, user.id)
            
            serializer.save(user=user)  # Save with user if applicable
        else:
            # Handle cases where the user is not authenticated (if required)
            print("Anonymous user adding an expense")
            serializer.save()

    def create(self, request, *args, **kwargs):
        # Optionally print the payload for debugging
        print("Received payload:", request.data)

        try:
            response = super().create(request, *args, **kwargs)
            user = request.user
            expense = request.data
            
            Notification.objects.create(
                user=user,
                message=f'A new expense "{expense["name"]}" has been created.',
                type="expense",
                date=timezone.now(),
            )
            
            return Response(
                {
                    "message": "Expense added successfully!",
                    "expense": response.data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            # Handle any potential errors
            print("Error creating expense:", str(e))
            return Response(
                {"error": "Failed to add expense", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

        
        

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    
    def get_object(self, pk):
        try:
            return Expense.objects.get(pk=pk)
        except Expense.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        expense = self.get_object(pk)
        if expense is None:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = ExpenseSerializer(expense)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        expense = self.get_object(pk)
        if expense is None:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExpenseSerializer(expense, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        expense = self.get_object(pk)
        if expense is None:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = ExpenseSerializer(expense, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        expense = self.get_object(pk)
        if expense is None:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)
        expense.delete()
        return Response({"message": "Expense deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
