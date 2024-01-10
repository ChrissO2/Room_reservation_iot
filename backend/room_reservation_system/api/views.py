from rest_framework.response import Response
from rest_framework.decorators import api_view
from base.models import Room
from .serializers import RoomSerializer
from rest_framework import viewsets


# @api_view(['GET'])
# def getRooms(request):
#     rooms = Room.objects.all()
#     serializer = RoomSerializer(rooms, many=True)
#     return Response(serializer.data)
#
#
# @api_view(['GET'])
# def getRoom(request, room_id):
#     room = Room.objects.get(id=room_id)
#     serializer = RoomSerializer(room)
#     return Response(serializer.data)
#

class RoomViewSet(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
