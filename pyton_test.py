import RPi.GPIO as GPIO
GPIO.setmode(GPIO.BCM)

GPIO.setup(2, GPIO.IN, pull_up_down=GPIO.PUD_UP)
GPIO.setup(7, GPIO.IN, pull_up_down=GPIO.PUD_UP)

GPIO.setup(17, GPIO.OUT)
GPIO.setup(22, GPIO.OUT)


def verantavalo(channel):
    time.sleep(0.1)
    if GPIO.input(2) != GPIO.HIGH:
        return
    if(GPIO.input(17) == 0):
        GPIO.output(17,1)
    else:
        GPIO.output(17,0)

def ulkovalo(channel):
    time.sleep(0.1)
    if GPIO.input(7) != GPIO.HIGH:
        return
    if(GPIO.input(22) == 0):
        GPIO.output(22,1)
    else:
        GPIO.output(22,0)

GPIO.add_event_detect(2, GPIO.RISING, callback=verantavalo)

GPIO.add_event_detect(7, GPIO.RISING, callback=ulkovalo)

