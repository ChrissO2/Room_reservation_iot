import rfid_card_event
import oled
import current_room_state
import input_mode
import participant_registration


def main():
    participant_registration.initialize_mqtt_connection()
    current_room_state.connect_to_room_state_broker()
    oled.initialize_oled()
    while True:
        rfid_card_event.interpret_rfid_read(
            [
                input_mode.reserve_room_from_input_mode,
                participant_registration.send_registration_event_to_broker,
            ]
        )
        oled.update_oled()


if __name__ == "__main__":
    main()
