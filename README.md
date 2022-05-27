# django-ecommerce

[![Code style: black](https://img.shields.io/badge/code%20style-black-000000.svg)](https://github.com/psf/black) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier) [![pre-commit](https://img.shields.io/badge/pre--commit-enabled-brightgreen?logo=pre-commit&logoColor=white)](https://github.com/pre-commit/pre-commit)

A simple ecommerce implementation written in Django and React.

- [Prerequisites](#prerequisites)
- [Setting up a development environment](#setting-up-a-development-environment)
  - [Before you start (hosts file hack)](#before-you-start-hosts-file-hack)
  - [Quick installation](#quick-installation)
  - [Custom installation](#custom-installation)
- [Docker environment architecture](#docker-environment-architecture)
- [Seeding the database](#seeding-the-database)

## Prerequisites

1. [Docker](https://www.docker.com/)
2. [Python3](https://www.python.org/downloads/)
3. [GNU Make](https://www.gnu.org/software/make/)

## Setting up a development environment

### Before you start (hosts file hack)

The development environment contains a mock S3 service which is accessible via the s3 endpoint `http://s3:9090`. Docker services can communicate natively on this hostname, however, your local machine (host) cannot. This means that without adding an entry for `s3` to your `/etc/hosts`, you won't be able to view any images uploaded via the Django backend.

To resolve this issue, add the following line to `/etc/hosts` on your local machine.

```text
127.0.0.1       s3
```

### Quick installation

The fastest way to get started is to use the full-install command provided in [Makefile](./Makefile):

```bash
make full-install
```

After a few moments, you can access the frontend at <http://localhost:3000> and the backend Django administration at <http://localhost:8000/admin>.

Under the hood, `make full-install`:

1. Removes any persistent data from postgres in the data/ directory (if it exists)
2. Deletes all unused Docker data (containers, images, volumes) related to this project, if they are not in use by other projects on your machine
3. Creates a Python virtual environment in [backend/](./backend/) and installs project dependencies
4. Installs [pre-commit hooks](https://pre-commit.com/) defined in [.pre-commit-config.yaml](.pre-commit-config.yaml)
5. Installs Frontend dependencies in [frontend/](./frontend/)
6. Adds environment variables to `backend/.env`
7. Makes Django migration files
8. Applies Django migrations to Postgres, in a Docker container
9. Guides you through the creation of a Django superuser
10. Adds demo data to the Postgres database
11. Starts the Docker frontend, backend and database services

### Custom installation

Each step of `make full-install` is available as its own `make` command, so you can run each in isolation, as needed. See the [Makefile](./Makefile) for more information.

## Docker environment architecture

The Docker environment comprises of 3 Docker containers, which are each defined as services in [docker-compose.yaml](./docker-compose.yaml):

1. Backend (Django)
2. Frontend (React)
3. Database (Postgres)

The container running the frontend application spins up independently. The backend container not only relies on the database container, but requires postgres to be running before it can start the Django server. To achieve this, we make use of Docker Compose's [healthcheck](https://docs.docker.com/compose/compose-file/#healthcheck) configuration.

## Seeding the database

You can add fake data to the database for testing using:

```bash
make seed
```

To customise the `seed` command, see [backend/ecommerce/management/commands/seed.py](backend/ecommerce/management/commands/seed.py) and [backend/ecommerce/management/commands/seed.yaml](backend/ecommerce/management/commands/seed.yaml) for script and data respectively.
