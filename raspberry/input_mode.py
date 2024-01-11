import os
from datetime import datetime, timedelta

import RPi.GPIO as GPIO
import board
import neopixel

from config import *


MIN_POSITION = 0
MAX_POSITION = 7

position = 3

def handle_encoder_left(channel):
    global position
    right = GPIO.input(encoderRight)
    if not right and position < MAX_POSITION:
        position += 1
    elif right and position > MIN_POSITION:
        position -= 1
     

def set_hour():
    start_time = datetime.now()
    chosen_time = start_time
    
    GPIO.add_event_detect(encoderLeft, GPIO.FALLING, callback=handle_encoder_left, bouncetime=200)

    while datetime.now() - start_time > timedelta(0, 180):
        pass
