# syntax = docker/dockerfile:1.2

FROM python:3

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

RUN apt-get update
RUN apt-get install -y postgresql-client

WORKDIR /usr/src/app
COPY . .
RUN pip install -r requirements.txt
