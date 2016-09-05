var Service, Characteristic;
var rpio = require('rpio');

module.exports = function(homebridge) {
  Service = homebridge.hap.Service;
  Characteristic = homebridge.hap.Characteristic;
  homebridge.registerAccessory("homebridge-pirelays", "Switch", SwitchAccessory);
}

function SwitchAccessory(log, config) {
  this.log = log;
  this.name = config["name"];
  this.bulbName = config["bulb_name"] || this.name; // fallback to "name" if you didn't specify an exact "bulb_name"
  this.binaryState = 0; // bulb state, default is OFF
  this.log("Creating a switched with name '" + this.bulbName + "'...");

  this.pin = config["pin"];
  rpio.open(this.pin, rpio.OUTPUT, rpio.LOW);

  //  this.search();
}

SwitchAccessory.prototype.getPowerOn = function(callback) {
  this.binaryState = rpio.read(this.pin);
  var powerOn = this.binaryState > 0;
  this.log("Power state for the '%s' is %s", this.bulbName, this.binaryState);
  callback(null, powerOn);
}

SwitchAccessory.prototype.setPowerOn = function(powerOn, callback) {
  this.binaryState = powerOn ? 1 : 0; // wemo langauge
  if(this.binaryState){
    rpio.write(this.pin, rpio.HIGH);
  } else {
    rpio.write(this.pin, rpio.LOW);
  }
  this.log("Set power state on the '%s' to %s", this.bulbName, this.binaryState);
  callback(null);
}

SwitchAccessory.prototype.getServices = function() {
    var lightbulbService = new Service.Lightbulb(this.name);

    lightbulbService
      .getCharacteristic(Characteristic.On)
      .on('get', this.getPowerOn.bind(this))
      .on('set', this.setPowerOn.bind(this));

    return [lightbulbService];
}
