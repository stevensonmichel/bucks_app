from rest_framework import generics
from rest_framework.views import APIView, status
from .models import Expense
from rest_framework.response import Response
from .serializers import ExpenseSerializer

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