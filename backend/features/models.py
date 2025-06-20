from django.db import models
import uuid

class Feature(models.Model):
    COMPLEXITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
    ]

    description = models.TextField()
    complexity = models.CharField(max_length=10, choices=COMPLEXITY_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    analysis = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Feature: {self.description[:50]}..."

class User(models.Model):
    username = models.CharField(max_length=20, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ['-created_at'] 