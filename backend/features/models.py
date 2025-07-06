from django.db import models
from django.contrib.auth.models import User as DjangoUser
import uuid

class FeatureAnalysis(models.Model):
    COMPLEXITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]
    
    PRIORITY_CHOICES = [
        ('low', 'Low'),
        ('medium', 'Medium'),
        ('high', 'High'),
        ('critical', 'Critical'),
    ]

    description = models.TextField()
    complexity = models.CharField(max_length=10, choices=COMPLEXITY_CHOICES)
    priority = models.CharField(max_length=10, choices=PRIORITY_CHOICES)
    analysis = models.TextField(blank=True)
    created_by = models.ForeignKey(DjangoUser, on_delete=models.CASCADE, related_name='feature_analyses')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"FeatureAnalysis: {self.description[:50]}..."

    class Meta:
        ordering = ['-created_at']

class User(models.Model):
    username = models.CharField(max_length=20, unique=True)
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)
    build_count = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.username

    class Meta:
        ordering = ['-created_at']

class PortfolioTechnology(models.Model):
    category = models.CharField(max_length=64)
    name = models.CharField(max_length=64)
    description = models.TextField()

    class Meta:
        db_table = 'portfolio_technologies'
        verbose_name_plural = 'Portfolio Technologies'

    def __str__(self):
        return f"{self.category}: {self.name}" 