import rfid_card_event
import mqtt_connection
import oled
import current_room_state
import input_mode

def main():
    mqtt_connection.initialize_mqtt_connection()
    current_room_state.connect_to_room_state_broker()
    while True:
        rfid_card_event.interpret_rfid_read([current_room_state.reserve_room_from_input_mode])
        oled.update_oled()