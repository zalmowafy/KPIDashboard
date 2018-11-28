function drawCollChart(data, histFlag) {
    // Some raw data (not necessarily accurate)#
    console.log("Data inside chart func is: " + JSON.stringify(data));
  /*  var data1 = google.visualization.arrayToDataTable([
        ['Cycles', 'cycle duration'],//, 'Average', 'LM Min', 'LM Max', 'Design Min', 'Design Max'],
        [1, 1], //614.6, 160, 170, 160, 270],
        [2, 1], //682, 130, 140, 130, 270],
        [3, 1], //623, 150, 160, 150, 270],
        [4, 1], //609.4, 130, 141, 130, 270],
        [5, 1], //569.6, 130, 140, 130, 270],
        [6, 1], //609.4, 130, 140, 130, 270],
        [7, 1], //609.4, 130, 140, 130, 270],
        [8, 1], //609.4, 130, 140, 130, 270],
        [9, 1], //609.4, 130, 140, 130, 270],
        [10, 1], //609.4, 130, 140, 130, 270],
        [11, 1], //614.6, 160, 170, 160, 270],
        [12, 1], //682, 130, 140, 130, 270],
        [13, 2], //623, 150, 160, 150, 270],
        [14, 2], //609.4, 130, 141, 130, 270],
        [15, 2], //569.6, 130, 140, 130, 270],
        [16, 1], //609.4, 130, 140, 130, 270],
        [17, 1], //609.4, 130, 140, 130, 270],
        [18, 1], //609.4, 130, 140, 130, 270],
        [19, 1], //609.4, 130, 140, 130, 270],
        [20, 2] //,609.4, 130, 140, 130, 270]
    ]);*/

    /*var data2 = google.visualization.arrayToDataTable([
        ['Cycles', 'cycle duration'],//, 'Average', 'LM Min', 'LM Max', 'Design Min', 'Design Max'],
        [1, 1], //614.6, 160, 170, 160, 270],
        [2, 1], //682, 130, 140, 130, 270],
        [3, 1], //623, 150, 160, 150, 270],
        [4, 1], //609.4, 130, 141, 130, 270],
        [5, 2], //569.6, 130, 140, 130, 270],
        [6, 2], //609.4, 130, 140, 130, 270],
        [7, 2], //609.4, 130, 140, 130, 270],
        [8, 2], //609.4, 130, 140, 130, 270],
        [9, 2], //609.4, 130, 140, 130, 270],
        [10, 2], //609.4, 130, 140, 130, 270],
        [11, 1], //614.6, 160, 170, 160, 270],
        [12, 3], //682, 130, 140, 130, 270],
        [13, 2], //623, 150, 160, 150, 270],
        [14, 3], //609.4, 130, 141, 130, 270],
        [15, 3], //569.6, 130, 140, 130, 270],
        [16, 3], //609.4, 130, 140, 130, 270],
        [17, 3], //609.4, 130, 140, 130, 270],
        [18, 3], //609.4, 130, 140, 130, 270],
        [19, 1], //609.4, 130, 140, 130, 270],
        [20, 2] //,609.4, 130, 140, 130, 270]
    ]);*/
    //var data1 = [];
    //var data2 = [];
    var jObj = [];
   // var temp = [];
    var _fmoData = [];
    var _secmoData = [];
    var _fMo = [];
    var _secMo = [];
    var count = 0;
   // var _temp = [];
    var moFlag1 = false;
    var moFlag2 = false;
    var flag1 = 0;
    var flag2 = 0;
    _fmoData[0] = ['Id', 'Motion Time', 'Motion Id', 'coclorflag'];
    _secmoData[0] = ['Id', 'Motion Time', 'Motion Id', 'coclorflag'];

    if (histFlag == true) {
        for (var i = 0; i < data.length; i++) {
            if (count >= 30) {
                count = 0;
            }
            count++;
            jObj = JSON.parse(JSON.stringify(data[i]));
            console.log(jObj, jObj.MotionStatus);
            // console.log(jObj.moDuration, jObj.moStat);
            if (jObj.MotionStatus == 2) {
                console.log("Inside first motion");
                moFlag1 = true;
                var arrTime = ((jObj.MotionDuration).split(':'));
                console.log(arrTime);
                var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
                if (duration >= 2.8) {
                    flag1 = 1;
                }
                console.log(jObj);
                _fMo.push([count, duration, jObj.CycleId, flag1]);
                //var motionId = jObj[0].CycleId;
                // console.log(motionId);
            }
            if (jObj.MotionStatus == 4) {
                console.log("Inside second motion");
                moFlag2 = true;
                var arrTime = ((jObj.MotionDuration).split(':'));
                console.log(arrTime);
                var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
                // console.log(duration);
                // var motionId = jObj[0].CycleId;
                console.log(jObj);
                _secMo.push([count, duration, jObj.CycleId, flag2]);
            }
            //  temp[i] = [jObj.cycleId, jObj.moDuration];
            // console.log(temp[i]);
        }

        console.log("Data1 prepared is: " + _fMo);
        console.log("Data2 prepared is: " + _secMo);
        // _temp[0] = ['Motion Id', 'Motion Time'];


        //var data2;
        if (moFlag1 == true) {
            for (var j = 0; j < _fMo.length; j++) {
                // if
                _fmoData[j + 1] = _fMo[j];
            }
            console.log("First " + _fmoData);
        }

        if (moFlag2 == true) {
            for (var j = 0; j < _secMo.length; j++) {
                // if
                _secmoData[j + 1] = _secMo[j];
            }
            console.log("Second " + _secmoData);
        }
    }
    else {
        for (var i = 0; i < data.length; i++) {
            if (count >= 30) {
                count = 0;
            }
            count++;
            jObj = JSON.parse(JSON.stringify(data[i]));
            console.log(jObj, jObj.MotionStatus);
            // console.log(jObj.moDuration, jObj.moStat);
            if (jObj.MotionStatus == 2) {
                console.log("Inside first motion");
                moFlag1 = true;
                var arrTime = ((jObj.MotionDuration).split(':'));
                console.log(arrTime);
                var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
                console.log(jObj);
                if (duration >= 2.7) {
                    flag1 = 1;
                }
                _fMo.push([count, duration, jObj.CycleId, flag1]);
                //var motionId = jObj[0].CycleId;
                // console.log(motionId);
            }
            if (jObj.MotionStatus == 4) {
                console.log("Inside second motion");
                moFlag2 = true;
                var arrTime = ((jObj.MotionDuration).split(':'));
                console.log(arrTime);
                var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
                // console.log(duration);
                // var motionId = jObj[0].CycleId;
                console.log(jObj);
                _secMo.push([count, duration, jObj.CycleId, flag2]);
            }
            //  temp[i] = [jObj.cycleId, jObj.moDuration];
            // console.log(temp[i]);
        }

        console.log("Data1 prepared is: " + _fMo);
        console.log("Data2 prepared is: " + _secMo);
        // _temp[0] = ['Motion Id', 'Motion Time'];


        //var data2;
        if (moFlag1 == true) {
            for (var j = 0; j < _fMo.length; j++) {
                // if
                _fmoData[j + 1] = _fMo[j];
            }
            console.log("First " + _fmoData);
        }

        if (moFlag2 == true) {
            for (var j = 0; j < _secMo.length; j++) {
                // if
                _secmoData[j + 1] = _secMo[j];
            }
            console.log("Second " + _secmoData);
        }
    }
    
    
   // if (moFlag == true) {
   //     console.log("First motion");
    var data1 = new google.visualization.arrayToDataTable(_fmoData, false);
    console.log("f mo data " + JSON.stringify(data1));
   // }
   // if (moFlag == false) {
    //    console.log("Second motion");
    var data2 = new google.visualization.arrayToDataTable(_secmoData, false);
    console.log("s mo data " + JSON.stringify(data2));
   // }
    console.log("Data for view : " + data1);
    var view1 = new google.visualization.DataView(data1);
    view1.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 2,
            //color: "grey",
            type: "string",
            role: "annotation"
        },
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 3) == 1)) {
                    return '#580000';
                } else {
                    return '#95C8D8';
                }
            },
            type: 'string',
            role: 'style'
        }]);
    console.log("Data for view : " + data2);
    var view2 = new google.visualization.DataView(data2);
    view2.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 2,
            color: "grey",
            type: "string",
            role: "annotation"
        },
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 3) == 1)) {
                    return '#580000';
                } else {
                    return '#95C8D8';
                }
            },
            type: 'string',
            role: 'style'
        }]);
    var options1 = {
       // title: 'Monthly Coffee Production by Country',
        trendlines: {
            0: {
                type: 'linear',
                color: '#000000',
                lineWidth: 2,
                opacity: 0.5,
                showR2: true,
                visibleInLegend: false
            }
        },
      //  vAxis: { title: 'cycle duration' },
        hAxis: {
            //title: 'cycle timestamp',
           // format: 'h:mm a',
            viewWindow: {
                min: 0,
                max: 60
            },
            slantedText: false,
            slantedTextAngle: 360
        },
        seriesType: 'bars',
        bar: {
            //  width: 20,
            width: 8
            //gap: 2,  
        },
       
        //colors: ['#95C8D8'],
        legend: { position: 'right' },

       
      /*  series: {
            1: {
                type: 'line',
                color: '#f16c0e'},
            2: { type: 'line', color: '#00FF7F' },*/
            //3: { type: 'line', color: '#90EE90' },
           // 4: { type: 'line', color: '#ADD8E6' },
           // 5: {
             //   type: 'line',
              //  color: 'red'}
       // }
    };

    var options2 = {
        // title: 'Monthly Coffee Production by Country',
        trendlines: {
            0: {
                type: 'linear',
                color: '#000000',
                lineWidth: 2,
                opacity: 0.5,
                showR2: true,
                visibleInLegend: false
            }
        },
        //  vAxis: { title: 'cycle duration' },
        hAxis: {
            //title: 'cycle timestamp',
            // format: 'h:mm a',
            viewWindow: {
                min: 0,
                max: 60
            },
            slantedText: false,
            slantedTextAngle: 360
        },
        seriesType: 'bars',
        bar: {
            //  width: 20,
            width: 8
            //gap: 2,  
        },

        //colors: ['#95C8D8'],
        legend: { position: 'right' },


        /*  series: {
              1: {
                  type: 'line',
                  color: '#f16c0e'},
              2: { type: 'line', color: '#00FF7F' },*/
        //3: { type: 'line', color: '#90EE90' },
        // 4: { type: 'line', color: '#ADD8E6' },
        // 5: {
        //   type: 'line',
        //  color: 'red'}
        // }
    };

    var pCycleschart = new google.visualization.ComboChart(document.getElementById('act_cycles'));
    var sCycleschart = new google.visualization.ComboChart(document.getElementById('act2_cycles'));
    pCycleschart.draw(view1, options1);
    sCycleschart.draw(view2, options2);
    

    //
   // 
}

$(window).resize(function () {
    drawCollChart();
});


