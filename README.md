Turn your computer on remotely from anywhere using:
- Raspberry Pi 2, Relay
- React Native for iOS App
- Python for Raspberry App

Video demo: https://www.youtube.com/watch?v=x6AVhbW0dEs

* Install dependencies on Raspberry:
> pip3 install python-firebase

* On raspberry, edit your rc.local file for running the command on raspberry startup (not boot to Desktop)

> sudo nano /etc/rc.local

add this command: 

python3 /home/pi/Documents/Turn.py &

remember it need to before line exit(0) in rc.local

* Refenrece to GPIO folder to get more details how to put the GPIO pin work
