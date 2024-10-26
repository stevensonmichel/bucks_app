from django.urls import path
from . import views

urlpatterns = [
    path('', views.BucketListView.as_view(), name='bucket-list'),
    
]
# path('buckets/<int:pk>/', views.BucketDetailView.as_view(), name='bucket-detail'),