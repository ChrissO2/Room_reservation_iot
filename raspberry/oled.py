from PIL import Image, ImageDraw, ImageFont
from config import *
import lib.oled.SSD1331 as SSD1331
import board
import adafruit_bme280.advanced as adafruit_bme280
import busio

def sensors():
    i2c = busio.I2C(board.SCL, board.SDA)
    bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c, 0x76)

    bme280.sea_level_pressure = 1013.25
    bme280.standby_period = adafruit_bme280.STANDBY_TC_500
    bme280.iir_filter = adafruit_bme280.IIR_FILTER_X16
    bme280.overscan_pressure = adafruit_bme280.OVERSCAN_X16
    bme280.overscan_humidity = adafruit_bme280.OVERSCAN_X1
    bme280.overscan_temperature = adafruit_bme280.OVERSCAN_X2
    return {'TemperatureBME280' : round(bme280.temperature, 2), 
            'humidity':  round(bme280.humidity,2 ), 
            'pressure':  round(bme280.pressure, 2)
    }

# def display(disp, parameters, old_parameters):
#     image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
#     draw = ImageDraw.Draw(image1)
#     fontLarge = ImageFont.truetype('./lib/oled/Font.ttf', 20)
#     fontSmall = ImageFont.truetype('./lib/oled/Font.ttf', 13)

#     image_temperature = Image.open('./temperature.png')
#     image_temperature = image_temperature.resize((15, 10))

#     image_humidity = Image.open('./humidity.png')
#     image_humidity = image_humidity.resize((15, 10))

#     image_pressure = Image.open('./pressure.png')
#     image_pressure = image_pressure.resize((15, 10))

#     if old_parameters["TemperatureBME280"] != parameters["TemperatureBME280"]:
#         draw.text((17, 0), f'T: {parameters["TemperatureBME280"]}', font=fontSmall, fill="RED")
#     else:
#         draw.text((17, 0), f'T: {old_parameters["TemperatureBME280"]}', font=fontSmall, fill="RED")
#     image1.paste(image_temperature, (0, 0))
    
#     if old_parameters["humidity"] != parameters["humidity"]:
#        draw.text((17, 25), f'H: {parameters["humidity"]}', font=fontSmall, fill="BLUE")
#     else:
#         draw.text((17, 25), f'H: {old_parameters["humidity"]}', font=fontSmall, fill="BLUE")
#     image1.paste(image_humidity, (0, 25))

#     if old_parameters["pressure"] != parameters["pressure"]:
#        draw.text((17, 50), f'P: {parameters["pressure"]}', font=fontSmall, fill="GREEN")
#     else:
#         draw.text((17, 50), f'P: {old_parameters["pressure"]}', font=fontSmall, fill="GREEN")
#     image1.paste(image_pressure, (0, 50))

#     disp.ShowImage(image1, 0, 0)

def display(disp, parameters, old_parameters):
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    fontLarge = ImageFont.truetype('./lib/oled/Font.ttf', 20)
    fontSmall = ImageFont.truetype('./lib/oled/Font.ttf', 13)

    image = Image.open('./assets/green_checkmark.png') if parameters["is_free"] else Image.open('./assets/red_cross.png')

    image_temperature = Image.open('./temperature.png')
    image_temperature = image_temperature.resize((15, 10))

    image_humidity = Image.open('./humidity.png')
    image_humidity = image_humidity.resize((15, 10))

    image_pressure = Image.open('./pressure.png')
    image_pressure = image_pressure.resize((15, 10))

    if old_parameters["TemperatureBME280"] != parameters["TemperatureBME280"]:
        draw.text((17, 0), f'T: {parameters["TemperatureBME280"]}', font=fontSmall, fill="RED")
    else:
        draw.text((17, 0), f'T: {old_parameters["TemperatureBME280"]}', font=fontSmall, fill="RED")
    image1.paste(image_temperature, (0, 0))
    
    if old_parameters["humidity"] != parameters["humidity"]:
       draw.text((17, 25), f'H: {parameters["humidity"]}', font=fontSmall, fill="BLUE")
    else:
        draw.text((17, 25), f'H: {old_parameters["humidity"]}', font=fontSmall, fill="BLUE")
    image1.paste(image_humidity, (0, 25))

    if old_parameters["pressure"] != parameters["pressure"]:
       draw.text((17, 50), f'P: {parameters["pressure"]}', font=fontSmall, fill="GREEN")
    else:
        draw.text((17, 50), f'P: {old_parameters["pressure"]}', font=fontSmall, fill="GREEN")
    image1.paste(image_pressure, (0, 50))

    disp.ShowImage(image1, 0, 0)
    

# if __name__ == "__main__":
#     print("\nProgram started")
#     disp = SSD1331.SSD1331()

#     disp.Init()

#     disp.clear()

#     old_parameters = {'TemperatureBME280': 0.0,
#                       'humidity': 0.0,
#                       'pressure': 0.0}
#     parameters = {'TemperatureBME280': 0.0,
#                       'humidity': 0.0,
#                       'pressure': 0.0}
#     while(True):
#         old_parameters = parameters
#         parameters = sensors()
#         display(disp, parameters, old_parameters)

# mode is either 'default' or 'input' 

old_parameters = {is_free: True, msg: 0, mode: 'default'}
parameters = {is_free: True, msg: 0, mode: 'default'}

disp = None

def initialize_oled():
    global disp
    disp = SSD1331.SSD1331()
    disp.Init()
    disp.clear()

def update_oled():
    global old_parameters
    global parameters
    old_parameters = parameters
    parameters = sensors()
    display(disp, parameters, old_parameters)