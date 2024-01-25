#!/usr/bin/env python3

# pylint: disable=no-member
import json
import logging
from datetime import datetime, timedelta
from xmlrpc.client import DateTime
import RPi.GPIO as GPIO
from config import *  # pylint: disable=unused-wildcard-import
from mfrc522 import MFRC522
import paho.mqtt.client as mqtt
from mqtt_tls import secure_mqtt_client
import room_http_client
import input_mode
import oled

# Configure logging
logging.basicConfig(filename="rfid_log.txt", level=logging.DEBUG)

TERMINAL_ID = "T0"
# BROKER = 'localhost'
# BROKER = '10.108.33.127'
BROKER = "meeting-system.rolo-labs.xyz"

readRfidCards = {}
client = mqtt.Client()
PARTICIPANT_REGISTRATION_CHANNEL = "participant_registration"


def publish_registration(msg):
    client.publish(PARTICIPANT_REGISTRATION_CHANNEL, msg)


def connect_to_broker():
    secure_mqtt_client(client)
    client.connect(BROKER, 8883)


def send_registration_event_to_broker(card_id):
    if input_mode.MODE == "input":
        return

    str_card_id = "".join(card_id)
    registration_details = json.dumps(
        {
            "rfid_reader_id": room_http_client.DEFAULT_RFID_ID,
            "card_id": str_card_id,
            "time": datetime.now().isoformat(),
        }
    )

    publish_registration(registration_details)
    oled.update_parameters(
        {"mode": "default", "msg": "Zarejestrowano spotkania", "is_free": False}
    )

    logging.debug(registration_details)


"""
Initialize mqtt connection for rfid card reader
"""


def initialize_mqtt_connection():
    try:
        connect_to_broker()
    except Exception as e:
        logging.exception(e)
        print(e)
        GPIO.cleanup()
