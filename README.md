# homebridge-pirelays

Controls relays (or whatever is hooked up to GPIO pins) with a Raspberry Pi using HomeKit. "Hey Siri, turn off the lights in the window".

# Hardware

The hardware is quite simple.

1. Raspberry Pi 3
2. 4-relay module hooked up to 4 GPIO pins. 
3. 4 cut off extension cords, hooked up to the relays

The raspi can then control the state of the things hooked up the extension cords. 

# Installation

1. Install homebridge using: `sudo npm install --unsafe-perm -g homebridge`
2. Install this plugin using: `git clone https://github.com/dakl/homebridge-pirelays.git && cd homebridge-pirelays && sudo npm install ``
3. Update your configuration file. See `config.json` in this repository for a sample.

# Test during development

~~~bash
cp config.json ~/.homebridge/ && sudo homebridge -D -P . -U /home/pi/.homebridge/
~~~

# Add to `rc.local` to start on boot

Add the following line before `exit 0` in `/etc/rc.local` to make homebridge with the pirelays plugin on boot:

~~~bash
sudo homebridge -P /home/pi/homebridge-pirelays/ -U /home/pi/.homebridge/ &
~~~
