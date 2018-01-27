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
