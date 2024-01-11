#!/usr/bin/env python3
import os
from datetime import datetime, timedelta

import RPi.GPIO as GPIO
import board
import neopixel

from config import *


MIN_POSITION = 0
MAX_POSITION = 7

position = 3


def turn_leds_on():
    global position
    pixels = neopixel.NeoPixel(board.D18, 8, brightness=0.1, auto_write=False)
    pixels.fill((0, 0, 255))
    pixels[position] = (255, 0, 0)
    pixels.show()


def turn_off():
    pixels = neopixel.NeoPixel(board.D18, 8, brightness=0, auto_write=False)
    pixels.fill((0, 0, 0))
    pixels.show()


def handle_encoder_left(channel):
    global position
    right = GPIO.input(encoderRight)
    if not right and position < MAX_POSITION:
        position += 1
    elif right and position > MIN_POSITION:
        position -= 1
    turn_leds_on()
     

def main():
    turn_leds_on()
    GPIO.add_event_detect(encoderLeft, GPIO.FALLING, callback=handle_encoder_left, bouncetime=200)
    try:
        while True:
            pass
    except KeyboardInterrupt:
        turn_off()
    except Exception as e:
        print(e)
    

if __name__ == '__main__':
    if os.getuid() == 0:
        print('Starting with sudo')
        main()
    else:
        print('No sudo priviliges given')
