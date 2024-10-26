from django.contrib import admin
from .models import Bucket


class BucketAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'max_amount', 'deadline', 'created_at') 
    search_fields = ('name', 'user__username') 



admin.site.register(Bucket)
