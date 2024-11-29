from django.urls import path
from . import views


urlpatterns = [
    path('', views.NotificationListView.as_view(), name='notification-list'),
    path('<int:pk>/', views.NotificationDetailView.as_view(), name='notification-detail'),
    path('mark-as-read/<int:pk>/', views.MarkAsReadView.as_view(), name='mark-as-read'),
]
