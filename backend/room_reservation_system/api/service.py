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
        raise ValueError("Room doesn't exist.")

    return room_id, start_time, end_time
