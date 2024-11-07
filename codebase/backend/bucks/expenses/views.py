from rest_framework import generics
from .models import Expense
from rest_framework.response import Response
from .serializers import ExpenseSerializer

class ExpenseListView(generics.ListCreateAPIView):
    def get(self, request):
        # Query the database for all Bucket instances
        buckets = Expense.objects.all()
        print("From Expenses, the user is", request.user, request.user.id)
        

        # Serialize the data
        serializer = ExpenseSerializer(buckets, many=True)

        # Return the serialized data as a JSON response
        return Response(serializer.data)


class ExpenseAddView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        # Custom logic for creating an expense (e.g., associating it with a user)
        print("Adding new expense for user:", self.request.user, self.request.user.id)
        serializer.save(user=self.request.user)
        
        

class ExpenseDetailView(generics.RetrieveUpdateDestroyAPIView):
    
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer