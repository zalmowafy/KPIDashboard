var dbConnection = require('../dbconnection');

var insertSysFunc = {


    /**************This query is creating just for testing flow: GW-KPI api-DB*****************************/
    addNewSystem: function (values, callback) {
        //var _val = [values];
        //console.log(_val);
        return dbConnection.query('INSERT INTO kpi_systemdata (DepSysId, CycleId, CycleStartTime, CycleDuration, sDCycleMin, sDCycleMax, sLCycleMin, sLCycleAvg, sLCycleMax, sWaitTime) VALUES (?,?,?,?,?,?,?,?,?,?)',
            [values.dep_sys_id, values.CycleId, values.s_cycle_start, values.s_duration, values.sDCycleMin, values.sDCycleMax, values.sLCycleMin, values.sLCycleAvg, values.sLCycleMax,
                values.sWaitTime], callback);
    },

    getSystem: function (callback) {
        return dbConnection.query("SELECT DepSysId, CycleDuration from mydb.kpi_systemdata order BY RAND() LIMIT 1", callback);
    },

    getLatestSystem: function (callback) {
        return dbConnection.query("SELECT CycleId, CycleDuration, CycleStartTime from mydb.kpi_systemdata where CycleDuration <> 0 and CycleDuration <= '00:00:50.0' order BY KPISystemId desc LIMIT 30", callback);
    },

    getHistSys: function (callback) {
        return dbConnection.query("select sDCycleMax, sDCycleMin, sLCycleMin, sLCycleAvg, sLCycleMax, CycleDuration, CycleId from mydb.kpi_systemdata where CycleDuration <> 0 order by KPISystemId desc limit 50", callback); //where CycleStartTime >= current_date() - 5 AND CycleStartTime < current_date() and CycleDuration <> 0", callback);
    },

    getSysPro: function (callback) {
        return dbConnection.query("select distinct mydb.kpi_processdata.DepProcessId, mydb.kpi_processdata.pCycleStartTime, mydb.kpi_processdata.pCycleDuration, mydb.kpi_processdata.pDCycleMax,mydb.kpi_systemdata.sDCycleMax, mydb.kpi_systemdata.CycleDuration, mydb.kpi_systemdata.CycleId from mydb.kpi_processdata, mydb.kpi_systemdata where mydb.kpi_processdata.CycleId = mydb.kpi_systemdata.CycleId and mydb.kpi_systemdata.CycleDuration <> 0 and mydb.kpi_processdata.pCycleDuration <> 0  order by mydb.kpi_systemdata.KPISystemId desc limit 300", callback);
    },
};

module.exports = insertSysFunc;