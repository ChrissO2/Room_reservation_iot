import os
from datetime import datetime, timedelta

import RPi.GPIO as GPIO
import board

from config import *

execute = True


chosen_time = datetime.now()
INTERVAL = timedelta(minutes=5)

position = 3

def handle_encoder_left(channel):
    global chosen_time
    right = GPIO.input(encoderRight)
    if not right and (chosen_time + INTERVAL).date() == datetime.now().today():
        chosen_time += INTERVAL
    elif right and (chosen_time - INTERVAL).date() == datetime.now().today():
        chosen_time -= INTERVAL
    #call oled
        

def redButtonPressed(channel):
    global execute
    execute = False
    
     
def greenButtonPressed(channel):
    #call backend and wait
    pass


def set_hour():
    global execute
    start_time = datetime.now()
    chosen_time = start_time

    GPIO.add_event_detect(encoderLeft, GPIO.FALLING, callback=handle_encoder_left, bouncetime=200)
    GPIO.add_event_detect(buttonRed, GPIO.FALLING, callback=redButtonPressed, bouncetime=200)
    GPIO.add_event_detect(buttonGreen, GPIO.FALLING, callback=greenButtonPressed, bouncetime=200)

    while execute and datetime.now() - start_time < timedelta(minutes=3):
        pass
