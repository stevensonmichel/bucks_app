from django.urls import path
from . import views

urlpatterns = [
    path('', views.ExpenseListView.as_view(), name='expense-list'),
    path('add/', views.ExpenseAddView.as_view(), name='expense-add'),
    path('<int:pk>/', views.ExpenseDetailView.as_view(), name='expense-detail'),
    path('daily-expenses/<int:budget_id>/', views.DailyExpensesView.as_view(), name='daily-expenses'),
]