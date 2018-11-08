var Arrow = require('arrow'),
	server = new Arrow();
	
// var apibmqttutils = require('./apibmqttutils').mqttInit();
var apibmqttstreet = require('./apimqttstreet').mqttInit();


// lifecycle examples
server.on('starting', function () {
	server.logger.debug('server is starting!');
});

server.on('started', function () {
	server.logger.debug('server started!');
});

// start the server
server.start();