from picamera import PiCamera
from time import sleep
from PIL import Image
import zbarlight


def capture_img():
    with PiCamera() as camera:
        camera.resolution = (400, 400)
        image = './qrcode.jpg'

        while True:
            sleep(1)
            print('capture image ...')

            camera.capture(image)
            codes = analyse_img(image)

            if codes:
                print('return QR codes: %s' % codes)
                return codes


def analyse_img(img):
    print('analyse QR image: %s...' % img)

    with open(img, 'rb') as image_file:
        image = Image.open(image_file)
        image.load()

    codes = zbarlight.scan_codes('qrcode', image)
    print('QR codes: %s' % codes)

    return codes


