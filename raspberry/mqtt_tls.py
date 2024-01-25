import ssl
from dotenv import load_dotenv
import os

load_dotenv()
server_cert_path = "./.certs/ISRG_Root_X1.pem"

USERNAME = os.getenv("USERNAME")
PASSWORD = os.getenv("PASSWORD")


def set_tls(client):
    client.tls_set(
        ca_certs=server_cert_path,
        tls_version=ssl.PROTOCOL_TLSv1_2,
    )
    return client


def secure_mqtt_client(client):
    set_tls(client)
    authenticate_client(client)
    return client


def authenticate_client(client):
    client.username_pw_set(USERNAME, password=PASSWORD)
