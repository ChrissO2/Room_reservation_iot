import paho.mqtt.client as mqtt
import oled
import json
import input_mode

# The broker name or IP address.
broker = "localhost"
# broker = "127.0.0.1"
# broker = "10.0.0.1"

# The MQTT client.


# def process_message(client, userdata, message):
#     # Decode message.
#     message_decoded = (str(message.payload.decode("utf-8"))).split(".")

#     # Print message to console.
#     if message_decoded[0] != "Client connected" and message_decoded[0] != "Client disconnected":
#         print(time.ctime() + ", " +
#               message_decoded[1] + " used the RFID card: " + message_decoded[0])

#         messages.append(message_decoded[1] + ", " + time.ctime())
#     else:
#         print(message_decoded[0] + " : " + message_decoded[1])


def process_update_of_current_state(client, userdata, message):
    # Decode message.
    parameters = json.loads(str(message.payload.decode("utf-8")))
    if input_mode.MODE == "default":
        oled.update_parameters(parameters)

    # Print message to console.
    # if message_decoded[0] != "Client connected" and message_decoded[0] != "Client disconnected":
    #     print(time.ctime() + ", " +
    #           message_decoded[1] + " used the RFID card: " + message_decoded[0])

    #     messages.append(message_decoded[1] + ", " + time.ctime())
    # else:
    #     print(message_decoded[0] + " : " + message_decoded[1])


def connect_to_room_state_broker():
    client = mqtt.Client()
    messages = []
    # Connect to the broker.
    client.connect(broker)
    # Send message about conenction.
    client.on_message = process_update_of_current_state
    # Starts client and subscribe.
    client.loop_start()
    client.subscribe("room_state")


# def disconnect_from_broker():
#     # Disconnet the client.
#     client.loop_stop()
#     client.disconnect()


# def run_receiver():
#     connect_to_broker()
#     while True:
#         pass
#     disconnect_from_broker()


# if __name__ == "__main__":
#     run_receiver()
