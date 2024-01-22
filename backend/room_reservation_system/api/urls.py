from django.urls import re_path, path
import api.views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView
)

urlpatterns = [
    re_path('new_meeting_participant_rfid', views.meeting_participant_add_rfid),
    re_path('participant', views.participant),
    path('meetings/<int:meeting_id>', views.meeting),
    re_path('new_meeting_rfid', views.meeting_add_rfid),
    re_path('new_meeting', views.meeting_add),
    re_path('meetings/upcoming/', views.upcoming_meetings),
    re_path('meetings/current/', views.current_meetings),
    re_path('meetings/report', views.meetings_last_30_days_view),
    re_path('rooms', views.rooms),
    re_path('rooms/report/', views.room_report_view),
    re_path('meetings/finished/', views.finished_meetings),
    re_path('meetings', views.meetings),
    re_path('room_availability_rfid', views.room_availability_rfid),
    re_path('room_availability', views.room_availability),
    re_path('signup', views.signup),
    re_path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]

