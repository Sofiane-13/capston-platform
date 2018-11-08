// const express = require('express');
// const app = express();
// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', '*');

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });



var Arrow = require('arrow'),
	server = new Arrow();
	
	// server.Router.extend
	// var TestRoute = new Arrow.Router({
	// 	name: 'ALL',
	// 	path: '/',
	// 	method: 'GET',
	// 	description: 'this is an example web route',
	// 	action: function (req, res, next) {
	// 		res.setHeader('Access-Control-Allow-Origin', '*');
	// 		res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
	// 		res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type'); // If needed
	// 		res.setHeader('Access-Control-Allow-Credentials', true); // If needed
		
	// 		res.send('cors problem fixed:)');
	// 		next();
	// 	}

	// },);
	

// var apibmqttutils = require('./apibmqttutils').mqttInit();


var apibmqttstreet = require('./apimqttstreet').mqttInit();


// lifecycle examples
server.on('starting', function () {
	server.logger.debug('server is starting!');
});

server.app.all('/api/*', function (req, res, next) {
	req.server.logger.info('Intercepted the request!');
			 res.setHeader('Access-Control-Allow-Origin', '*');
			 //res.setHeader('Access-Control-Allow-Headers', 'Authorization');
	
			res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE'); // If needed
			res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization'); // If needed
			res.setHeader('Access-Control-Allow-Credentials', true); // If needed
		
			// res.send('cors problem fixed:)');
	next();
});
server.on('started', function () {
	server.logger.debug('server started!');
});



// start the server
server.start();