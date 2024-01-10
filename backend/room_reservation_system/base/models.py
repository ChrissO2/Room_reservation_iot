from django.db import models
from django.contrib.auth.models import User


class Participant(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='participant')
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    card_id = models.CharField(max_length=100, unique=True)


class Room(models.Model):
    rfid_reader_id = models.CharField(max_length=100, unique=True)


class Meeting(models.Model):
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    organizer = models.ForeignKey(Participant, on_delete=models.SET_NULL, null=True, related_name='organized_meetings')
    room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True, related_name='meetings')


class MeetingParticipant(models.Model):
    meeting = models.ForeignKey(Meeting, on_delete=models.CASCADE, related_name='participants')
    participant = models.ForeignKey(Participant, on_delete=models.CASCADE, related_name='meetings')
    enter_time = models.DateTimeField()

    class Meta:
        unique_together = [['meeting', 'participant']]
