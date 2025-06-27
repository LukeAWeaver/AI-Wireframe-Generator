import json
import logging
import os
from datetime import datetime
from django.utils.deprecation import MiddlewareMixin
from django.http import JsonResponse

# Ensure logs directory exists (with fallback for production environments)
logs_dir = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'logs')
try:
    os.makedirs(logs_dir, exist_ok=True)
except PermissionError:
    # In production environments like Render, we might not have write permissions
    # Use a temporary directory or disable file logging
    logs_dir = '/tmp/logs'
    try:
        os.makedirs(logs_dir, exist_ok=True)
    except (PermissionError, OSError):
        # If we still can't create logs directory, disable file logging
        logs_dir = None

# Set up logging
logger = logging.getLogger('request_logger')

# If we can't create logs directory, configure logger to only use console
if logs_dir is None:
    import logging.config
    logging.config.dictConfig({
        'version': 1,
        'disable_existing_loggers': False,
        'handlers': {
            'console': {
                'class': 'logging.StreamHandler',
                'formatter': 'simple',
            },
        },
        'formatters': {
            'simple': {
                'format': '{levelname} {message}',
                'style': '{',
            },
        },
        'loggers': {
            'request_logger': {
                'handlers': ['console'],
                'level': 'INFO',
                'propagate': False,
            },
        },
    })

class RequestLoggingMiddleware(MiddlewareMixin):
    """
    Middleware to log every request with detailed information
    """
    
    def process_request(self, request):
        """Log incoming request details"""
        # Store request start time
        request.start_time = datetime.now()
        
        # Get request details
        method = request.method
        path = request.path
        user_agent = request.META.get('HTTP_USER_AGENT', 'Unknown')
        remote_addr = self.get_client_ip(request)
        content_type = request.META.get('CONTENT_TYPE', '')
        
        # Get request body (for POST/PUT requests)
        body = ''
        if method in ['POST', 'PUT', 'PATCH']:
            try:
                if hasattr(request, 'body'):
                    body = request.body.decode('utf-8')[:500]  # Limit to 500 chars
                    if len(request.body) > 500:
                        body += '... (truncated)'
            except Exception as e:
                body = f'[Error reading body: {e}]'
        
        # Get query parameters
        query_params = dict(request.GET.items())
        
        # Get headers (excluding sensitive ones)
        headers = {}
        sensitive_headers = ['authorization', 'cookie', 'x-csrftoken']
        for key, value in request.META.items():
            if key.startswith('HTTP_'):
                header_name = key[5:].lower().replace('_', '-')
                if header_name not in sensitive_headers:
                    headers[header_name] = value
        
        # Log request
        log_data = {
            'timestamp': request.start_time.isoformat(),
            'type': 'REQUEST',
            'method': method,
            'path': path,
            'remote_addr': remote_addr,
            'user_agent': user_agent,
            'content_type': content_type,
            'query_params': query_params,
            'headers': headers,
            'body': body if body else None,
        }
        
        # Print to console (for immediate visibility)
        print(f"\n{'='*80}")
        print(f"🚀 INCOMING REQUEST: {method} {path}")
        print(f"⏰ Time: {request.start_time.strftime('%Y-%m-%d %H:%M:%S')}")
        print(f"🌐 IP: {remote_addr}")
        print(f"👤 User-Agent: {user_agent}")
        
        if query_params:
            print(f"🔍 Query Params: {json.dumps(query_params, indent=2)}")
        
        if body:
            print(f"📦 Body: {body}")
        
        if headers:
            print(f"📋 Headers: {json.dumps(headers, indent=2)}")
        
        print(f"{'='*80}\n")
        
        # Also log to file (only if we can write to logs)
        if logs_dir is not None:
            logger.info(f"Request: {json.dumps(log_data, indent=2)}")
        
        return None
    
    def process_response(self, request, response):
        """Log response details"""
        if not hasattr(request, 'start_time'):
            return response
        
        # Calculate response time
        end_time = datetime.now()
        duration = (end_time - request.start_time).total_seconds()
        
        # Get response details
        status_code = response.status_code
        content_type = response.get('Content-Type', '')
        
        # Get response body (for JSON responses)
        body = ''
        if hasattr(response, 'content') and content_type.startswith('application/json'):
            try:
                body = response.content.decode('utf-8')[:500]  # Limit to 500 chars
                if len(response.content) > 500:
                    body += '... (truncated)'
            except Exception as e:
                body = f'[Error reading response: {e}]'
        
        # Log response
        log_data = {
            'timestamp': end_time.isoformat(),
            'type': 'RESPONSE',
            'method': request.method,
            'path': request.path,
            'status_code': status_code,
            'duration_ms': round(duration * 1000, 2),
            'content_type': content_type,
            'body': body if body else None,
        }
        
        # Print to console
        status_emoji = "✅" if 200 <= status_code < 300 else "❌" if status_code >= 400 else "⚠️"
        print(f"{status_emoji} RESPONSE: {request.method} {request.path} -> {status_code} ({duration*1000:.2f}ms)")
        
        if body:
            print(f"📤 Response Body: {body}")
        
        print(f"{'='*80}\n")
        
        # Also log to file (only if we can write to logs)
        if logs_dir is not None:
            logger.info(f"Response: {json.dumps(log_data, indent=2)}")
        
        return response
    
    def process_exception(self, request, exception):
        """Log exceptions"""
        if not hasattr(request, 'start_time'):
            return None
        
        end_time = datetime.now()
        duration = (end_time - request.start_time).total_seconds()
        
        # Log exception
        log_data = {
            'timestamp': end_time.isoformat(),
            'type': 'EXCEPTION',
            'method': request.method,
            'path': request.path,
            'exception_type': type(exception).__name__,
            'exception_message': str(exception),
            'duration_ms': round(duration * 1000, 2),
        }
        
        # Print to console
        print(f"💥 EXCEPTION: {request.method} {request.path}")
        print(f"❌ {type(exception).__name__}: {str(exception)}")
        print(f"⏱️ Duration: {duration*1000:.2f}ms")
        print(f"{'='*80}\n")
        
        # Also log to file (only if we can write to logs)
        if logs_dir is not None:
            logger.error(f"Exception: {json.dumps(log_data, indent=2)}")
        
        return None
    
    def get_client_ip(self, request):
        """Get the client's real IP address"""
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip 