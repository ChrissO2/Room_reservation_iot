from textwrap import fill
from PIL import Image, ImageDraw, ImageFont
from config import *
import lib.oled.SSD1331 as SSD1331
import board
import adafruit_bme280.advanced as adafruit_bme280
import busio

# def sensors():
#     i2c = busio.I2C(board.SCL, board.SDA)
#     bme280 = adafruit_bme280.Adafruit_BME280_I2C(i2c, 0x76)

#     bme280.sea_level_pressure = 1013.25
#     bme280.standby_period = adafruit_bme280.STANDBY_TC_500
#     bme280.iir_filter = adafruit_bme280.IIR_FILTER_X16
#     bme280.overscan_pressure = adafruit_bme280.OVERSCAN_X16
#     bme280.overscan_humidity = adafruit_bme280.OVERSCAN_X1
#     bme280.overscan_temperature = adafruit_bme280.OVERSCAN_X2
#     return {'TemperatureBME280' : round(bme280.temperature, 2), 
#             'humidity':  round(bme280.humidity,2 ), 
#             'pressure':  round(bme280.pressure, 2)
#     }

"""
Global display parameters
"""
old_parameters = {'is_free': True, 'msg': 0, 'mode': 'default'}
parameters = {'is_free': True, 'msg': 0, 'mode': 'default'}

"""
Paremeters schema:
 {
     'is_free': True | False,
     'msg': 0,
    'mode': 'default' | 'input' | 'info'
}
"""
def is_room_free(parameters):
    return parameters["is_free"]

def has_state_changed(parameters, old_parameters):
    return old_parameters["is_free"] != parameters["is_free"] or old_parameters["mode"] != parameters["mode"] or old_parameters["msg"] != parameters["msg"]


# Select which display to use based on the mode of the display.
def display(disp, parameters, old_parameters):
    if has_state_changed(parameters, old_parameters):
        if parameters["mode"] == 'default':
            handle_default_mode(parameters, disp)
        elif parameters["mode"] == 'input':
            handle_input_mode(parameters, disp)
        elif parameters['mode'] == 'info':
            handle_info_mode(parameters, disp)

"""
Display the default mode.
Display cross or checkmark depending on the room state.
Display the message under the image
"""
def handle_default_mode(parameters, disp):
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    fontLarge = ImageFont.truetype('./lib/oled/Font.ttf', 20)
    fontSmall = ImageFont.truetype('./lib/oled/Font.ttf', 13)

    image = Image.open('./assets/green_checkmark.png') if is_room_free(parameters) else Image.open('./assets/red_cross.png')
    image = image.resize((15, 10))
    image1.paste(image, (0, 0))
    draw.text((17, 0), parameters["msg"], font=fontSmall, fill="RED")

    disp.ShowImage(image1, 0, 0)

"""
Display current set time on display.
"""
def handle_input_mode(paramaters, disp):
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    fontLarge = ImageFont.truetype('./lib/oled/Font.ttf', 20)
    fontSmall = ImageFont.truetype('./lib/oled/Font.ttf', 13)

    draw.text((0, 0), "Ustaw spotkanie: ", font=fontSmall, fill="BLACK")
    draw.text((17, 0), parameters["msg"], font=fontSmall, fill="RED")

    disp.ShowImage(image1, 0, 0)

"""
Display only info message on display.
"""
def handle_info_mode(parameters, disp):
    msg = parameters['msg']

    fontSmall = ImageFont.truetype('./lib/oled/Font.ttf', 13)
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    draw.text((0, 0), msg, font=fontSmall, fill='BLACK')

"""
Global display object
"""
disp = None

def initialize_oled():
    global disp
    disp = SSD1331.SSD1331()
    disp.Init()
    disp.clear()


"""
Update parameters to be displayed on the screen.
"""
def update_parameters(new_parameters):
    global parameters
    global old_parameters
    old_parameters = parameters
    parameters = new_parameters


"""
Refresh the screen with latest parameters set with update_parameters.
"""
def update_oled():
    global old_parameters
    global parameters
    display(disp, parameters, old_parameters)