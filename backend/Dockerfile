FROM python:3.13.7-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Add the current directory to Python path
ENV PYTHONPATH=/app

# Make entrypoint script executable
RUN chmod +x entrypoint.sh

RUN useradd -m appuser
USER appuser

EXPOSE 3001
CMD ["./entrypoint.sh"]
