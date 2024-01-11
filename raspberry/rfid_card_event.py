import mqtt_connection


global_mifare_reader = MFRC522()
global_activate_time = None
readRfidCards = {}


def interpret_rfid_read(callbacks):
    global global_mifare_reader
    global global_activate_time
    if global_activate_time and datetime.now() - global_activate_time > timedelta(0, 0, 10000):
        blinkLed(False)
        buzz(False)
    (status, TagType) = global_mifare_reader.MFRC522_Request(global_mifare_reader.PICC_REQIDL)
    if status == global_mifare_reader.MI_OK:
        (status, uid) = global_mifare_reader.MFRC522_Anticoll()
        registered_uid = [str(elem) for elem in uid]
        str_uid = ''.join(registered_uid)
        if status == global_mifare_reader.MI_OK and (str_uid not in readRfidCards.keys() or datetime.now() - readRfidCards[str_uid] > timedelta(0, 3)):
            global_activate_time = datetime.now()

            for cb in callbacks:
                cb()

            blinkLed(True)
            buzz(True)
            send_event_to_broker(uid, global_activate_time, registered_uid)


def send_event_to_broker(uid, activate_time, registered_uid):
    num = 0
    for i in range(0, len(uid)):
        num += uid[i] << (i*8)
    logging.info(f"Card read UID: {uid} > {num}")
    readRfidCards[''.join(registered_uid)] = datetime.now()
    mqtt_connection.call_worker(str(num) + '.' + activate_time.strftime("%Y-%m-%d %H:%M:%S"))
    logging.debug(readRfidCards[''.join(registered_uid)])