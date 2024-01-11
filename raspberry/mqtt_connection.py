#!/usr/bin/env python3

# pylint: disable=no-member

import logging
from datetime import datetime, timedelta
from xmlrpc.client import DateTime
import RPi.GPIO as GPIO
from config import *  # pylint: disable=unused-wildcard-import
from mfrc522 import MFRC522
import paho.mqtt.client as mqtt

# Configure logging
logging.basicConfig(filename='rfid_log.txt', level=logging.DEBUG)

TERMINAL_ID = 'T0'
# BROKER = 'localhost'
BROKER = '10.108.33.127'

readRfidCards = {}
client = mqtt.Client()


def call_worker(msg):
    client.publish("rfid", msg + '.' + TERMINAL_ID)


def connect_to_broker():
    client.connect(BROKER)
    call_worker('Client connected')

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

# if __name__ == "__main__":
#     try:
#         connect_to_broker()
#         read_loop()
#     except Exception as e:
#         logging.exception(e)
#         print(e)
#         GPIO.cleanup()