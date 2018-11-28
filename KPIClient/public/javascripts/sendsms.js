var Nexmo = require('nexmo');
//var config = require('..//clientconfig');


function sendSms(msg) {
    const nexmo = new Nexmo({
        apiKey: 'ea2183df',
        apiSecret: '7nOLbqXN2xfKwm1q'
    });

    nexmo.message.sendSms(
        '447468559049', '15105551234', msg,
        (err, responseData) => {
            if (err) {
                console.log(err);
            } else {
                console.dir(responseData);
            }
        }
    );
}
