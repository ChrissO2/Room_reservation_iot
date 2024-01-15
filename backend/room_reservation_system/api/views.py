from datetime import datetime

from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken
from django.utils.timezone import make_aware

from base.models import Participant, Meeting
from api.service import check_room_availability, validate_room_and_time, validate_participant
from .serializers import UserSerializer, ParticipantSerializer, MeetingSerializer


@api_view(['POST'])
def signup(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response(
            {"token": {'refresh': str(refresh), 'access': str(refresh.access_token)}, "user": serializer.data},
            status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
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
@permission_classes([IsAuthenticated])
def meeting_add(request):
    try:
        organizer = validate_participant(request.user)
        request.data["organizer"] = organizer.id
        serializer = MeetingSerializer(data=request.data)

        if serializer.is_valid():
            room_id, start_time, end_time = validate_room_and_time(request.data['room'],
                                                                   request.data["start_time"],
                                                                   request.data["end_time"])
            if not check_room_availability(room_id, start_time, end_time):
                return Response({'error': 'Room not available at given time'}, status=status.HTTP_409_CONFLICT)
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
    except ValueError as e:
        return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
def meetings(request):
    meetings_list = Meeting.objects.all()
    serializer = MeetingSerializer(meetings_list, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def meeting(request, meeting_id):
    found_meeting = get_object_or_404(Meeting, id=meeting_id)
    serializer = MeetingSerializer(found_meeting)
    return Response(serializer.data)


@api_view(['GET'])
def upcoming_meetings(request):
    now = make_aware(datetime.now())
    meetings_list = Meeting.objects.filter(start_time__gt=now)
    serializer = MeetingSerializer(meetings_list, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def current_meetings(request):
    now = make_aware(datetime.now())
    meetings_list = Meeting.objects.filter(start_time__lte=now, end_time__gte=now)
    serializer = MeetingSerializer(meetings_list, many=True)
    return Response(serializer.data)
@api_view(['GET'])
def finished_meetings(request):
    now = make_aware(datetime.now())
    meetings_list = Meeting.objects.filter(end_time__lt=now)
    serializer = MeetingSerializer(meetings_list, many=True)
    return Response(serializer.data)


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
