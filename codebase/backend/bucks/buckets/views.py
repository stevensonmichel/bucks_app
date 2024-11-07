# In views.py
from rest_framework.views import APIView, status
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.response import Response
from .models import Bucket
from .serializers import BucketSerializer
from rest_framework import generics

class BucketListView(APIView):
    def get(self, request):
        # Query the database for all Bucket instances
        buckets = Bucket.objects.all()
        print("From Buckets, the user is", request.user, request.user.id)
        

        # Serialize the data
        serializer = BucketSerializer(buckets, many=True)

        # Return the serialized data as a JSON response
        return Response(serializer.data)
    
  


# @method_decorator(csrf_exempt, name='dispatch')
class BucketAddView(generics.CreateAPIView):
    queryset = Bucket.objects.all()
    serializer_class = BucketSerializer

    def perform_create(self, serializer):
        # Custom logic for creating a bucket, if applicable
        user = self.request.user
        if user.is_authenticated:
            print("Adding new bucket for user:", user, user.id)
            serializer.save(user=user)  # Save with user if applicable
        else:
            # Handle cases where the user is not authenticated (if required)
            print("Anonymous user adding a bucket")
            serializer.save()

    def create(self, request, *args, **kwargs):
        # Optionally print the payload for debugging
        print("Received payload:", request.data)

        try:
            response = super().create(request, *args, **kwargs)
            return Response(
                {
                    "message": "Bucket added successfully!",
                    "bucket": response.data
                },
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            # Handle any potential errors
            print("Error creating bucket:", str(e))
            return Response(
                {"error": "Failed to add bucket", "details": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )
