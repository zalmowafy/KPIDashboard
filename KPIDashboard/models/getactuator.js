var dbConnection = require('../dbconnection');

var getActFunc = {
    

    /**************This query is creating just for testing flow: GW-KPI api-DB*****************************/
    getActTest: function (callback) {
        return dbConnection.query("SELECT actuator_test_id, actuator_id, actuator_cycle_time FROM kpidb.actuator_test ORDER BY actuator_test_id DESC LIMIT 14",callback);
    },

    getActTestRand: function (callback) {
        return dbConnection.query("SELECT distinct(actuator_test.actuator_id), actuator_cycle_time, actuator_name FROM kpidb.actuator_test, kpidb.lookup_actuator where actuator_test.actuator_id <> 0 and actuator_test.actuator_id = lookup_actuator.actuator_id  order BY RAND() LIMIT 14", callback);
    }
};

module.exports = getActFunc;