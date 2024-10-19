from django.shortcuts import render

from rest_framework import generics
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Bucket
from .serializers import BucketSerializer

class BucketListView(APIView):
    def get(self, request):
        # Simulate dynamic data
        buckets = [
            {"id": 1, "name": "Bucket A", "description": "This is bucket A"},
            {"id": 2, "name": "Bucket B", "description": "This is bucket B"},
            {"id": 3, "name": "Bucket C", "description": "This is bucket C"}
        ]
        return Response(buckets)

class BucketDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Bucket.objects.all()
    serializer_class = BucketSerializer