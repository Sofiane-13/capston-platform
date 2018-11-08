var Arrow = require('arrow');
var Model = Arrow.createModel('device', {
    "fields": {
        "deviceId": {
            "type": "string",
            "description": "Device ID (mac address of IoT device)"
        },
        "isConnected": {
            "type": "boolean",
            "description": "Is the device connected? Set by the server"
        },
        "temp": {
            "type": "string",
            "description": "Temperature sensor reading"
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
    "description": "IoT Device"
});
module.exports = Model;