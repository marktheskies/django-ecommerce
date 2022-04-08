# django-ecommerce

A simple ecommerce implementation written in Django and React.

## Set up development environment

1. Clone the repo to your local machine:

```bash
git clone https://github.com/marktheskies/django-ecommerce.git
cd django-ecommerce
```

2. Create a Python virtual environment in `backend/` and activate it:

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
```

3. Install dev dependencies:

```bash
pip install -r requirements-dev.txt
```

Installing dev dependencies automatically installs dependencies in both `requirements.txt` and `requirements-dev.txt`.

4. Create a file `backend/.env` with a random Django secret key and debug mode configuration:

```bash
echo "SECRET_KEY=$(venv/bin/python -c 'import secrets; print(secrets.token_urlsafe())')" > .env
echo 'DEBUG=True' >> .env
```

5. Apply migrations:

```bash
python manage.py migrate
```

6. Create a superuser so you can log into the admin page:

```
python manage.py createsuperuser
```

7. Start the development server:

```bash
python manage.py runserver
```

8. Navigate to http://localhost:8000/admin and log in using your superuser credentials.
