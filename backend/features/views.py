from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from django.conf import settings
import openai
from .models import FeatureAnalysis, User, PortfolioTechnology
from .serializers import FeatureAnalysisSerializer, UserSerializer, PortfolioTechnologySerializer
from django.db import IntegrityError
import os
import re
import html
from django.views.decorators.cache import cache_control
from django.utils.decorators import method_decorator
from rest_framework.request import Request
from rest_framework.response import Response
from typing import Any

class FeatureAnalysisViewSet(viewsets.ModelViewSet):
    queryset = FeatureAnalysis.objects.all().order_by('-created_at')
    serializer_class = FeatureAnalysisSerializer
    permission_classes = [IsAuthenticated]

    def sanitize_input(self, text: str) -> str:
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
    def analyze(self, request: Request) -> Response:
        try:
            # Validate required fields
            feature = request.data.get('feature')
            complexity = request.data.get('complexity')
            priority = request.data.get('priority')

            if not all([feature, complexity, priority]):
                response = Response({
                    'error': 'feature, complexity, and priority are required'
                }, status=status.HTTP_400_BAD_REQUEST)
                response['Cache-Control'] = 'no-store'
                return response

            # Sanitize inputs
            feature = self.sanitize_input(feature)
            complexity = self.sanitize_input(complexity)
            priority = self.sanitize_input(priority)

            # Validate complexity and priority values
            valid_complexities = ['low', 'medium', 'high']
            valid_priorities = ['low', 'medium', 'high', 'critical']

            if complexity.lower() not in valid_complexities:
                response = Response({
                    'error': f'complexity must be one of: {", ".join(valid_complexities)}'
                }, status=status.HTTP_400_BAD_REQUEST)
                response['Cache-Control'] = 'no-store'
                return response

            if priority.lower() not in valid_priorities:
                response = Response({
                    'error': f'priority must be one of: {", ".join(valid_priorities)}'
                }, status=status.HTTP_400_BAD_REQUEST)
                response['Cache-Control'] = 'no-store'
                return response

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
                response = Response({
                    'error': 'OpenAI API key not configured'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                response['Cache-Control'] = 'no-store'
                return response

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
                response = Response({
                    'error': f'OpenAI API error: {str(openai_error)}'
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
                response['Cache-Control'] = 'no-store'
                return response

            # Create and save the feature analysis with user association
            feature_obj = FeatureAnalysis.objects.create(
                description=feature,
                complexity=complexity,
                priority=priority,
                analysis=analysis,
                created_by=request.user  # Associate with authenticated user
            )

            response = Response({
                'id': feature_obj.id,
                'analysis': analysis
            }, status=status.HTTP_201_CREATED)
            response['Cache-Control'] = 'no-store'
            return response

        except Exception as e:
            response = Response({
                'error': 'Internal server error'
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            response['Cache-Control'] = 'no-store'
            return response

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

    def create(self, request: Request, *args: Any, **kwargs: Any) -> Response:
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            try:
                user = serializer.save()
                response = Response(serializer.data, status=status.HTTP_201_CREATED)
                response['Cache-Control'] = 'no-store'
                return response
            except IntegrityError:
                response = Response(
                    {'error': 'Username already exists'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                response['Cache-Control'] = 'no-store'
                return response
        response = Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        response['Cache-Control'] = 'no-store'
        return response

    @action(detail=False, methods=['post'])
    def increment_build_count(self, request: Request) -> Response:
        """Increment the build count for the current user"""
        try:
            # Get the user by username from the request
            username = request.data.get('username')
            if not username:
                response = Response(
                    {'error': 'Username is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
                response['Cache-Control'] = 'no-store'
                return response
            
            user = User.objects.get(username=username)
            user.build_count += 1
            user.save()
            
            response = Response({
                'username': user.username,
                'uuid': user.uuid,
                'build_count': user.build_count
            }, status=status.HTTP_200_OK)
            response['Cache-Control'] = 'no-store'
            return response
            
        except User.DoesNotExist:
            response = Response(
                {'error': 'User not found'},
                status=status.HTTP_404_NOT_FOUND
            )
            response['Cache-Control'] = 'no-store'
            return response
        except Exception as e:
            response = Response(
                {'error': 'Failed to increment build count'},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
            response['Cache-Control'] = 'no-store'
            return response

@method_decorator(cache_control(public=True, max_age=3600), name='dispatch')
class PortfolioTechnologyViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = PortfolioTechnology.objects.all().order_by('category', 'name')
    serializer_class = PortfolioTechnologySerializer
    permission_classes = [AllowAny] 