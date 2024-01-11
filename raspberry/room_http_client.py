import http.client
import json

BACKEND_IP = ''

connection = http.client.HTTPConnection(BACKEND_IP, 80, timeout=10)

DEFAULT_HEADERS = {'Content-type': 'application/json'}

def is_room_free_at(start_date, end_date):
    
    json_data = json.dumps({'start_date': start_date, 'end_date': end_date})
    connection.request('GET', '/room_availability', json_data, DEFAULT_HEADERS)
    response = connection.getresponse()
    response_data = json.loads(response.read().decode())
    return response_data['is_free']

def reserve_room(start_date, end_date, organizer_id):
    json_data = json.dumps({'start_date': start_date, 'end_date': end_date, 'organizer_id': organizer_id})
    connection.request('POST', '/new_meeting', json_data, DEFAULT_HEADERS)
    response = connection.getresponse()
    response_data = json.loads(response.read().decode())
    return response_data['is_free']