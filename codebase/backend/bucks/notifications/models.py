from django.db import models

from django.contrib.auth.models import User

class Notification(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # Link to the User
    message = models.TextField()  # Notification message
    read = models.BooleanField(default=False)  # Read status of the notification
    created_at = models.DateTimeField(auto_now_add=True)  # Timestamp for when the notification was created

    def __str__(self):
        return f'Notification for {self.user.username}'