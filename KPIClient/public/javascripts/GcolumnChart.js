function drawColChart(dataArray, histFlag) {
    // Some raw data (not necessarily accurate)
  
    var temp = [];
    var _temp = [];
    var test = [];
    var flag = 0;
    temp[0] = ['Cycle Start Time', 'Cycle Time', 'flag', 'max', 'min'];
    var j = 0;
    if (histFlag == true) {
        for (var i = 0; i < dataArray.length; i++) {
            j = dataArray.length - 1;
            console.log(dataArray, dataArray[i], i);
            test = JSON.parse(JSON.stringify(dataArray[i]));
            console.log(test, test[0]);
            console.log(test.CycleDuration);
            var arrTime = ((test.CycleDuration).split(':'));
            console.log(arrTime);
            var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
            console.log(duration);
            var cycleTime = (test.CycleStartTime).substring(11, 23).replace('T', ' ');
            console.log(cycleTime);
            // newData.push([dataArray[i].pCycleStartTime, duration]);
            if (duration >= 38) {
                flag = 1;
            }
            else {
                flag = 0;
            }
            var stringtest = test.CycleId + '';
            _temp[i] = [cycleTime, duration, flag, 38, 28];
            console.log("BEFORE SHIFT " + _temp);
        }

        for (var i = 0; i < _temp.length; i++) {
            temp[i + 1] = _temp[i];
        }
    }
    else {

        for (var i = 0; i < dataArray.length; i++) {
            console.log(dataArray, dataArray[i], i);
            test = JSON.parse(JSON.stringify(dataArray[i]));
            console.log(test, test[0]);
            console.log(test.CycleDuration);
            var arrTime = ((test.CycleDuration).split(':'));
            console.log(arrTime);
            var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
            console.log(duration);
            var cycleTime = (test.CycleStartTime).substring(11, 23).replace('T', ' ');
            console.log(cycleTime);
            // newData.push([dataArray[i].pCycleStartTime, duration]);
            if (duration >= 38) {
                flag = 1;
            }
            else {
                flag = 0;
            }
            var stringtest = test.CycleId + '';

            _temp[i] = [cycleTime, duration, flag, 38, 28];
            console.log("BEFORE SHIFT " + _temp);
        }
        for (var k = 0; k < _temp.length; k++) {
            temp[k + 1] = _temp[k];
        }
    }

        

   
   
    //data = temp;
    
    
    console.log("temp array is " + temp);
    var data = new google.visualization.arrayToDataTable(temp, false);
    console.log(data);


    console.log('Google data is' + JSON.parse(JSON.stringify(data)));

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
       /* {
            calc: "stringify",
            sourceColumn: 2,
            color: "grey",
            type: "string",
            role: "annotation"
        },*/
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 2) == 1)) {
                    return '#580000';
                } else {
                    return '#95C8D8';
                }
            },
            type: 'string',
            role: 'style'
        },3, 4]);

    var options = {
       // title: 'Monthly Coffee Production by Country',
       /* trendlines: {
            0: {
                type: 'polynomial',
                color: 'grey',
                lineWidth: 3,
                opacity: 0.3,
                showR2: true,
                visibleInLegend: true
            }
        },*/
      //  vAxis: { title: 'cycle duration' },
        hAxis: {
            //title: 'cycle timestamp',
            format: 'h:mm a',
            viewWindow: {
                min: [00, 00, 0],
                max: [20, 30, 0]
            },
           /* viewWindow: {
                min: 0,
                max: 22
            },*/
            slantedText: true,
            slantedTextAngle: 45
        },
        seriesType: 'bars',
        bar: {

            width: 8,  
        },
       series: {

            2: { type: 'line' },
            3: { type: 'line' }

        },
        //colors: ['#95C8D8'],
        legend: { position: 'right' },

    };

    var sCycleschart = new google.visualization.ComboChart(document.getElementById('sys_cycles'));
    sCycleschart.draw(data, options);
}

$(window).resize(function () {
    drawColChart();
});


