import serial
import time
from serial import Serial
ser = serial.Serial(
   port='COM7', # Replace with the name of your serial port
   baudrate=9600,
   parity=serial.PARITY_NONE,
   stopbits=serial.STOPBITS_ONE,
   bytesize=serial.EIGHTBITS
)


hour = time.strftime("%H") # Get the current hour in 24-hour format
l = int(hour)
c = l.to_bytes(1, 'big')
ser.write(c) # Send the hour as a sequence of bytes

minute = time.strftime("%M") # Get the current hour in 24-hour format
l = int(minute)
c = l.to_bytes(1, 'big')
ser.write(c) # Send the hour as a sequence of bytes

sec = time.strftime("%S") # Get the current hour in 24-hour format
l = int(sec)
c = l.to_bytes(1, 'big')
ser.write(c) # Send the hour as a sequence of bytes
