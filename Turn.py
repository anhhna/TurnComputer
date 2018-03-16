import time
from firebase import firebase
import RPi.GPIO as gpio

SECRET = 'nmGnoQr8oWMhSD7MpRMWEqww1H8ZGDabalkjclfe'
EMAIL = 'youremail'
authentication = firebase.FirebaseAuthentication(SECRET, EMAIL)

firebase_url = 'https://yourappname.firebaseio.com/'
fixed_interval = 100
firebase = firebase.FirebaseApplication(firebase_url, authentication)

ledPin = 21
gpio.setmode(gpio.BCM)
gpio.setup(ledPin, gpio.OUT)
gpio.output(ledPin, gpio.HIGH)

while True:
	try:
		# get the value of turn node
		result = firebase.get('/turn', None)
		print(result)
		# if value of turn is on, turn on the computer and set to off
		if result == 'on':
			resultPut = firebase.put('/', 'turn', 'off')
			print(resultPut)
			gpio.output(ledPin, gpio.LOW)
			time.sleep(1)
			gpio.output(ledPin, gpio.HIGH)

		time.sleep(fixed_interval)
	except Exception as e:
		print(str(e))

gpio.cleanup()
