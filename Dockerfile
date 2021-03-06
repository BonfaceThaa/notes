# pull official base image
FROM python:3.8.3-alpine

# create
# set work directory
WORKDIR /notes

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install pre-requisites
RUN apk add zlib-dev jpeg-dev gcc musl-dev

# install dependencies
RUN pip install --upgrade pip
COPY notes_project/requirements.txt .
RUN pip install -r requirements.txt

# copy project
COPY . .