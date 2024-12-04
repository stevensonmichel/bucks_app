from rest_framework import generics
from rest_framework.views import APIView, status
from .models import Expense
from rest_framework.response import Response
from .serializers import ExpenseSerializer
from django.utils import timezone
from notifications.models import Notification
from django.db.models import Sum
from budgets.models import Budget
from expenses.models import Expense
from django.db import transaction


class ExpenseListView(generics.ListCreateAPIView):
    def get(self, request):
        expenses = Expense.objects.filter(user=request.user).order_by('-date')
        
        serializer = ExpenseSerializer(expenses, many=True)

        return Response(serializer.data)


class ExpenseAddView(generics.CreateAPIView):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            
            expense = serializer.save(user=user) 
            if expense.bucket: 
                bucket = expense.bucket
                bucket.current_amount += expense.amount
                bucket.save() 
        else:
            serializer.save()

    def create(self, request, *args, **kwargs):

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
            with transaction.atomic():
                # Calculate the difference in amount
                old_amount = expense.amount
                new_amount = serializer.validated_data.get('amount', old_amount)
                amount_difference = new_amount - old_amount

                # Update the bucket's current_amount
                if expense.bucket:
                    bucket = expense.bucket
                    bucket.current_amount = (bucket.current_amount or 0) + amount_difference
                    bucket.save()

                # Save the updated expense
                serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        expense = self.get_object(pk)
        if expense is None:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)

        serializer = ExpenseSerializer(expense, data=request.data, partial=True)
        if serializer.is_valid():
            with transaction.atomic():
                # Calculate the difference in amount
                old_amount = expense.amount
                new_amount = serializer.validated_data.get('amount', old_amount)
                amount_difference = new_amount - old_amount

                # Update the bucket's current_amount
                if expense.bucket:
                    bucket = expense.bucket
                    bucket.current_amount = (bucket.current_amount or 0) + amount_difference
                    bucket.save()

                # Save the updated expense
                serializer.save()

            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        expense = self.get_object(pk)
        if expense is None:
            return Response({"error": "Expense not found."}, status=status.HTTP_404_NOT_FOUND)

        with transaction.atomic():
            # Adjust the bucket's current_amount if the expense is being deleted
            if expense.bucket:
                bucket = expense.bucket
                bucket.current_amount = (bucket.current_amount or 0) - expense.amount
                bucket.save()

            # Delete the expense
            expense.delete()

        return Response({"message": "Expense deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)


    
    
class DailyExpensesView(APIView):

    def get(self, request, budget_id):
        try:
            # Retrieve the budget for the user
            budget = Budget.objects.get(id=budget_id, user=request.user)
            start_date = budget.start_date
            end_date = budget.end_date
            expenses = (
                Expense.objects.filter(user=request.user, date__range=[start_date, end_date])
                .values('date')
                .annotate(total=Sum('amount'))
                .order_by('date')
            )

            return Response({
                "budget_name": budget.name,
                "start_date": budget.start_date,
                "end_date": budget.end_date,
                "expenses": list(expenses),
            })
        except Budget.DoesNotExist:
            return Response({"error": "Budget not found."}, status=404)
        except Exception as e:
            return Response({"error": str(e)}, status=500)
