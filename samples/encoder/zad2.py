from operator import pos
from time import time
from config import *
import w1thermsensor
import board
import busio
import adafruit_bme280.advanced as adafriut_bme280
import neopixel
import os, time

led_temp_bme =[0, 1]
led_temp_ds =[2, 3]
led_humid = [4, 5]
led_pressure = [6, 7]

BOUNDS_HUMID = (40, 50)
BOUNDS_TEMP = (23.5, 24)
BOUNDS_PRESSURE = (1000, 1004)


def ds18b20():
    sensor = w1thermsensor.W1ThermSensor()
    temp = sensor.get_temperature()
    return temp


def bme280():
    i2c = busio.I2C(board.SCL, board.SDA)
    bme280 = adafriut_bme280.Adafruit_BME280_I2C(i2c, 0x76)
    (temp, hum, press) = (bme280.temperature, bme280.humidity, bme280.pressure)
    return (temp, hum, press)


def turn_leds_on(pixels):
    pixels.fill((0, 255, 0))
    pixels.show()


def update_led(position, bound, value, pixels):
    color = (0, 255, 0)
    if value > bound[1]:
        color = (255, 0, 0)
    elif value < bound[0]:
        color = (0, 0, 255)

    for i in position:
        pixels[i] = color
    pixels.show()


def update_leds(temp_ds, temp_bme, hum, press, pixels):
    update_led(led_temp_ds, BOUNDS_TEMP, temp_ds, pixels)
    update_led(led_temp_bme, BOUNDS_TEMP, temp_bme, pixels)
    update_led(led_humid, BOUNDS_HUMID, hum, pixels)
    update_led(led_pressure, BOUNDS_PRESSURE, press, pixels)


def main():
    pixels = neopixel.NeoPixel(board.D18, 8, brightness=0.1, auto_write=False)
    turn_leds_on(pixels)
    while True:
        temp_ds = ds18b20()
        temp_bme, hum, press = bme280()
        print(f"TempDS: {temp_ds:0.1f} "+chr(176)+"C")
        print(f"TempBME: {temp_bme:0.1f} "+chr(176)+"C")
        print(f"Humidity: {hum:0.1f}%")
        print(f"Press: {press:0.2f}hPa")
        update_leds(temp_ds, temp_bme, hum, press, pixels)
        time.sleep(2.0)
        

if __name__ == "__main__":
    if (os.getuid() == 0):
        main()
    else:
        print('No sudo privileges')
