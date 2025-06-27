import time
import logging
from django.core.cache import cache
from django.http import HttpResponseForbidden
from django.conf import settings
import re

logger = logging.getLogger('security')

class SecurityMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.rate_limit_cache = {}
        
    def __call__(self, request):
        # Log incoming request for security checks
        print(f"🔒 SECURITY CHECK: {request.method} {request.path}")
        print(f"🌐 IP: {self._get_client_ip(request)}")
        print(f"👤 User-Agent: {request.META.get('HTTP_USER_AGENT', 'Unknown')}")
        
        # Rate limiting
        if not self._check_rate_limit(request):
            print(f"❌ RATE LIMIT EXCEEDED: {self._get_client_ip(request)}")
            return HttpResponseForbidden("Rate limit exceeded")
            
        # Request validation
        if not self._validate_request(request):
            print(f"❌ REQUEST BLOCKED: {request.method} {request.path}")
            return HttpResponseForbidden("Invalid request")
            
        print(f"✅ SECURITY PASSED: {request.method} {request.path}")
        response = self.get_response(request)
        
        # Security headers
        response['X-Content-Type-Options'] = 'nosniff'
        response['X-Frame-Options'] = 'DENY'
        response['X-XSS-Protection'] = '1; mode=block'
        response['Referrer-Policy'] = 'strict-origin-when-cross-origin'
        
        return response
        
    def _check_rate_limit(self, request):
        """Basic rate limiting based on IP"""
        client_ip = self._get_client_ip(request)
        cache_key = f"rate_limit_{client_ip}"
        
        # Get current request count
        request_count = cache.get(cache_key, 0)
        
        # Check if limit exceeded (100 requests per minute)
        if request_count >= 100:
            return False
            
        # Increment counter
        cache.set(cache_key, request_count + 1, 60)  # 60 seconds TTL
        return True
        
    def _validate_request(self, request):
        """Validate request for suspicious patterns"""
        # Only block suspicious user agents in production
        if not getattr(settings, 'DEBUG', False):
            user_agent = request.META.get('HTTP_USER_AGENT', '')
            suspicious_patterns = [
                r'bot',
                r'crawler',
                r'spider',
                r'scanner',
                r'curl',
                r'wget'
            ]
            for pattern in suspicious_patterns:
                if re.search(pattern, user_agent.lower()):
                    return False
        # Check for suspicious paths
        path = request.path.lower()
        suspicious_paths = [
            '/admin/',
            '/wp-admin/',
            '/phpmyadmin/',
            '/.env',
            '/config',
            '/backup'
        ]
        for suspicious_path in suspicious_paths:
            if suspicious_path in path:
                return False
        return True
        
    def _get_client_ip(self, request):
        """Get client IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip 