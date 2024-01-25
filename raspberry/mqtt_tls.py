import ssl

server_cert_path = "./.certs/ISRG_Root_X1.pem"


def set_tls(client):
    client.tls_set(
        ca_certs=server_cert_path,
        tls_version=ssl.PROTOCOL_TLSv1_2,
    )
    return client
