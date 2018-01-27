import RPi.GPIO as GPIO
import time

def open_lock():
    try:
        GPIO.setmode(GPIO.BOARD)
        GPIO.setup(11, GPIO.OUT)
        GPIO.output(11, GPIO.HIGH)
        time.sleep(0.5)
    finally:
        GPIO.cleanup()
#open_lock()