#!/bin/bash

# Force output to be unbuffered
set -x

echo "=== Starting entrypoint script ===" > /dev/stdout
echo "Current directory: $(pwd)" > /dev/stdout
echo "Listing files in current directory:" > /dev/stdout
ls -la > /dev/stdout

echo "All environment variables:" > /dev/stdout
env | sort > /dev/stdout

echo "=== Specific Variables ===" > /dev/stdout
echo "ENVIRONMENT: $ENVIRONMENT" > /dev/stdout
echo "DEBUG: $DEBUG" > /dev/stdout
echo "DJANGO_SETTINGS_MODULE: $DJANGO_SETTINGS_MODULE" > /dev/stdout

if [ "$ENVIRONMENT" = "development" ]; then
    echo "Starting development server..." > /dev/stdout
    exec python manage.py runserver 0.0.0.0:8000
else
    echo "Starting production server..." > /dev/stdout
    exec gunicorn core.wsgi:application --bind 0.0.0.0:8000
fi
