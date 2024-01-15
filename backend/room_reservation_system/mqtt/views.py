import json
import sqlite3

from mqtt_connection import client
from django.shortcuts import render

# Create your views here.
# TODO save to the database
def save_message_to_database(request):
    request_data = json.loads(request.body)
    rc, mid = client.publish(request_data['topic'], request_data['payload'])

