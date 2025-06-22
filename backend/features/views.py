from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.conf import settings
import openai
from .models import Feature, User
from .serializers import FeatureSerializer, UserSerializer
from django.db import IntegrityError
import os
import re
import html

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all().order_by('-created_at')
    serializer_class = FeatureSerializer
    permission_classes = [IsAuthenticated]

    def sanitize_input(self, text):
        """Sanitize user input to prevent XSS and injection attacks"""
        if not text:
            return ""
        # Remove HTML tags
        text = re.sub(r'<[^>]+>', '', text)
        # Escape HTML entities
        text = html.escape(text)
        # Limit length
        return text[:1000]

    @action(detail=False, methods=['post'])
    def analyze(self, request):
        try:
            # Validate required fields
            feature = request.data.get('feature')
            complexity = request.data.get('complexity')
            priority = request.data.get('priority')

            if not all([feature, complexity, priority]):
                return Response({
                    'error': 'feature, complexity, and priority are required'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Sanitize inputs
            feature = self.sanitize_input(feature)
            complexity = self.sanitize_input(complexity)
            priority = self.sanitize_input(priority)

            # Validate complexity and priority values
            valid_complexities = ['low', 'medium', 'high']
            valid_priorities = ['low', 'medium', 'high', 'critical']

            if complexity.lower() not in valid_complexities:
                return Response({
                    'error': f'complexity must be one of: {", ".join(valid_complexities)}'
                }, status=status.HTTP_400_BAD_REQUEST)

            if priority.lower() not in valid_priorities:
                return Response({
                    'error': f'priority must be one of: {", ".join(valid_priorities)}'
                }, status=status.HTTP_400_BAD_REQUEST)

            # Create the prompt with sanitized content
            prompt = f"""
            Analyze the following feature request and provide a detailed analysis:

            Feature Description: {feature}
            Complexity Level: {complexity}
            Priority: {priority}

            Please provide:
            1. A detailed analysis of the feature
            2. Technical recommendations
            3. Estimated timeline
            4. Risk assessment
            5. Next steps

            Format the response in a clear, structured way.
            """

            # Initialize OpenAI client with error handling
            if not hasattr(settings, 'OPENAI_API_KEY') or not settings.OPENAI_API_KEY:
                return Response({
                    'error': 'OpenAI API key not configured'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

            # Get the analysis from OpenAI with error handling
            try:
                completion = client.chat.completions.create(
                    model="gpt-3.5-turbo",
                    messages=[
                        {
                            "role": "system",
                            "content": "You are an experienced software architect and project manager. Provide detailed, practical analysis of feature requests."
                        },
                        {
                            "role": "user",
                            "content": prompt
                        }
                    ],
                    temperature=0.7,
                    max_tokens=1000
                )

                analysis = completion.choices[0].message.content
            except Exception as openai_error:
                return Response({
                    'error': f'OpenAI API error: {str(openai_error)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

            # Create and save the feature with user association
            feature_obj = Feature.objects.create(
                description=feature,
                complexity=complexity,
                priority=priority,
                analysis=analysis,
                created_by=request.user  # Associate with authenticated user
            )

            return Response({
                'id': feature_obj.id,
                'analysis': analysis
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': 'Internal server error'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {'error': 'Username already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) 