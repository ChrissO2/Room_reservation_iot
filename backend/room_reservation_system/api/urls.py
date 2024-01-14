from django.urls import re_path
import api.views as views
# from rest_framework.routers import DefaultRouter


urlpatterns = [
    re_path('test-token', views.test_token),
    re_path('login', views.login),
    re_path('signup', views.signup),
    re_path('participant', views.participant),
    re_path('meetings', views.meetings),
    re_path('check-room-availability', views.check_room_availability_view),
]

# router = DefaultRouter()
# router.register(r'rooms', RoomViewSet, basename='room')
# router.register(r'meetings', MeetingViewSet, basename='meeting')
# router.register(r'meetingParticipants', MeetingParticipantViewSet, basename='meetingParticipant')
# router.register(r'participants', ParticipantViewSet, basename='participant')
#
# urlpatterns += router.urls
