import rfid_card_event
import mqtt_connection

def main():
    mqtt_connection.initialize_mqtt_connection()
    while True:
        rfid_card_event.interpret_rfid_read();