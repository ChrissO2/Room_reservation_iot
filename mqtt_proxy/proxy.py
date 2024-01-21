import http.client
from datetime import datetime
from time import sleep

import paho.mqtt.client as mqtt
import json

BACKEND_IP = "62.171.156.180"
BROKER_IP = "62.171.156.180"

connection = http.client.HTTPConnection(BACKEND_IP, 8000, timeout=10)

DEFAULT_HEADERS = {"Content-type": "application/json"}
DEFAULT_RFID_ID = 1

def is_room_free_at(start_date, end_date):
    json_data = json.dumps(
        {
            "start_time": start_date,
            "end_time": end_date,
            "rfid_reader_id": DEFAULT_RFID_ID,
        }
    )
    connection.request("GET", "/api/room_availability_rfid", json_data, DEFAULT_HEADERS)
    response = connection.getresponse()
    print(response)
    response_data = json.loads(response.read().decode())
    return response_data["is_free"]





def call_worker():
    room_available = is_room_free_at(datetime.now().isoformat(), datetime.now().isoformat())
    payload = {
        "is_free": room_available,
        "msg": "wolne" if room_available else "zajete",
        "mode": "default"
    }
    client.publish("room_state", json.dumps(payload))


def connect_to_broker():
    client.connect(BROKER_IP)
    call_worker()


if __name__ == "__main__":
    client = mqtt.Client()
    try:
        while True:
            connect_to_broker()
            sleep(5)
    except Exception as e:
        print(e)
