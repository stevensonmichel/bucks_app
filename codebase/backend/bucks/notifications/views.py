from .models import Notification
from .serializers import NotificationSerializer
from rest_framework.response import Response
from rest_framework import generics, status
from rest_framework.views import APIView

class NotificationListView(generics.ListCreateAPIView):
    def get(self, request):
        notifications = Notification.objects.filter(user=request.user)
        
        serializer = NotificationSerializer(notifications, many=True)
        
        return Response(serializer.data)
    
    
class NotificationDetailView(APIView):
    def get_object(self, pk):
        try:
            return Notification.objects.get(pk=pk)
        except Notification.DoesNotExist:
            return None

    def get(self, request, pk, format=None):
        notification = self.get_object(pk)
        if notification is None:
            return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = NotificationSerializer(notification)
        return Response(serializer.data)

    def put(self, request, pk, format=None):
        notification = self.get_object(pk)
        if notification is None:
            return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = NotificationSerializer(notification, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        notification = self.get_object(pk)
        if notification is None:
            return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = NotificationSerializer(notification, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk, format=None):
        notification = self.get_object(pk)
        if notification is None:
            return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)
        notification.delete()
        return Response({"message": "Notification deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
    

class MarkAsReadView(APIView):
    def post(self, request, pk, *args, **kwargs):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
            notification.read = True
            notification.save()
            return Response({"message": "Notification marked as read."}, status=status.HTTP_200_OK)
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found."}, status=status.HTTP_404_NOT_FOUND)