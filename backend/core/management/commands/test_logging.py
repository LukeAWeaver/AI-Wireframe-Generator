from django.core.management.base import BaseCommand
from django.test import RequestFactory
from core.logging_middleware import RequestLoggingMiddleware
import json

class Command(BaseCommand):
    help = 'Test the request logging middleware'

    def handle(self, *args, **options):
        self.stdout.write(self.style.SUCCESS('Testing request logging middleware...'))
        
        # Create a test request
        factory = RequestFactory()
        request = factory.get('/api/test/', {'param': 'value'})
        request.META['HTTP_USER_AGENT'] = 'Test User Agent'
        request.META['REMOTE_ADDR'] = '127.0.0.1'
        
        # Create middleware instance
        middleware = RequestLoggingMiddleware()
        
        # Test request processing
        self.stdout.write('Processing test request...')
        middleware.process_request(request)
        
        # Create a mock response
        from django.http import JsonResponse
        response = JsonResponse({'message': 'Test response'})
        
        # Test response processing
        self.stdout.write('Processing test response...')
        middleware.process_response(request, response)
        
        self.stdout.write(self.style.SUCCESS('Logging test completed!'))
        self.stdout.write('Check the console output and logs/requests.log file for results.') 