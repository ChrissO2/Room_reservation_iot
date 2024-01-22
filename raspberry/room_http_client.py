import http.client
import json

BACKEND_IP = "62.171.156.180"

connection = http.client.HTTPConnection(BACKEND_IP, 8000, timeout=10)

DEFAULT_HEADERS = {"Content-type": "application/json"}
DEFAULT_RFID_ID = 1

"""
Httprequest to backend to check if room is free at given time
"""


def is_room_free_at(start_date, end_date):
    json_data = json.dumps(
        {
            "start_time": start_date.isoformat(),
            "end_time": end_date.isoformat(),
            "rfid_reader_id": DEFAULT_RFID_ID,
        }
    )
    connection.request("GET", "/api/room_availability_rfid", json_data, DEFAULT_HEADERS)
    response = connection.getresponse()
    response_data = json.loads(response.read().decode())
    try:
        return response_data["is_free"]
    except KeyError:
        return False
    return response_data["is_free"]


"""
Http request to backend
to reserve room at given
time by an organizer with given id
"""


def reserve_room(start_date, end_date, organizer_card_id):
    registered_uid = [str(elem) for elem in organizer_card_id]
    str_uid = "".join(registered_uid)
    json_data = json.dumps(
        {
            "start_time": start_date.isoformat(),
            "end_time": end_date.isoformat(),
            "rfid_reader_id": DEFAULT_RFID_ID,
            "organizer_card_id": str_uid,
        }
    )
    connection.request("POST", "/api/new_meeting_rfid", json_data, DEFAULT_HEADERS)
    response = connection.getresponse()
    response_data = json.loads(response.read().decode())
