from django.urls import path
from . import views

urlpatterns = [
    path('', views.AccountListView.as_view(), name='account-list'),
    # path('add/', views.ExpenseAddView.as_view(), name='expense-add'),
    # path('api/expenses/<int:pk>/', views.AccountDetailView.as_view(), name='expense-detail'),
]