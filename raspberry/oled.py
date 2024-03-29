import datetime
from textwrap import fill
from PIL import Image, ImageDraw, ImageFont
from config import *
import lib.oled.SSD1331 as SSD1331
import board
import adafruit_bme280.advanced as adafruit_bme280
import busio
import time

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
started_time = datetime.datetime.now().strftime("%H:%M")
old_parameters = {"is_free": True, "msg": started_time, "mode": "default"}
parameters = {"is_free": True, "msg": started_time, "mode": "default"}
last_update_time = time.time_ns() / 1000000

"""
Paremeters schema:
 {
     'is_free': True | False,
     'msg': 0,
    'mode': 'default' | 'input' | 'info'
}
"""


def should_display_update():
    global last_update_time
    if time.time_ns() / 1000000 - last_update_time > 20:
        last_update_time = time.time_ns() / 1000000
        return True
    return False


def is_room_free(parameters):
    return parameters["is_free"]


def has_state_changed(parameters, old_parameters):
    return (
        old_parameters["is_free"] != parameters["is_free"]
        or old_parameters["mode"] != parameters["mode"]
        or old_parameters["msg"] != parameters["msg"]
    )


# Select which display to use based on the mode of the display.
def display(disp, parameters, old_parameters):
    if should_display_update():
        if parameters["mode"] == "default":
            handle_default_mode(parameters, disp)
        elif parameters["mode"] == "input":
            handle_input_mode(parameters, disp)
        elif parameters["mode"] == "info":
            handle_info_mode(parameters, disp)


"""
Display the default mode.
Display cross or checkmark depending on the room state.
Display the message under the image
"""


def handle_default_mode(parameters, disp):
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    fontLarge = ImageFont.truetype("./lib/oled/Font.ttf", 20)
    fontSmall = ImageFont.truetype("./lib/oled/Font.ttf", 13)
    messages = parameters["msg"].split(" ")
    for id, message in enumerate(messages):
        draw.text((17, id * 13), message, font=fontSmall, fill="RED")
    # draw.text((17, 0), str(parameters["msg"]), font=fontSmall, fill="RED")

    disp.ShowImage(image1, 0, 0)


"""
Display current set time on display.
"""


def handle_input_mode(paramaters, disp):
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    fontLarge = ImageFont.truetype("./lib/oled/Font.ttf", 20)
    fontSmall = ImageFont.truetype("./lib/oled/Font.ttf", 13)

    draw.text((5, 0), "Ustaw", font=fontSmall, fill="BLACK")
    draw.text((5, 13), "spotkanie: ", font=fontSmall, fill="BLACK")
    draw.text((22, 26), str(parameters["msg"]), font=fontLarge, fill="BLACK")

    disp.ShowImage(image1, 0, 0)


"""
Display only info message on display.
"""


def handle_info_mode(parameters, disp):
    msg = parameters["msg"]

    fontSmall = ImageFont.truetype("./lib/oled/Font.ttf", 13)
    image1 = Image.new("RGB", (disp.width, disp.height), "WHITE")
    draw = ImageDraw.Draw(image1)
    draw.text((0, 0), str(msg), font=fontSmall, fill="BLACK")
    disp.ShowImage(image1, 0, 0)


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
