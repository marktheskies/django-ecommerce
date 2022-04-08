install:
	python3 -m venv backend/venv
	backend/venv/bin/pip install -r backend/requirements-dev.txt
	echo "SECRET_KEY=$(venv/bin/python -c 'import secrets; print(secrets.token_urlsafe())')" > backend/.env
	echo 'DEBUG=True' >> backend/.env
	echo 'CORS_ORIGIN_WHITELIST=http://localhost:8080' >> backend/.env
	backend/venv/bin/python backend/manage.py migrate
	backend/venv/bin/python backend/manage.py createsuperuser
	cd frontend && npm install

run:
	make -j 2 run-backend run-frontend

run-backend:
	backend/venv/bin/python backend/manage.py runserver

run-frontend:
	cd frontend && npm start