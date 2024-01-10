from django.urls import path
from . import views

from api.views import RoomViewSet
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'rooms', RoomViewSet, basename='room')
urlpatterns = router.urls

# urlpatterns = [
#     # path('rooms/', views.getRooms),
#     # path('rooms/<room_id>', views.getRoom),
# ]