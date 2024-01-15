from base.models import Meeting, Room, Participant
from datetime import datetime


def check_room_availability(room_id, start_time, end_time):
    if not Room.objects.filter(id=room_id).exists():
        raise ValueError("Room doesn't exist.")

    overlapping_meetings = Meeting.objects.filter(
        room_id=room_id,
        start_time__lt=end_time,
        end_time__gt=start_time
    ).exists()

    return not overlapping_meetings


def validate_participant(user):
    try:
        participant = user.participant
        if participant.card_id is None:
            raise ValueError('Participant must have a card_id to schedule a meeting.')
        return participant
    except Participant.DoesNotExist:
        raise ValueError('Participant not found.')


def validate_room_and_time(room_id, start_time, end_time):
    if not room_id or not start_time or not end_time:
        raise ValueError('Missing parameters.')

    start_time = datetime.fromisoformat(start_time)
    end_time = datetime.fromisoformat(end_time)

    if start_time > end_time:
        raise ValueError('Start time must be before end time.')

    if not Room.objects.filter(id=room_id).exists():
        raise ValueError("Room does not exist.")

    return room_id, start_time, end_time


def validate_new_rfid_meeting(start_time, end_time, organizer_card_id, rfid_reader_id):
    # TODO do poprawy (dwa calle do bazy zamiast jednego)
    if not Room.objects.filter(rfid_reader_id=rfid_reader_id).exists():
        raise ValueError('Room does not exist.')
    room = Room.objects.get(rfid_reader_id=rfid_reader_id)

    start_time = datetime.fromisoformat(start_time)
    end_time = datetime.fromisoformat(end_time)

    if start_time > end_time:
        raise ValueError('Start time must be before end time.')

    # TODO do poprawy (dwa calle do bazy zamiast jednego)
    if not Participant.objects.filter(card_id=organizer_card_id).exists():
        raise ValueError('Participant does not exist.')
    organizer = Participant.objects.get(card_id=organizer_card_id)

    if not check_room_availability(room.id, start_time, end_time):
        raise ValueError('Room not available.')
    return start_time, end_time, organizer, room
