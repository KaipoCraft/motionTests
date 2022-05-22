// Make sure to turn on WebSerial API in Chrome
// https://codelabs.developers.google.com/codelabs/web-serial/
// And here's the Arduino code to send a sensor reading the our sketch:
// https://github.com/cacheflowe/haxademic/blob/master/arduino/VL53L1X/VL53L1X.ino

import SerialDevice from "./serial.js";

let serialDevice;
let serialValue = 0;

window.setup = function() {
  createCanvas(400, 400);
}

window.mousePressed = function() {
  if(!!serialDevice) return;
  serialDevice = new SerialDevice(
    115200,
    (data) => serialRead(data),
    (err) => serialError(err)
  );
}

window.serialRead = function(data) {
  let val = data;
  console.log('serial data:', val);
  if (data.length && data.length > 0 && data[0] == 'a') {
    serialValue = parseInt(data.substring(1));
  }
}

window.serialError = function(err) {
  print('Error:', err);
}

window.draw = function() {
  background(0);
  noStroke();
  fill(255);
  rect(0, 0, map(serialValue, 0, 1000, 0, width), height);
  
  fill(0, 255, 0);
  text(`Distance: ${serialValue}mm`, 20, 20);
}

