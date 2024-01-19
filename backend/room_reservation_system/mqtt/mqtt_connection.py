import datetime
import json

import paho.mqtt.client as mqtt
from room_reservation_system import settings
from base.models import Room, Meeting
from threading import Thread

TIMESTAMP_SEND_ROOM_AVAILABLE = 10
LAST_SEND_MESSAGE = 0


def on_connect(mqtt_client, userdata, flags, rc):
    if rc == 0:
        print('Connected successfully')
        mqtt.client.subscribe('new_meeting')
        thread = Thread(target=send_message_of_availability)
        thread.daemon = True
        thread.start()
        print('Bad connection. Code:', rc)


def on_message(msg):
    # if msg.topic == 'new_meeting':
    #     meeting_add_rfid()
    print(f'Received message on topic: {msg.topic} with payload: {msg.payload}')


client = mqtt.Client()
client.on_connect = on_connect
client.on_message = on_message
client.username_pw_set(settings.MQTT.USER, settings.MQTT.PASSWORD)
client.connect(
    host=settings.MQTT_SERVER,
    port=settings.MQTT_PORT,
    keepalive=settings.MQTT_KEEPALIVE
)


# TODO działa tylko dla jednego pokoju w bazie
def send_message_of_availability():
    while True:
        current_time = datetime.datetime.now
        global LAST_SEND_MESSAGE
        if current_time - LAST_SEND_MESSAGE >= TIMESTAMP_SEND_ROOM_AVAILABLE:
            LAST_SEND_MESSAGE = current_time
            room_id = Room.objects.first().id
            room_available = check_room_is_available(room_id)
            payload = {
                "is_free": room_available,
                "msg": "wolne" if room_available else "zajete"
            }
            client.publish("room_state", json.dumps(payload))


def check_room_is_available(room_id):
    if not Room.objects.filter(id=room_id).exists():
        return False

    current_time = datetime.datetime.now()
    room_available = Meeting.objects.filter(
        room_id=room_id,
        start_time__lte=current_time,
        end_time__gt=current_time
    ).exists()

    return not room_available
