from rest_framework import serializers
from .models import Feature, User

class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = '__all__'

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'uuid']
        read_only_fields = ['uuid'] 