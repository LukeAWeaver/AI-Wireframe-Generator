from rest_framework import serializers
from .models import Feature

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ['id', 'description', 'complexity', 'priority', 'analysis', 'created_at', 'updated_at']
        read_only_fields = ['analysis', 'created_at', 'updated_at'] 