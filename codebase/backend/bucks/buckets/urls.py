from django.urls import path
from . import views

urlpatterns = [
    path('', views.BucketListView.as_view(), name='bucket-list'),
    path('add/', views.BucketAddView.as_view(), name='bucket-add'),
    
]
# path('buckets/<int:pk>/', views.BucketDetailView.as_view(), name='bucket-detail'),