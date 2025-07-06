from rest_framework import serializers
from .models import FeatureAnalysis, User, PortfolioTechnology

class FeatureAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureAnalysis
        fields = ['id', 'description', 'complexity', 'priority', 'analysis', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'uuid', 'build_count']
        read_only_fields = ['uuid', 'build_count']

class PortfolioTechnologySerializer(serializers.ModelSerializer):
    class Meta:
        model = PortfolioTechnology
        fields = ['id', 'category', 'name', 'description'] 