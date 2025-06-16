from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.conf import settings
import openai
from .models import Feature
from .serializers import FeatureSerializer

class FeatureViewSet(viewsets.ModelViewSet):
    queryset = Feature.objects.all().order_by('-created_at')
    serializer_class = FeatureSerializer

    @action(detail=False, methods=['post'])
    def analyze(self, request):
        try:
            # Get the feature details from the request
            feature = request.data.get('feature')
            complexity = request.data.get('complexity')
            priority = request.data.get('priority')

            # Create the prompt
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

            # Initialize OpenAI client
            client = openai.OpenAI(api_key=settings.OPENAI_API_KEY)

            # Get the analysis from OpenAI
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

            # Create and save the feature
            feature_obj = Feature.objects.create(
                description=feature,
                complexity=complexity,
                priority=priority,
                analysis=analysis
            )

            return Response({
                'id': feature_obj.id,
                'analysis': analysis
            }, status=status.HTTP_201_CREATED)

        except Exception as e:
            return Response({
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR) 