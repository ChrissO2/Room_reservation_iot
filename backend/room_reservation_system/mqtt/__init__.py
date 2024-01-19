import paho.mqtt.client as mqtt
from room_reservation_system.settings import *
from threading import Thread

from mqtt.mqtt_connection import send_message_of_availability
mqtt.Client().connect(MQTT_SERVER)
thread = Thread(target=send_message_of_availability)
thread.daemon = True
thread.start()
mqtt.client.loop_start()
