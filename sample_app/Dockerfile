# Sample Dockerfile for testing container image vulnerability scanning
FROM python:3.9-slim

WORKDIR /app

# Copy dependency definition and install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application source
COPY app.py .

EXPOSE 5000

CMD ["python", "app.py"]
