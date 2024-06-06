import jwt

secret_key = b"trinity_online_store"

def generate_token(data):
    payload = data
    token = jwt.encode(payload, secret_key, algorithm='HS256')
    return token

def validate_token(token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        return payload
    except jwt.ExpiredSignatureError:
        return "Token expired. Please log in to get a new token."

def refresh_token(token):
    try:
        payload = jwt.decode(token, secret_key, algorithms=['HS256'])
        new_token = generate_token(payload)
        return new_token
    except jwt.ExpiredSignatureError:
        return "Token expired. Please log in to get a new token."