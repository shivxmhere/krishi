from cryptography.fernet import Fernet
import base64
import os

class EncryptionService:
    def __init__(self):
        key = os.getenv("ENCRYPTION_KEY")
        if not key:
            # Generate a key if not provided (not recommended for production persistence)
            key = Fernet.generate_key().decode()
        self.cipher = Fernet(key.encode())
    
    def encrypt(self, data: str) -> str:
        return self.cipher.encrypt(data.encode()).decode()
    
    def decrypt(self, token: str) -> str:
        return self.cipher.decrypt(token.encode()).decode()

encryption_service = EncryptionService()
