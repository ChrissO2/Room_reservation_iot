#!/bin/bash

sudo systemctl start mosquitto.service

echo "allow_anonymous true" >> /etc/mosquitto/mosquitto.conf
echo "listener 1883 0.0.0.0" >> /etc/mosquitto/mosquitto.conf

sudo systemctl restart mosquitto.service

echo "Script finished"
