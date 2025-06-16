from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .models import UserProfile
from .serializers import UserProfileSerializer

class UserProfileViewSet(viewsets.ModelViewSet):
    serializer_class = UserProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserProfile.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @action(detail=False, methods=['post'])
    def set_display_name(self, request):
        display_name = request.data.get('display_name')
        if not display_name:
            return Response(
                {'error': 'Display name is required'},
                status=status.HTTP_400_BAD_REQUEST
            )

        if len(display_name) < 2:
            return Response(
                {'error': 'Display name must be at least 2 characters long'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Create or update the profile for the authenticated user
        profile, created = UserProfile.objects.get_or_create(
            user=request.user,
            defaults={'display_name': display_name}
        )

        if not created:
            profile.display_name = display_name
            profile.save()

        return Response({
            'id': profile.id,
            'display_name': profile.display_name
        }, status=status.HTTP_200_OK) 