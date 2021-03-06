import pi_camera
import contract
import lock_control
import json
import signal
from time import sleep


while True:
    try:
        codes = pi_camera.capture_img()
        args = json.loads(codes, encoding='utf8')

        print('check can open door, args: %s' % codes)
        if contract.can_open_door(args):
            print('open door ...')
            lock_control.open_lock()
            sleep(3)
        else:
            print('no premission ...')
    except KeyboardInterrupt:
        print('Good bye')
        exit(0)
    except Exception as ex:
        print('some error ...')
        print(ex)
