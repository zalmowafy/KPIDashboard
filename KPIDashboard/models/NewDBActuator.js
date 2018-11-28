var dbConnection = require('../dbconnection');

var insertActFunc = {
    addNewActData: function (values, callback) {
        return dbConnection.query("INSERT INTO actuatordata (ActuatorId, ActuatorMax, ActuatorMin) VALUES (?,?,?)", [values.ActuatorId, values.ActuatorMax, values.ActuatorMin], callback);
    },

    addNewActTimeLog: function (values, callback) {
        return dbConnection.query("INSERT INTO actuatortimelog (FK_ActuatorId, ActuatorStart, ActuatorTime) VALUES (?,?,?)", [values.FK_ActuatorId, values.ActuatorStart, values.ActuatorTime], callback);
    },

    /**************This query is creating just for testing flow: GW-KPI api-DB*****************************/
    addNewAct: function (values, callback) {
        //var _val = [values];
        //console.log(_val);
        return dbConnection.query('INSERT INTO kpi_compdata (DepSysId, DepProcessId, DepCompId, MotionStartTime, MotionDuration, aCycleTime, CycleId, MotionStatus, aDCycleMin, aDCycleMax, aLCycleMin, aLCycleAvg, aLCycleMax, aWaitTime) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
            [values.dep_sys_id, values.process_id, values.DepCompId, values.actuator_start, values.MotionDuration, values.aCycleTime, values.CycleId, values.MotionStatus, values.aDCycleMin, values.aDCycleMax, values.aLCycleMin, values.aLCycleAvg, values.aLCycleMax, values.aWaitTime], callback);
    },

    getProcessComp: function (callback) {
        return dbConnection.query('select distinct KPICompId, aDCycleMin, aDCycleMax, aLCycleMin, aLCycleAvg, aLCycleMax, (DepCompId), aCycleTime FROM mydb.kpi_compdata where aCycleTime <> 0  and DepProcessId = 666 order by KPICompId desc limit 3', callback);
    },

    getLatestPshr: function (callback) {
        return dbConnection.query('select DepCompId, aCycleTime, MotionStatus, MotionDuration, CycleId from mydb.kpi_compdata where DepCompId = 22 order BY KPICompId desc LIMIT 30', callback);
    },

    getLatestSwvlA: function (callback) {
        return dbConnection.query('select DepCompId, aCycleTime, MotionStatus, MotionDuration, CycleId from mydb.kpi_compdata where DepCompId = 23 order BY KPICompId desc LIMIT 30', callback);
    },

    getLatestSwvlG: function (callback) {
        return dbConnection.query('select DepCompId, aCycleTime, MotionStatus, MotionDuration, CycleId from mydb.kpi_compdata where DepCompId = 24 order BY KPICompId desc LIMIT 30', callback);
    },

    getNewAct: function (callback) {
        return dbConnection.query("SELECT DepCompId, aCycleTime, MotionDuration, actuator_name, actuator_baseline from mydb.lookup_actuator, mydb.kpi_compdata where kpi_compdata.DepCompId = lookup_actuator.actuator_id LIMIT 1", callback);
    },

    getNewActTest: function (callback) {
        return dbConnection.query("SELECT DepCompId, aCycleTime, actuator_name, actuator_baseline from mydb.lookup_actuator, mydb.kpi_compdata where kpi_compdata.DepCompId = lookup_actuator.actuator_id order BY RAND() LIMIT 2", callback);
    },

    getActCycleTest: function (callback) {
        return dbConnection.query("SELECT DepCompId, aCycleTime from mydb.kpi_compdata where kpi_compdata.DepCompId = 22 order BY RAND() LIMIT 1", callback);
    }

};

module.exports = insertActFunc;