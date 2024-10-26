# In views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Bucket
from .serializers import BucketSerializer

class BucketListView(APIView):
    def get(self, request):
        # Query the database for all Bucket instances
        buckets = Bucket.objects.all()

        # Serialize the data
        serializer = BucketSerializer(buckets, many=True)

        # Return the serialized data as a JSON response
        return Response(serializer.data)
