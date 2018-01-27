from Crypto import Random
from Crypto.Hash import SHA
from Crypto.PublicKey import RSA
from Crypto.Cipher import PKCS1_v1_5 as Cipher_pkcs1_v1_5
from Crypto.Signature import PKCS1_v1_5 as Signature_pkcs1_v1_5
import base64


def encrypt(msg, pub):
    rsakey = RSA.importKey(pub)
    cipher = Cipher_pkcs1_v1_5.new(rsakey)
    ciphertext = cipher.encrypt(msg.encode('utf8'))
    return base64.b64encode(ciphertext).decode('utf8')


def decrypt(msg, pri):
    rsakey = RSA.importKey(pri)
    cipher = Cipher_pkcs1_v1_5.new(rsakey)
    plaintext = cipher.decrypt(base64.b64decode(msg), Random.new().read)
    return plaintext.decode('utf8')


def sign(msg, pri):
    rsakey = RSA.importKey(pri)
    signer = Signature_pkcs1_v1_5.new(rsakey)
    digest = SHA.new()
    digest.update(msg.encode('utf8'))
    signature = signer.sign(digest)
    return base64.b64encode(signature).decode('utf8')


def verify_signature(msg, signature, pub):
    rsakey = RSA.importKey(pub)
    signer = Signature_pkcs1_v1_5.new(rsakey)
    digest = SHA.new()
    digest.update(msg.encode('utf8'))
    return signer.verify(digest, base64.b64decode(signature))
import crypt

with open('../keys/public_key_s.pem', 'r') as f:
    pub = f.read()

with open('../keys/private_key_s.pem', 'r') as f:
    pri = f.read()


msg = 'hello world'
print('origin msg: %s\n' % msg)

ciphertext = crypt.encrypt(msg, pub)
print('get ciphertext: %s\n' % ciphertext)

plaintext = crypt.decrypt(ciphertext, pri)
print('get plaintext: %s\n' % plaintext)

signature = crypt.sign(msg, pri)
print('get signature: %s\n' % signature)

verify = crypt.verify_signature(plaintext, signature, pub)
print('get verify result: %s\n' % verify)
