install:
	python3 -m venv backend/venv
	backend/venv/bin/pip install -r backend/requirements-dev.txt
	backend/venv/bin/pre-commit install
	echo "SECRET_KEY=$$(backend/venv/bin/python -c 'import secrets; print(secrets.token_urlsafe())')" > backend/.env
	echo 'DEBUG=True' >> backend/.env
	echo 'CORS_ORIGIN_WHITELIST=http://localhost:8080' >> backend/.env
	make migrations
	make superuser
	cd frontend && npm install

superuser:
	backend/venv/bin/python backend/manage.py createsuperuser

seed:
	backend/venv/bin/python backend/manage.py seed

clean:
	rm -rf backend/venv backend/db.sqlite3 frontend/node_modules

run:
	make -j 2 run-backend run-frontend

run-backend:
	backend/venv/bin/python backend/manage.py runserver

run-frontend:
	cd frontend && npm start

migrations:
	backend/venv/bin/python backend/manage.py makemigrations
	backend/venv/bin/python backend/manage.py migrate
