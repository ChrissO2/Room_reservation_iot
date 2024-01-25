import http.client
from datetime import datetime, timedelta
from time import sleep
import ssl
import paho.mqtt.client as mqtt
import json

BACKEND_IP = "62.171.156.180"
BROKER_IP = "meeting-system.rolo-labs.xyz"

LAST_SEND = 0
SEND_TIMESTAMP = 10

DEFAULT_HEADERS = {"Content-type": "application/json"}
DEFAULT_RFID_ID = 1

server_cert_path = "/home/app/webapp/ISRG_Root_X1.pem"


def is_room_free_at(start_date, end_date):
    connection = http.client.HTTPConnection(BACKEND_IP, 8000, timeout=10)
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
    print(response_data)
    return response_data.get("is_free")


def room_state():
    current_time = datetime.now()
    room_available = is_room_free_at(
        datetime.now().isoformat(), (datetime.now() + timedelta(seconds=5)).isoformat()
    )
    payload = {
        "is_free": room_available,
        "msg": "wolne" if room_available else "zajete",
        "mode": "default",
    }
    client.publish("room_state", json.dumps(payload))


def add_participant_to_meeting(client, userdata, message):
    parameters = json.loads(str(message.payload.decode("utf-8")))
    rfid = parameters["rfid_reader_id"]
    card_id = parameters["card_id"]
    time_registration = parameters["time"]
    json_data = json.dumps(
        {"rfid_card_id": rfid, "card_id": card_id, "time": time_registration}
    )
    connection_participant = http.client.HTTPConnection(BACKEND_IP, 8000, timeout=10)
    connection_participant.request(
        "POST", "/api/new_meeting_participant_rfid", json_data, DEFAULT_HEADERS
    )
    response = connection_participant.getresponse()
    print(response)
    response_data = json.loads(response.read().decode())
    print(response_data)


def connect_to_broker():
    client_subscribe.connect(BROKER_IP, 8883)
    client.connect(BROKER_IP, 8883)
    client_subscribe.subscribe("participant_registration")
    client_subscribe.on_message = add_participant_to_meeting
    client_subscribe.loop_start()


def set_tls(client):
    client.tls_set(
        ca_certs=server_cert_path,
        tls_version=ssl.PROTOCOL_TLSv1_2,
    )
    return client


if __name__ == "__main__":
    client = mqtt.Client()
    client_subscribe = mqtt.Client()
    set_tls(client)
    set_tls(client_subscribe)

    try:
        connect_to_broker()
        while True:
            room_state()
            sleep(5)
    except Exception as e:
        print(e.with_traceback())
