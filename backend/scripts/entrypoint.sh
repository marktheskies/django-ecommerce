#!/bin/bash

# Django backend entrypoint script
# This script is called by the "django" service in ../docker-compose.yaml.
# It runs migrations and then starts the server.

set -e

python manage.py migrate
python manage.py runserver 0.0.0.0:8000
