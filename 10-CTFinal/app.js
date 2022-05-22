var SerialPort = require("serialport");

const parsers = SerialPort.parsers;
const parser = new parsers.ReadLine({
    delineter: '\r\n'
});

var port = new SerialPort('COM3',{
    baudRate: 9600,
    dataBits: 8,
    parity: 'none',
    stopBits: 1,
    flowControls: false
});

port.pipe(parser);

parser.on('data', function(data) {
    console.log(data);
});