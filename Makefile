full-install:
	make clean
	make install
	make django-secret-key
	make migrations
	make migrate
	make superuser
	make devserver

install:
	# Create Python virtual environment.
	python3 -m venv backend/venv

	# Ensure pip is up to date.
	backend/venv/bin/pip install --upgrade pip

	# Install backend dependencies, skipping psycopg2 which is not required on
	# the host machine as Postgres will run as a containerised service in Docker.
	backend/venv/bin/pip install \
		$$(grep -v '^ *#\|^psycopg2' backend/requirements.txt | grep .) \
		-r backend/requirements-dev.txt

	# Install pre-commit hooks. See https://pre-commit.com/ for more information.
	backend/venv/bin/pre-commit install

	# Install frontend dependencies.
	cd frontend && npm install

django-secret-key:
	# Create a strong secret key in backend/.secret
	echo SECRET_KEY=$$(backend/venv/bin/python -c 'import secrets; print(secrets.token_urlsafe())') > backend/.secret

devserver:
	# Run a dockerised development server.
	docker compose up

migrate:
	docker compose run --rm django python manage.py migrate

migrations:
	docker compose run --rm django python manage.py makemigrations

superuser:
	docker compose run --rm django python manage.py createsuperuser

seed:
	docker compose run --rm django python manage.py seed

clean:
	docker compose down -v --rmi all
	rm -rf backend/venv frontend/node_modules data/
