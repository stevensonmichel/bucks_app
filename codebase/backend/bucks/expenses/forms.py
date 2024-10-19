from django import forms
from .models import Expense

class ExpenseForm(forms.ModelForm):
    class Meta:
        model = Expense
        fields = ['bucket', 'amount', 'category', 'date', 'description']
        from django import forms
from .models import Expense