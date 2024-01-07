#!/usr/bin/env python3

# pylint: disable=no-member

from datetime import datetime, timedelta
from xmlrpc.client import DateTime
import RPi.GPIO as GPIO
from config import *  # pylint: disable=unused-wildcard-import
from mfrc522 import MFRC522
import paho.mqtt.client as mqtt


TERMINAL_ID = 'T0'
BROKER = 'localhost'
# BROKER = '10.108.33.113'

readRfidCards = {}
client = mqtt.Client()


def call_worker(msg):
    client.publish("rfid", msg + '.' + TERMINAL_ID)


def connect_to_broker():
    client.connect(BROKER)
    call_worker('Client connected')


def rfidRead():
    MIFAREReader = MFRC522()
    acttivate_time = None
    while True:
        if acttivate_time and datetime.now() - acttivate_time > timedelta(0, 0, 10000):
            blinkLed(False)
            buzz(False)
        (status, TagType) = MIFAREReader.MFRC522_Request(MIFAREReader.PICC_REQIDL)
        if status == MIFAREReader.MI_OK:
            (status, uid) = MIFAREReader.MFRC522_Anticoll()
            registered_uid = [str(elem) for elem in uid]
            str_uid = ''.join(registered_uid)
            if status == MIFAREReader.MI_OK and (str_uid not in readRfidCards.keys() or datetime.now() - readRfidCards[str_uid] > timedelta(0, 3)):
                acttivate_time = datetime.now()
                blinkLed(True)
                buzz(True)
                num = 0
                for i in range(0, len(uid)):
                    num += uid[i] << (i*8)
                print(f"Card read UID: {uid} > {num}")
                readRfidCards[''.join(registered_uid)] = datetime.now()
                call_worker(str(num))
                print(readRfidCards[''.join(registered_uid)])
                

    
def blinkLed(state):
    GPIO.output(led3, state)

def buzz(state):
    GPIO.output(buzzerPin, not state)


if __name__ == "__main__":
    try:
        connect_to_broker()
        rfidRead()
    except Exception as e:
        print(e)
        GPIO.cleanup()  
