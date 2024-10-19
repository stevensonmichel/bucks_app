from django.urls import path
from . import views

urlpatterns = [
    path('api/expenses/', views.ExpenseListView.as_view(), name='expense-list'),
    path('api/expenses/<int:pk>/', views.ExpenseDetailView.as_view(), name='expense-detail'),
]