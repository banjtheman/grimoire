#!/bin/bash
echo "Starting flask app"
echo "Example request you can send"
echo "curl localhost:5000GRIM_CURL_STRING"
env FLASK_APP=app.py flask run
