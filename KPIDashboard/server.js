'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var getAct = require('./models/getactuator');
var cache = require('./control/cache');
var newAddAct = require('./models/NewDBActuator');
var testModel = require('./models/testModel');
var _process = require('./models/addNewProcess');
var _system = require('./models/addSystem');
const Nexmo = require('nexmo');
var config = require('./config');
var readJson = require('./control/ReadJson');
var app = express();

var io = require('socket.io').listen(8080);
var client = 0;
var eventEmitter = require('./control/EventEmitter');
var latestID;
var flag = false;

//view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/kpiapi', api);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


const nexmo = new Nexmo({
    apiKey: 'ea2183df',
    apiSecret: '7nOLbqXN2xfKwm1q'
});

function checkThreshold(num, max, id) {
    var arrTime = (num.split(':'));
    console.log(arrTime);
    var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
    arrTime = (max.split(':'));
    var maxDuration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
    if (duration >= maxDuration && (id == 22 || id == 23 || id == 24)) {
        console.log("Attention PLEASE!!!!", duration, maxDuration, id);
        
        nexmo.message.sendSms(
            
            '447468559049', '447926027020', 'ATTENTION! Pusher cycle time is exceeding maximum!',
            (err, responseData) => {
                if (err) {
                    console.log(err);
                } else {
                    console.dir(responseData);
                }
            }
        );
    }

}
function syncData() {
  /*  getAct.getActTestRand(function (err, rows) {
            if (err) {
                console.log(err);
                res.json(err);
            }
            else {
                
                var updatedData = JSON.parse(JSON.stringify(rows));
                console.log("New rows are " + updatedData);
                //var diff = cache(data, updatedData);
                //console.log(diff);
                console.log(updatedData[0].actuator_test_id);
                console.log("client  " + client);
                /********** Commented for testing purposes ***************/
                //if (client > 0 && (updatedData[0].actuator_test_id > latestID)) {
        /*        if (client > 0) {
                    latestID = updatedData[0].actuator_test_id;
                    io.sockets.emit('updateData', updatedData);
                }


            }
        });*/
    

    _process.getHistProcess(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            var histProcess = JSON.parse(JSON.stringify(rows));
            console.log("Historical process data " + histProcess);
            io.sockets.emit("processHistData", histProcess);
        }
    });
   /* testModel.getTestProcess(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            var _pData = JSON.parse(JSON.stringify(rows));
            console.log("New updated process rows are " + _pData, rows);
            io.sockets.emit('updatedPData', _pData);
        }
    });

    newAddAct.getNewActTest(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            var updatedData = JSON.parse(JSON.stringify(rows));
            console.log("New updates cycle rows are " + updatedData);
            io.sockets.emit('updateData', updatedData);
        }
    });

    testModel.getTestPusher(function (err, rows) {
        if (err) {
            res.json(err);
        }
        else {
            var _pData = JSON.parse(JSON.stringify(rows));
            console.log("New process rows are " + _pData, rows);
            io.sockets.emit('updatedPData', _pData);
        }
    });*/
        setTimeout(function () { syncData(); }, 65000);

}


// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});



io.sockets.on('connection', function (socket) {
    console.log('A client is connected!');
    socket.on('Connected', function (msg) {
        console.log(msg);
        
      /*  newAddAct.getNewAct(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                console.log(rows);
                var data = JSON.parse(JSON.stringify(rows));
                console.log(data);
                socket.emit('completeData', data);
            }
        });*/

        /*newAddAct.getNewActTest(function (err, rows) {
              if (err) {
                  res.json(err);
              }
              else {
                  var data = JSON.parse(JSON.stringify(rows));
                  console.log("New rows are " + data);
                  socket.emit('completeData', data);
              }
          });
        });*/

       /* _process.getHistProcess(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var histProcess = JSON.parse(JSON.stringify(rows));
                console.log("Historical process data " + histProcess);
                socket.emit("processHistData", histProcess);
            }
        });*/
       /* _process.getLatestProcesses(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestPro = JSON.parse(JSON.stringify(rows));
                console.log("Lates processes data " + latestPro);
                socket.emit("latestPro", latestPro);
            }
        });*/
        _process.getLatestProcesses(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestPro = JSON.parse(JSON.stringify(rows));
                console.log("Lates processes data " + latestPro);
                io.sockets.emit("latestPro", latestPro);
            }
        });
        _process.getLatestProcess(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var pro = JSON.parse(JSON.stringify(rows));
                console.log("Lates distribution process data " + pro);
                io.sockets.emit("latestDPro", pro);
            }
        });
        _system.getLatestSystem(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestSys = JSON.parse(JSON.stringify(rows));
                console.log("Latest System data " + latestSys);
                socket.emit("latestSystem", latestSys);
            }
        });

        _system.getHistSys(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var histSys = JSON.parse(JSON.stringify(rows));
                console.log("Historical System data " + histSys);
                socket.emit("histSystem", histSys);
            }
        });

        _system.getSysPro(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var sysPro = JSON.parse(JSON.stringify(rows));
                console.log("Process System data " + sysPro);
                socket.emit("procandsys", sysPro);
            }
        });
        newAddAct.getProcessComp(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestAct = JSON.parse(JSON.stringify(rows));
                console.log("Latest Actuator data " + latestAct);
                socket.emit("latestAct", latestAct);
            }
        });

        newAddAct.getLatestPshr(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestPshr = JSON.parse(JSON.stringify(rows));
                console.log("Latest Pusher data " + latestPshr);
                socket.emit("latestPshr", latestPshr);
            }
        });

        newAddAct.getLatestSwvlA(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestSwvlA = JSON.parse(JSON.stringify(rows));
                console.log("Latest Swivel Arm data " + latestSwvlA);
                socket.emit("latestSwvlA", latestSwvlA);
            }
        });

        newAddAct.getLatestSwvlG(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var latestSwvlG = JSON.parse(JSON.stringify(rows));
                console.log("Latest Swivel Gripper data " + latestSwvlG);
                socket.emit("latestSwvlG", latestSwvlG);
            }
        });

        testModel.getTestProcess(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var _pData = JSON.parse(JSON.stringify(rows));
                console.log("New process rows are " + _pData, rows);
                socket.emit('processData', _pData);
            }
        });

        newAddAct.getActCycleTest(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var data = JSON.parse(JSON.stringify(rows));
                console.log("New cycle rows are " + data, rows);
                socket.emit('completeData', data);
            }
        });

        testModel.getTestPusher(function (err, rows) {
            if (err) {
                res.json(err);
            }
            else {
                var _pData = JSON.parse(JSON.stringify(rows));
                console.log("New process rows are " + _pData, rows);
                socket.emit('actData', _pData);
            }
        });
    });
    syncData();
});
   
//});


eventEmitter.onDataChange(function (data) {
    console.log("DEBUG!! EVENT EMITTER");
    console.log(data, data[0].tag_type);
   
   // io.sockets.on('STOPRT', function (flag) {
       // if (flag == false) {
            if (data[0].tag_type == 65) {
                console.log("Emitting Actuator Data!!");
                io.sockets.emit('updateAData', data);
                checkThreshold(data[0].aCycleTime, data[0].aDCycleMax, data[0].DepCompId);
            }
            else if (data[0].tag_type == 80) {
                console.log("Emitting Process Data!!");
                io.sockets.emit('updatePData', data);
            }
            else if (data[0].tag_type == 83) {
                console.log("Emitting System Data!!");
                io.sockets.emit('updateSData', data);
            }
            else {
                io.sockets.emit('errorMessage', data);
            }
      //  }
  //  });
   
    
    //eventEmitter.removeListener();
});

app.set('port', process.env.PORT || 3000);//config.app.port);


var server = app.listen(app.get('port'), function () {
   debug('Express server listening on port ' + server.address().port);
});