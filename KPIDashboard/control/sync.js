var getAct = require('../models/getactuator');
var updatedData;
module.exports = function syncData() {
   
   // if (update == true) {
        getAct.getActTest(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                return (JSON.parse(JSON.stringify(rows)));
                //socket.emit('completeData', data);
                // res.json(rows);
            }
        });
   // }
   // return updatedData;

}

//module.exports = sync;