var dbConnection = require('../dbconnection');

var insertProcessFunc = {


    /**************This query is creating just for testing flow: GW-KPI api-DB*****************************/
    addNewProcess: function (values, callback) {
        //var _val = [values];
        //console.log(_val);
        return dbConnection.query('INSERT INTO kpi_processdata (DepSysId, DepProcessId, pCycleStartTime, pCycleDuration, CycleId, pDCycleMin, pDCycleMax, pLCycleMin, pLCycleAvg, pLCycleMax, pWaitTime) VALUES (?,?,?,?,?,?,?,?,?,?,?)',
            [values.dep_sys_id, values.process_id, values.p_cycle_start, values.p_duration, values.CycleId, values.pDCycleMin, values.pDCycleMax, values.pLCycleMin, values.pLCycleAvg, values.pLCycleMax, values.pWaitTime], callback);
    },

    getProcess: function (callback) {
        return dbConnection.query("SELECT DepProcessId, pCycleDuration from mydb.kpi_processdata order BY RAND() LIMIT 1", callback);
    },

    getLatestProcesses: function (callback) {
        return dbConnection.query("select distinct KPIProcessId, (DepProcessId), pCycleStartTime, pCycleDuration, pDCycleMax, pDCycleMin, pLCycleMin, pLCycleAvg, pLCycleMax FROM mydb.kpi_processdata where pCycleDuration <> 0 order by KPIProcessId desc limit 4", callback);
    },

    getLatestProcess: function (callback) {
        return dbConnection.query("select distinct KPIProcessId, pCycleStartTime, pCycleDuration, CycleId FROM mydb.kpi_processdata where pCycleDuration <> 0 and DepProcessId = 666 order by KPIProcessId desc limit 15", callback);
    },

    getProcessByCycleid: function (cycleid, callback) {
        return dbConnection.query("select distinct KPIProcessId, (DepProcessId), pCycleStartTime, pCycleDuration FROM mydb.kpi_processdata where pCycleDuration <> 0 and CycleId = '" + cycleid + "' order by KPIProcessId desc limit 4", callback);
    },

    getHistProcess: function (callback) {
        return dbConnection.query("select DepProcessId, pCycleStartTime, pCycleDuration from mydb.kpi_processdata order by KPIProcessId desc limit 20;", callback);// where pCycleStartTime >= current_date() - 1 AND pCycleStartTime < current_date() and pCycleDuration <> 0;", callback);
    }

};

module.exports = insertProcessFunc;