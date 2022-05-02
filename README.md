# django-ecommerce

A simple ecommerce implementation written in Django and React.

## Set up development environment

To get started, clone the repo to your local machine and install using `make`.

```bash
git clone https://github.com/marktheskies/django-ecommerce.git
cd django-ecommerce
make install
```

Once installed, start the frontend and backend development servers.

```bash
make run
```

## Seeding the database

You can add fake data to the database for testing using:

```bash
make seed
```

- Log into the backend at http://localhost:8000/admin using your superuser credentials.

- The frontend application will available at http://localhost:8080.
