import datetime

import paho.mqtt.client as mqtt
from room_reservation_system import settings
from base.models import Room, Meeting

TIMESTAMP_SEND_ROOM_AVAILABLE = 10
LAST_SEND_MESSAGE = 0


def on_connect(mqtt_client, userdata, flags, rc):
    if rc == 0:
        print('Connected successfully')
        mqtt_client.subscribe('django/mqtt')
    else:
        print('Bad connection. Code:', rc)


def on_message(msg):
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


def send_message_of_availability(rfid_reader_id):
    current_time = datetime.datetime.now
    global LAST_SEND_MESSAGE
    if current_time - LAST_SEND_MESSAGE >= TIMESTAMP_SEND_ROOM_AVAILABLE:
        LAST_SEND_MESSAGE = current_time
        room_id = Room.objects.get(rfid_reader_id=rfid_reader_id).id
        room_available = check_room_is_available(room_id)
        client.publish("room_state", room_available)


def check_room_is_available(room_id):
    if not Room.objects.filter(id=room_id).exists():
        raise ValueError("Room does not exist.")

    current_time = datetime.datetime.now()
    room_available = Meeting.objects.filter(
        room_id=room_id,
        start_time__gt=current_time,
        end_time__gt=current_time
    ).exists()

    return not room_available
