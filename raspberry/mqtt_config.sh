#!/bin/bash

echo "allow_anonymous true" >> /etc/mosquitto/mosquitto.conf
echo "listener 1883 0.0.0.0" >> /etc/mosquitto/mosquitto.conf

sudo systemctl start mosquitto.service

echo "Script finished"
