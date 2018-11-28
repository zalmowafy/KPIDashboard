var dbConnection = require('../dbconnection');

var insertActFunc = {
    addNewActData: function (values, callback) {
        return dbConnection.query("INSERT INTO actuatordata (ActuatorId, ActuatorMax, ActuatorMin) VALUES (?,?,?)", [values.ActuatorId, values.ActuatorMax, values.ActuatorMin], callback);
    },

    addNewActTimeLog: function (values, callback) {
        return dbConnection.query("INSERT INTO actuatortimelog (FK_ActuatorId, ActuatorStart, ActuatorTime) VALUES (?,?,?)", [values.FK_ActuatorId, values.ActuatorStart, values.ActuatorTime], callback);
    },

    /**************This query is creating just for testing flow: GW-KPI api-DB*****************************/
    addNewActTest: function (values, callback) {
        //var _val = [values];
        //console.log(_val);
        return dbConnection.query('INSERT INTO actuator_test (actuator_id, actuator_start, actuator_cycle_time, actuator_no) VALUES ?',
            [values], callback);
    }

};

module.exports = insertActFunc;