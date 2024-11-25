from django.urls import path
from . import views

urlpatterns = [
    path('', views.AccountListView.as_view(), name='account-list'),
    path('<int:pk>/', views.AccountDetailView.as_view(), name='account-detail'),
]