from base.models import Room, Meeting, MeetingParticipant, Participant
from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'password', 'first_name', 'last_name']

    def create(self, validated_data):
        # Create the user using the create_user method to handle password hashing
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data.get('email'),
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
        )
        # Create the associated Participant
        Participant.objects.create(
            user=user,
            first_name=user.first_name,
            last_name=user.last_name,
        )
        return user


class ParticipantSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Participant
        fields = ['user', 'first_name', 'last_name', 'card_id']


class RoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = Room
        fields = '__all__'


class MeetingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Meeting
        fields = ['id', 'name', 'start_time', 'end_time', 'organizer', 'room']



class MeetingParticipantSerializer(serializers.ModelSerializer):
    participant = ParticipantSerializer(read_only=True)
    class Meta:
        model = MeetingParticipant
        fields = '__all__'

    def create(self, validated_data):
        meeting_participant = MeetingParticipant.objects.create(**validated_data)
        return meeting_participant

    def update(self, instance, validated_data):
        instance.meeting = validated_data.get('meeting', instance.meeting)
        instance.participant = validated_data.get('participant', instance.participant)
        instance.enter_time = validated_data.get('enter_time', instance.enter_time)
        instance.save()
        return instance
