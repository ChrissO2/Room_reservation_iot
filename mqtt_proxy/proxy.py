import http.client
from datetime import datetime
from time import sleep

import paho.mqtt.client as mqtt
import json

BACKEND_IP = "62.171.156.180"
BROKER_IP = "62.171.156.180"

LAST_SEND = 0
SEND_TIMESTAMP = 10

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


def room_state():
    room_available = is_room_free_at(datetime.now().isoformat(), datetime.now().isoformat())
    payload = {
        "is_free": room_available,
        "msg": "wolne" if room_available else "zajete",
        "mode": "default"
    }
    client.publish("room_state", json.dumps(payload))


def add_participant_to_meeting():
    parameters = json.message.payload.decode("utf-8")
    rfid = parameters["rfid_reader_id"]
    card_id = parameters["card_id"]
    time_registration = parameters["time"]
    json_data = json.dumps(
        {
            "rfid_card_id": rfid,
            "card_id": card_id,
            "time": time_registration,
        }
    )
    connection.request("POST", "/api/new_meeting_participant_rfid", json_data, DEFAULT_HEADERS)
    response = connection.getresponse()
    print(response)
    

def connect_to_broker():
    client_subscribe.connect(BROKER_IP)
    client.connect(BROKER_IP)
    client_subscribe.subscribe("participant_registration")
    client_subscribe.on_message = add_participant_to_meeting
    client_subscribe.loop_start()


if __name__ == "__main__":
    client = mqtt.Client()
    client_subscribe = mqtt.Client()
    try:
        connect_to_broker()
        while True:
            if datetime.now() - LAST_SEND >= SEND_TIMESTAMP:
                LAST_SEND = datetime.now()
                room_state()
    except Exception as e:
        print(e)
