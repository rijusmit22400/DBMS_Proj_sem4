import bcrypt
salt = b"$2b$12$anpwDDNbtWbHKzA5eEu7Ee"

def hash_password(password: str) -> str:
    """
    Hash the password.
    """
    return bcrypt.hashpw(password.encode('utf-8'), salt).decode('utf-8')

def validate_password(input_password: str, hashed_password: str) -> bool:
    """
    Validate the password.
    """
    return bcrypt.checkpw(input_password.encode('utf-8'), hashed_password.encode('utf-8'))