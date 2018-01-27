import pi_carema
import contract
import lock_control
import json


codes = pi_camera.capture_img()
args = json.loads(codes, encoding='utf8')


if contract.can_open_door():
    lock_control.open_lock()
