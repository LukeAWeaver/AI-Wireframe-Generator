from django.db import models

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