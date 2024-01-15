import os
from datetime import datetime, timedelta
import json
import random
import time

import RPi.GPIO as GPIO
import board

from config import *
from oled import update_parameters
import room_http_client
import time

# execute = True

MODE = "default"

# time displayed on encoder
chosen_time = datetime.now()
# How many minutes encoder will move time
INTERVAL = timedelta(minutes=5)


def generate_sample_reservation_data():
    """
    If you don't manage to write backend in time we will use this function to test :P
    """
    isAvailable = random.random() < 0.5
    return json.dumps({"isAvailable": isAvailable})


def handle_encoder_left(channel):
    """
    Handle encoder movement, change time and update oled
    """
    global chosen_time
    global MODE

    if MODE != "input":
        return

    prev_time = chosen_time
    right = GPIO.input(encoderRight)
    if not right:
        chosen_time += INTERVAL
    elif right:
        chosen_time -= INTERVAL

    if prev_time != chosen_time:
        update_parameters(
            {"is_free": True, "msg": chosen_time.strftime("%H:%M"), "mode": "input"}
        )


def redButtonPressed(channel):
    """
    Exit input mode
    """
    global MODE
    MODE = "default"
    update_parameters(
        {"is_free": True, "msg": chosen_time.strftime("%H:%M"), "mode": "default"}
    )


def greenButtonPressed(channel):
    global MODE
    if MODE == "default":
        MODE = "input"
        set_hour()

    # isAvailable = generate_sample_reservation_data()
    # msg = 'Sala zostala zarezerwowana' if isAvailable else 'Sala jest zajeta w podanych godzinach'
    # room_http_client.reserve_room(datetime.now(), chosen_time)
    # time.sleep(5)
    # update_parameters({'is_free': True, 'msg': chosen_time.strftime('%H:%M'), 'mode': 'info'})


def reserve_room_from_input_mode(organizer_id):
    global chosen_time
    global MODE
    if MODE != "input":
        return

    is_free = room_http_client.is_room_free_at(datetime.now(), chosen_time)
    if is_free:
        room_http_client.reserve_room(datetime.now(), chosen_time, organizer_id)
        MODE = "default"
        update_parameters(
            {"is_free": True, "msg": "Sala została zarejestrowana", "mode": "info"}
        )
        time.sleep(5)
        update_parameters({"is_free": True, "msg": "Wolna", "mode": "default"})

    else:
        MODE = "default"
        update_parameters(
            {"is_free": True, "msg": "Sala jest zajeta w tym czasie", "mode": "info"}
        )
        time.sleep(5)
        update_parameters({"is_free": True, "msg": "Wolna", "mode": "default"})


GPIO.add_event_detect(
    encoderLeft, GPIO.FALLING, callback=handle_encoder_left, bouncetime=200
)
GPIO.add_event_detect(
    buttonRed, GPIO.FALLING, callback=redButtonPressed, bouncetime=200
)
GPIO.add_event_detect(
    buttonGreen, GPIO.FALLING, callback=greenButtonPressed, bouncetime=200
)


def set_hour():
    """
    Function called when entering input mode. Selects new start_time and updates oled.
    """
    global MODE
    start_time = datetime.now()
    chosen_time = start_time
    update_parameters(
        {"is_free": True, "msg": datetime.now().strftime("%H:%M"), "mode": "input"}
    )

    # while MODE=='input' and datetime.now() - start_time < timedelta(minutes=3):
    #     pass
