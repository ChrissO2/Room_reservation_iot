from django.contrib import admin
from base.models import Meeting, Room, MeetingParticipant, Participant

# Register your models here.
admin.site.register(Meeting)
admin.site.register(Room)
admin.site.register(MeetingParticipant)
admin.site.register(Participant)