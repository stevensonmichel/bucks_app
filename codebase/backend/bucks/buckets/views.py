# In views.py
from rest_framework.views import APIView, status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Bucket
from .serializers import BucketSerializer
from rest_framework import generics
from notifications.models import Notification
from django.utils import timezone


class BucketListView(APIView):
    def get(self, request):
        buckets = Bucket.objects.filter(user=request.user).order_by('-updated_at')
        serializer = BucketSerializer(buckets, many=True)
        return Response(serializer.data)
    
    
class BucketAddView(generics.CreateAPIView):
    queryset = Bucket.objects.all()
    serializer_class = BucketSerializer

    def perform_create(self, serializer):
        user = self.request.user
        if user.is_authenticated:
            print("Adding new bucket for user:", user, user.id)
            serializer.save(user=user)
        else:
            print("Anonymous user adding a bucket")
            serializer.save()

    def create(self, request, *args, **kwargs):
        print("Received payload:", request.data)
        try:
            response = super().create(request, *args, **kwargs)
            user = request.user
            bucket = request.data 
            print("information are", request.user, request.data, bucket)
            Notification.objects.create(
                user=user,
                message=f'A new bucket "{bucket["name"]}" has been created.',
                type='bucket',
                date=timezone.now(),
                read=False,
            )
            return Response(
                {
                    "message": "Bucket added successfully!",
                    "bucket": response.data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            print("Error creating bucket:", str(e))
            return Response(
                {"error": "Failed to add bucket", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
            

class BucketDetailView(APIView):
    def get_object(self, pk):
        try:
            return Bucket.objects.get(pk=pk)
        except Bucket.DoesNotExist:
            return None
        
    def get(self, request, pk, format=None):
        bucket = self.get_object(pk)
        if bucket is None:
            return Response({"error": "Bucket not found."}, status=status.HTTP_404_NOT_FOUND)
        serializer = BucketSerializer(bucket)
        return Response(serializer.data)
    
    def put(self, request, pk, format=None):
        bucket = self.get_object(pk)
        if bucket is None:
            return Response({"error": "Bucket not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BucketSerializer(bucket, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def patch(self, request, pk, format=None):
        bucket = self.get_object(pk)
        if bucket is None:
            return Response({"error": "Bucket not found."}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = BucketSerializer(bucket, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, pk, format=None):
        bucket = self.get_object(pk)
        if bucket is None:
            return Response({"error": "Bucket not found."}, status=status.HTTP_404_NOT_FOUND)
        bucket.delete()
        return Response({"message": "Bucket deleted successfully!"}, status=status.HTTP_204_NO_CONTENT)
            
        
