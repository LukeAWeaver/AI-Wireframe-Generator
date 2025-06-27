# Production Logging Configuration

## Environment Variables

Control logging behavior in production using these environment variables:

### Logging Level
```env
# Set logging level (DEBUG, INFO, WARNING, ERROR, CRITICAL)
LOG_LEVEL=INFO
```

### Request Logging
```env
# Enable/disable detailed request logging
ENABLE_REQUEST_LOGGING=True  # or False
```

## Production Configurations

### 1. Full Logging (Development-like)
```env
LOG_LEVEL=INFO
ENABLE_REQUEST_LOGGING=True
```

### 2. Minimal Logging (Performance-focused)
```env
LOG_LEVEL=WARNING
ENABLE_REQUEST_LOGGING=False
```

### 3. Error-Only Logging
```env
LOG_LEVEL=ERROR
ENABLE_REQUEST_LOGGING=False
```

## Viewing Logs

### Docker Compose
```bash
# Real-time logs
docker compose logs -f backend

# Recent logs
docker compose logs backend

# Logs with timestamps
docker compose logs -t backend

# Last 100 lines
docker compose logs --tail=100 backend
```

### Direct File Access
```bash
# View log file directly
cat backend/logs/requests.log

# Follow log file
tail -f backend/logs/requests.log

# Search for specific requests
grep "POST /api/users/" backend/logs/requests.log
```

### Production Deployment (Render, Heroku, etc.)
- **Render**: Logs appear in the dashboard
- **Heroku**: Use `heroku logs --tail`
- **AWS**: CloudWatch logs
- **GCP**: Cloud Logging

## Log File Management

### Automatic Rotation
Consider adding log rotation to prevent large log files:

```bash
# Example: Rotate logs daily
logrotate /etc/logrotate.d/django-logs
```

### Log File Size Monitoring
```bash
# Check log file size
ls -lh backend/logs/requests.log

# Monitor disk usage
du -sh backend/logs/
```

## Security Considerations

- Logs exclude sensitive headers (authorization, cookies)
- Request bodies are truncated to 500 characters
- Consider log encryption for sensitive data
- Implement log retention policies 