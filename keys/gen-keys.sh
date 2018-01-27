#!/bin/bash

openssl genrsa -out private_key_c.pem 2048
openssl rsa -in private_key_c.pem -pubout -out public_key_c.pem

openssl genrsa -out private_key_s.pem 2048
openssl rsa -in private_key_s.pem -pubout -out public_key_s.pem
