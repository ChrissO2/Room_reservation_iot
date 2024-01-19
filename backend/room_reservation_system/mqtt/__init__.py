import paho.mqtt.client as mqtt
from room_reservation_system.settings import *

from mqtt.mqtt_connection import send_message_of_availability
mqtt.Client().connect(MQTT_SERVER)
mqtt.client.loop_start()
