import RPi.GPIO as GPIO
import time

def open_lock():
    try:
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(13, GPIO.OUT)
        GPIO.output(13, GPIO.HIGH)
        time.sleep(1)
    finally:
        GPIO.cleanup()