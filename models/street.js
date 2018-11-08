var Arrow = require('arrow');
var Model = Arrow.createModel('street', {
    "fields": {
        "streetId": {
            "type": "string",
            "description": "Street ID (mac address of IoT street)"
        },
        "isConnected": {
            "type": "boolean",
            "description": "Is the street connected? Set by the server"
        },
        "north": {
            "type": "string",
            "description": "trafic light north"
        },
        "est": {
            "type": "string",
            "description": "trafic light est"
        },
        "ouest": {
            "type": "string",
            "description": "trafic light ouest"
        },
        "sud": {
            "type": "string",
            "description": "trafic light sud"
        },
        "date": {
            "type": "string",
            "description": "trafic light date"
        }
    },
    "connector": "appc.arrowdb",
    "actions": [
        "create",
        "read",
        "update",
        "delete",
        "deleteAll"
    ],
    "description": "IoT Street"
});
module.exports = Model;