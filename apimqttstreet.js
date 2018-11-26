var Arrow = require('arrow');
var isJSON = require('is-json');

var client;
var map = {};

module.exports.mqttInit = function() {
	var mqtt = require('mqtt');
	var mqtturl = 'mqtt://senfdtah:QFMngZSY4SL1@m15.cloudmqtt.com:18724';
	client = mqtt.connect(mqtturl);
	
	client.on('connect', function () {
		console.log('app.js - client connected');
		client.subscribe('street/#');
	});
	
	client.on('message', function (topic, message) {
		console.log('app.js - message received');
		handleMessage(topic, message);
	});
};

var handleMessage = function(topic, message) {
	//console.log("apibmqttstreet.js - processMessage() - topic = "+topic+" message = "+message);
    
    switch(topic) {
    	// case 'street/server':
    	// 	processMessage(message);
		// 	break;
		case 'street/streetId':
			processMessageStreetId(message);
			break;
		case 'street/north':
    		processMessageNorth(message);
    		break;
		case 'street/sud':
    		processMessageSud(message);
			break;
		case 'street/est':
    		processMessageEst(message);
			break;
		case 'street/ouest':
    		processMessageOuest(message);
    		break;
    	// case 'myhome/server/will':
    	// 	processLWTMessage(message);
    	// 	break;
    	
    	default: unhandledTopic(topic, message);
    }
};

var unhandledTopic = function(topic, message) {
	console.log('apibmqttstreet.js - unhandledTopic() - Unhandled Topic: '+topic);
};

// var getStreet = function(streetId, callback) {
// 	console.log("apibmqttstreet.js - getStreet() - streetId = "+streetId)
	
//     var model = Arrow.getModel("street")

//     model.query({streetId: streetId}, function(err, data){
//   		if(err) {
//   			console.log('apibmqttstreet.js - getStreet() - error accessing iot street database, err = '+err)
//   			if(callback) {callback(null)};
//   		} else {
//   			console.log('apibmqttstreet.js - getstreet() - data.length = '+data.length)
//   			console.log('apibmqttstreet.js - getstreet() - data = '+JSON.stringify(data))
//   			if(callback) {callback(data)};
//   		}
//   	})
// }


var processMessageStreetId = function(message) {
	console.log('Je suis dans ISSTRING processMessageStreetId');
	console.log('Le message dans ISSTRING :', JSON.parse(message));
	
		message = JSON.parse(message);
		map.streetId = message.streetId;
	
};

var processMessageNorth = function(message) {
	console.log('Je suis dans processMessageNorth');
	console.log('Le message dans north :', JSON.parse(message));
	
	console.log('Je suis dans ISSTRING processMessageEst');

		message = JSON.parse(message);
		map.north = message.north;
	
};

var processMessageSud = function(message) {
	console.log('Je suis dans processMessageSud');
	
		message = JSON.parse(message);
		map.sud = message.sud;
	
};

var processMessageEst = function(message) {
	console.log('Je suis dans processMessageEst');

	
	console.log('Je suis dans ISSTRING processMessageEst');

		message = JSON.parse(message);
		map.est = message.est;
	
};

var processMessageOuest = function(message) {
	console.log('Je suis dans processMessageOuest');
	
	console.log('Je suis dans ISSTRING processMessageOuest');

		message = JSON.parse(message);
		map.ouest = message.ouest;
		var d = new Date();
		map.date = d.toString();


		var model = Arrow.getModel("street");
		var streetObject = {
			streetId : map.streetId,
			north : map.north,
			est : map.est,
			ouest : map.ouest,
			sud : map.sud,
			date : map.date
		};
		console.log('streetObjet : ', streetObject);
		model.create(streetObject,  function(err, instance){
			if(err) {
				console.log("Error creating new street",err);
			} else {
				instance.set(streetObject);
				// createVacation(instance.id, req.body.count);
			}
		});
	
};
// var processLWTMessage = function(message){
// 	console.log("apibmqttstreet.js - processLWTMessage() - message = "+message);
	
// 	getStreet(message.toString(), function(data){
// 		if(data) {
// 			if(data.length === 1) {
// 				data[0].isConnected = false;
// 				data[0].update();
// 			} else {
// 				console.log('apibmqttstreet.js - processLWTMessage() - error with iot street, exactly 1 street not found');
// 			}
// 		} else {
// 			console.log('apibmqttstreet.js - processLWTMessage() - error getting iot street');
// 		}
// 	});
// };


// ajouter un nouvelle valeur
// var processMessage = function(message) {

// 	// Test if string is Json 
// 	if(isJSON(message)){

//     message = JSON.parse(message);
//     console.log("apibmqttstreet.js - getStreet() - streetId = "+message.streetId);
	
//     var model = Arrow.getModel("street");
//     var streetObject = {
//         streetId : message.streetId,
//         north : message.north,
//         est : message.est,
//         ouest : message.ouest,
//         sud : message.sud,
//         date : message.date
//     };
// 	model.create(streetObject,  function(err, instance){
//         if(err) {
//             console.log("Error creating new street")
//         } else {
//             instance.set(streetObject);
//             // createVacation(instance.id, req.body.count);
//         }
//     });
// 	}

// };