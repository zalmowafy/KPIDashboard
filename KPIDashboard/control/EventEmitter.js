var EventEmitter = require('events').EventEmitter;
var gwDataAlertEvent = new EventEmitter();

module.exports = {
    sendData: function (data) {
        gwDataAlertEvent.emit('gwData', data);
    },
    onDataChange: function (handler) {
        gwDataAlertEvent.on('gwData', handler);
    },
    removeListener: function () {
        gwDataAlertEvent.removeAllListeners('gwData');
    }
};