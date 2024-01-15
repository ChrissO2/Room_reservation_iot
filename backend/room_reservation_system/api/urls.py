from django.urls import re_path, path
import api.views as views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView, TokenVerifyView
)


urlpatterns = [
    re_path('participant', views.participant),
    path('meetings/<int:meeting_id>', views.meeting),
    re_path('meetings-add', views.meeting_add),
    re_path('meetings/upcoming', views.upcoming_meetings),
    re_path('meetings/current', views.current_meetings),
    re_path('meetings/finished', views.finished_meetings),
    re_path('meetings', views.meetings),
    re_path('check-room-availability', views.check_room_availability_view),
    re_path('signup', views.signup),
    re_path('token', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    re_path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    re_path('token/verify/', TokenVerifyView.as_view(), name='token_verify'),
]