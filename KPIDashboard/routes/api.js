'use strict';
var express = require('express');
var router = express.Router();
var app = require('../server');
var addAct = require('../models/insertactuator');
var newAddAct = require('../models/NewDBActuator');
var newAddProcess = require('../models/addNewProcess');
var newAddSys = require('../models/addSystem');
var getAct = require('../models/getactuator');
var dataType = require('../control/ByteArrayParser');
var notification = require('../control/NotificationHandler');
var eventEmitter = require('../control/EventEmitter');
var actSearch = require('../control/actsearch');
//var cache = require('../control/cache');
var actDataObj = [{ "act_id": 12, "act_baseline": 5, "act_name": "Cnvyr" },
{ "act_id": 13, "act_baseline": 1, "act_name": "prtChkr" },
{ "act_id": 14, "act_baseline": 2, "act_name": "Drlr" },
{ "act_id": 16, "act_baseline": 2, "act_name": "Clmp" },
{ "act_id": 18, "act_baseline": 2, "act_name": "Rot" },
{ "act_id": 19, "act_baseline": 2, "act_name": "zAxs" },
{ "act_id": 20, "act_baseline": 1, "act_name": "Grpr" },
{ "act_id": 21, "act_baseline": 5, "act_name": "yAxs" },
{ "act_id": 22, "act_baseline": 3, "act_name": "Pshr" },
{ "act_id": 23, "act_baseline": 5, "act_name": "SwvlA" },
{ "act_id": 24, "act_baseline": 3, "act_name": "SwvlG" },
{ "act_id": 25, "act_baseline": 0.5, "act_name": "Sprtr" },
{ "act_id": 27, "act_baseline": 2, "act_name": "Sldr" },
{ "act_id": 29, "act_baseline": 0.5, "act_name": "Unlodr" }];

class DataStructureElement {
    constructor(fieldName, type) {
        this.fieldName = fieldName;
        this.type = type;
    }
}

var aDataStructure = [
    {
        fieldName: 'tag_type', type: dataType.CHAR
    },
    new DataStructureElement('some_ignored_value', type: dataType.BYTE),
    {
        fieldName: 'dep_sys_id', type: dataType.INTEGER
    },
    {
        fieldName: 'process_id', type: dataType.INTEGER
    },
    {
        fieldName: 'DepCompId', type: dataType.INTEGER
    },
    {
        fieldName: 'CycleId', type: dataType.INTEGER
    },
    {
        fieldName: 'MotionStatus', type: dataType.INTEGER
    },
    {
        fieldName: 'actuator_start', type: dataType.DATETIME
    },
    {
        fieldName: 'MotionDuration', type: dataType.TIME
    },
    {
        fieldName: 'aCycleTime', type: dataType.TIME
    },
    {
        fieldName: 'aDCycleMin', type: dataType.TIME
    },
    {
        fieldName: 'aDCycleMax', type: dataType.TIME
    },
    {
        fieldName: 'aLCycleMin', type: dataType.TIME
    },
    {
        fieldName: 'aLCycleAvg', type: dataType.TIME
    },
    {
        fieldName: 'aLCycleMax', type: dataType.TIME
    },
    {
        fieldName: 'aWaitTime', type: dataType.TIME
    }
];

var pDataStructure = [
    new DataStructureElement('tag_type', dataType.CHAR),
    new DataStructureElement('some_ignored_value', dataType.BYTE),
    new DataStructureElement('DepSysId', dataType.INTEGER),
    new DataStructureElement('DepProcessId', dataType.INTEGER),
    new DataStructureElement('CycleId', dataType.INTEGER),
    new DataStructureElement('pCycleStartTime', dataType.DATETIME),
    new DataStructureElement('pCycleDuration', dataType.TIME),
    new DataStructureElement('pDCycleMin', dataType.TIME),
    new DataStructureElement('pDCycleMax', dataType.TIME),
    new DataStructureElement('pLCycleMin', dataType.TIME),
    new DataStructureElement('pLCycleAvg', dataType.TIME),
    new DataStructureElement('pLCycleMax', dataType.TIME),
    new DataStructureElement('pWaitTime', dataType.TIME)
];

var sDataStructure = [
    new DataStructureElement('tag_type', dataType.CHAR),
    new DataStructureElement('some_ignored_value', dataType.BYTE),
    new DataStructureElement('DepSysId', dataType.INTEGER),
    new DataStructureElement('CycleId', dataType.INTEGER),
    new DataStructureElement('CycleStartTime', dataType.DATETIME),
    new DataStructureElement('CycleDuration', dataType.TIME),
    new DataStructureElement('sDCycleMin', dataType.TIME),
    new DataStructureElement('sDCycleMax', dataType.TIME),
    new DataStructureElement('sLCycleMin', dataType.TIME),
    new DataStructureElement('sLCycleAvg', dataType.TIME),
    new DataStructureElement('sLCycleMax', dataType.TIME),
    new DataStructureElement('sWaitTime', dataType.TIME)
];

var aData = [];
var actDataArray = [];
var dataObj = {};
//var cacheObj = [];
const noOfAct = 14;
var tagStruct = [];
var tagsEnum = Object.freeze({ "comp": 65, "process": 80, "sys": 70 });
var index = 0;
//var _actindex = 0;
var update = false;
var _cycleId;
//var _count = 0;
/* GET home page. */
router.get('/', function (req, res) {
    res.render('index', { title: 'KPI API' });
});


/* Gateway api access sending data to KPI Server */
router.get('/gw-access/addAct', function (req, res, next) {
    console.log("HERE WE GO!");
    // res.send(JSON.stringify(req.headers));
});

/******Receive Data (SystemTag, ProcessTag, ActuatorTag) From GW******/
router.post('/gw-access/addAct', function (req, res, next) {
    //res.send("API IS CALLED!!!!");
    aData = JSON.parse(req.body.Message);

    console.log(aData, "Length is" + aData.length);

    //aData = [65, 0, 4, 210, 0, 22, 0, 22, 24, 5, 48, 20, 84, 80, 16, 116, 0, 0, 0, 0, 0, 0, 0, 0];
    // aData = [80, 0, 0, 0, 3, 19, 78, 67, 24, 6, 1, 23, 2, 33, 88, 134, 0, 0, 16, 46];
    // aData = [80, 0, 4, 210, 2, 154, 0, 3, 24, 8, 8, 17, 23, 16, 22, 20, 0, 0, 20, 180, 0, 0, 15, 160, 0, 0, 31, 64, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 9, 239, 87];
    var tagType = aData[0];
    switch (tagType) {
        case 65:
            tagStruct = aDataStructure;
            break;
        case 80:
            tagStruct = pDataStructure;
            break;
        case 83:
            tagStruct = sDataStructure;
            break;
    }
    console.log("tage type is " + tagStruct);

    var valuesArray = [];
    var valuesAndTypesObject = {};
    for (var i = 0; i < tagStruct.length; i++) {
        const element = tagStruct[i];
        var aType = element.type;
        //console.log("DataStruct is  " + aType);
        var aTwoByteCount = Math.ceil(dataType.getLength(aType));
        //console.log("Byte Count " + aTwoByteCount);
        var aTypeData = aData.slice(index, index + aTwoByteCount);
        //console.log("aTyepData is  " + aTypeData);
        index += aTwoByteCount;
        //console.log("index is " + index);
        var aValue = dataType.getFunction(aType)(aTypeData);
        //if i == 1, don't put anything in the object because we ignore this value
        if (i == 1) {
            continue;
        }
        dataObj[element.fieldName] = aValue;
        //console.log("final value is " + aValue);
    }

    index = 0;
    /*****************************Switch case here to swtich on actuator / process / system************************************************/

    if (tagType == 65) {
        console.log("act object is " + JSON.stringify(dataObj));
        //res.send("Actuator Received!");
        newAddAct.addNewAct(dataObj, function (err, count) {

            console.log("Inside Actuator DB Call ");
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log("Actuator Inserted!!");
                res.json({ success: "Inserted Successfully", status: 200 });
            }
        });

    }
    else if (tagType == 80) {
        console.log("act object is " + JSON.stringify(dataObj));

        newAddProcess.addNewProcess(dataObj, function (err, count) {
            console.log("Process DB Call!!");
            //console.log("Notification data is " + JSON.stringify(notified));
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log("PROCESS INSERTED!!");
                res.json({ success: "Inserted Successfully", status: 200 });
            }
        });
        // res.send("Process Received!");

    }

    else {   //if (valuesArray[0] == tagsEnum.sys) {
        console.log("act object is " + JSON.stringify(dataObj));

        //  res.send("System Received!");
        _cycleId = dataObj.CycleId;
        newAddSys.addNewSystem(dataObj, function (err, count) {
            console.log("System DB Call!!");
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                console.log("INSERTED SYSTEM!!");
                res.json({ success: "Inserted Successfully", status: 200 });
            }
        });

    }

    update = true;
    var notified = notification(update, dataObj);
    console.log(notified.needUpdate);
    if (notified.needUpdate == true) {
        //   var actResultObj = actSearch(dataObj.DepCompId, actDataObj);
        //   console.log(actResultObj);
        //  dataObj["actuator_name"] = actResultObj.act_name;
        //  dataObj["actuator_baseline"] = actResultObj.act_baseline;
        console.log("HI! IT's event emitter " + JSON.stringify(dataObj));
        eventEmitter.sendData([dataObj]);
        //evt.emit('gwdata', notified.newdata);
    }
    // cacheObj.push(actObj);
    //var tempArray = [actObj.actuator_id, actObj.actuator_start, actObj.actuator_cycle_time, actObj.actuator_no];
    //actDataArray.push('(' + tempArray + ')');
    //actDataArray.push(tempArray);

    // }


    // console.log("concatenated array " + actDataArray);
    //console.log(_count);

    // var sqlarray = [Object.keys(actDataArray[0]).values, Object.keys(actDataArray[1]).values, Object.keys(actDataArray[2]).values, Object.keys(actDataArray[3]).values];
    //var actLogArray = [valuesArray[1], valuesArray[2], valuesArray[3]];
    //console.log(actLogArray);
    /*****Check what to return after insertion****************/
    //1. after checking make sure the db part is working with parser by adding the array instead of req.body
    //2. make sure of the gw part
    /*addAct.addNewActData(actDataArray, function (err, count) {
          if (err) {
              res.json(err);
          }
          else {
              addAct.addNewActTimeLog(actLogArray, function (err, count) {
                  console.log(actLogArray);
                  if (err) {
                      res.json(err);
                  }
                  else {
                      res.json({ success: "Inserted Successfully", status: 200 });
                  }
              });
          }
      });*/

    /*********************This part for the sake of testing flow GW-kpi api-db*************/
    /*********************NOTE: We should send an object not array***********/

    /* addAct.addNewActTest(sqlarray, function (err, count) {
         console.log("INSERT  " + actDataArray);
         update = true;
         console.log("Update flag values is " + update);
        // var notified = notification(update, actDataArray);
         if (err) {
            // 
             console.log(err);
             res.json(err);
         }
         else {
             res.json({ success: "Inserted Successfully", status: 200 });
         }
     });
     
     update = false;*/

    /* addAct.addNewActTest(actDataArray, function (err, count) {
         //actDataArray.toString();
         console.log("INSERT  " + actDataArray);
         update = true;
         //console.log("Update flag values is " + update);
         var notified = notification(update, cacheObj);
         console.log(notified);
         if (err) {
             // 
             console.log(err);
             res.json(err);
         }
         else {
              _count += 1;
              console.log(_count);
             //if (_count == noOfAct) {
              console.log("Hello!!");
             res.json({ success: "Inserted Successfully", status: 200 });
             //}
 
         }
     });*/

});



/*router.get('/client-access/getAct', function (req, res, next) {
    getAct.getActTest(req.params.lastUpdate, function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            res.json(rows);
        }
    });
}
);*/
function getUpdate(param) {
    return param;
}
//var sync = require('../control/sync')(update);
module.exports = router;