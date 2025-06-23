from rest_framework import serializers
from .models import FeatureAnalysis, User

class FeatureAnalysisSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeatureAnalysis
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'uuid']
        read_only_fields = ['uuid'] 