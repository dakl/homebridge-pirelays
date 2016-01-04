# homebridge-fakebulb

Simulates a (fake) light bulb device on HomeBridge Platform

# Installation

1. Install homebridge using: npm install -g homebridge
2. Install this plugin using: npm install -g homebridge-fakebulb
3. Update your configuration file. See sample-config.json in this repository for a sample. 

# Configuration

Configuration sample:

 ```
"accessories": [
        {
            "accessory":      "FakeBulb",
            "name":           "Test lamp",
            "bulb_name":      "Lamp1"
        }
]

```
