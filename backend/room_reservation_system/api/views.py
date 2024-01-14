from datetime import datetime

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from base.models import Participant
from api.service import check_room_availability, validate_room_and_time, validate_participant
from .serializers import UserSerializer, ParticipantSerializer, MeetingSerializer


@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    user = get_object_or_404(User, username=request.data['username'])
    if not user.check_password(request.data['password']):
        return Response({"detail": "Not found"}, status=status.HTTP_404_NOT_FOUND)  # same response as above line
    token, created = Token.objects.get_or_create(user=user)
    serializer = UserSerializer(user)
    return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_token(request):
    return Response("passed for {}".format(request.user.email), status=status.HTTP_200_OK)


@api_view(['PUT'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def participant(request):
    try:
        participant_to_update = request.user.participant
    except Participant.DoesNotExist:
        return Response({'detail': 'Participant not found.'}, status=status.HTTP_404_NOT_FOUND)

    serializer = ParticipantSerializer(participant_to_update, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def meetings(request):
    try:
        organizer = validate_participant(request.user)
        serializer = MeetingSerializer(data=request.data)
        serializer.data["organizer"] = organizer.id

        if serializer.is_valid():
            room_id, start_time, end_time = validate_room_and_time(serializer.data['room_id'],
                                                                   serializer.data["start_time"],
                                                                   serializer.data["end_time"])
            if check_room_availability(room_id, start_time, end_time):
                serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def check_room_availability_view(request):
    room_id = request.query_params.get('room_id')
    start_time = request.query_params.get('start_time')
    end_time = request.query_params.get('end_time')

    try:
        room_id, start_time, end_time = validate_room_and_time(room_id, start_time, end_time)
        room_available = check_room_availability(room_id, start_time, end_time)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    return Response({'room_available': room_available}, status=status.HTTP_200_OK)


# class RoomViewSet(viewsets.ModelViewSet):
#     queryset = Room.objects.all()
#     serializer_class = RoomSerializer
#
#     def get_permissions(self):
#         if self.action in ['create', 'update', 'partial_update', 'destroy']:
#             return [permissions.IsAdminUser()]
#         return [permissions.IsAuthenticated()]
#
#
# class MeetingViewSet(viewsets.ModelViewSet):
#     queryset = Meeting.objects.all()
#     serializer_class = MeetingSerializer
#
#     def get_permissions(self):
#         return [permissions.IsAuthenticated()]
#
#
# class MeetingParticipantViewSet(viewsets.ModelViewSet):
#     queryset = MeetingParticipant.objects.all()
#     serializer_class = MeetingParticipantSerializer
#
#
# class ParticipantViewSet(viewsets.ModelViewSet):
#     queryset = Participant.objects.all()
#     serializer_class = ParticipantSerializer
#
#     def get_permissions(self):
#         if self.action in ['destroy']:
#             return [permissions.IsAdminUser()]
#         else:
#             return [permissions.AllowAny()]
