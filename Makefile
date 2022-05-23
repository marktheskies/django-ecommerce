full-install:
	make clean
	make install
	make environ
	make migrate
	make superuser
	make seed
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

environ:
	# Scaffold a new .env file
	echo SECRET_KEY=$$(backend/venv/bin/python -c 'import secrets; print(secrets.token_urlsafe())') > backend/.env
	echo DEBUG=True >> backend/.env
	echo CORS_ORIGIN_WHITELIST=http://localhost:3000 >> backend/.env
	echo DB_NAME=postgres >> backend/.env
	echo DB_USER=postgres >> backend/.env
	echo DB_PASS=postgres >> backend/.env
	echo DB_HOST=postgres >> backend/.env
	echo DB_PORT=5432 >> backend/.env

devserver:
	# Run a dockerised development server.
	docker compose up

migrate:
	docker compose run --rm django python manage.py migrate

superuser:
	docker compose run --rm django python manage.py createsuperuser

seed:
	docker compose run --rm django python manage.py seed

clean:
	docker compose down -v --rmi all
	rm -rf backend/venv frontend/node_modules data/
