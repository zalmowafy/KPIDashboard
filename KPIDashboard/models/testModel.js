var dbConnection = require('../dbconnection');

var testRandFunc = {


    /**************This query is creating just for testing flow: GW-KPI api-DB*****************************/
   

    getTestProcess: function (callback) {
        return dbConnection.query("SELECT DepProcessId, pCycleStartTime, pCycleDuration from mydb.kpi_processdata order BY RAND() LIMIT 1", callback);
    },

    getTestPusher: function (callback) {
        return dbConnection.query("SELECT CycleId, DepCompId, MotionStartTime, MotionDuration, aCycleTime, MotionStatus, aDCycleMin, aDcycleMax from mydb.kpi_compdata where DepCompId = 22 and KPICompId > 4429 order BY RAND() LIMIT 1", callback);
    }

};

module.exports = testRandFunc;