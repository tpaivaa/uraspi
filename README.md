# uraspi
Ullakko raspi Soittilan yläkerrassa

RaspberryBi nodejs server to control HVAC on Soittila.
First raspi cannot serve upstairs so need second unit over there.

There will be :
UbuntuServer
nodejs server 
OWFS and 1-wire sensors
One or more 5V relay

nodejs server will be responsible for communication with downstairs raspi.
TODO :
  Find and Build suitable KISS message bus between servers
  Build service for controlling RPi i/o with node
  Document i/o usage
  
  
