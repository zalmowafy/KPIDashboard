function drawProcessChart(dataArray) {
    // Some raw data (not necessarily accurate)
   /* var data = google.visualization.arrayToDataTable([
        ['timestamp', 'cycle duration'],
        [{ v: [1, 0, 0], f: '1 am' }, 165], 
        [{ v: [3, 0, 0], f: '3 am' }, 135],
        [{ v: [6, 0, 0], f: '6 am' }, 157],
        [{ v: [8, 0, 0], f: '8 am' }, 190],
        [{ v: [11, 0, 0], f: '11 am' }, 136],
        [{ v: [12, 30, 0], f: '12:30 pm' }, 400],
        [{ v: [13, 0, 0], f: '1 pm' }, 139],
        [{ v: [13, 30, 0], f: '1:30 pm' }, 400],
        [{ v: [14, 0, 0], f: '2 pm' }, 400],
        [{ v: [14, 30, 0], f: '2:30 pm' }, 400],
        [{ v: [15, 0, 0], f: '3 pm' }, 165],
        [{ v: [15, 30, 0], f: '3:30 pm' }, 135],
        [{ v: [16, 0, 0], f: '4 pm' }, 157],
        [{ v: [16, 30, 0], f: '4:30 pm' }, 190],
        [{ v: [17, 0, 0], f: '5 pm' }, 136],
        [{ v: [17, 30, 0], f: '5:30 pm' }, 400],
        [{ v: [18, 0, 0], f: '6 pm' }, 139],
        [{ v: [18, 30, 0], f: '6:30 pm' }, 400],
        [{ v: [19, 0, 0], f: '7 pm' }, 400],
        [{ v: [19, 30, 0], f: '7:30 pm' }, 400]
    ]);*/
   // console.log(dataArray, dataArray.length);
    
   // var newData = {};
    var temp = [];
    var _temp = [];
    var tempObj = {};
    temp[0] = ['cTime', 'cDuration', 'count'];
   // data.addRow('DateTime', 'Duration', { role: 'annotation' });
    var test = [];
    var count = 0;
    for (var i = 0; i < dataArray.length; i++) {
        count++;
        console.log(dataArray, dataArray[i], i);
        test = JSON.parse(JSON.stringify(dataArray[i]));
        console.log(test, test[0]);
        console.log(test[0].pCycleDuration);
        var arrTime = ((test[0].pCycleDuration).split(':'));
        console.log(arrTime);
        var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        console.log(duration);
        var cycleTime = (test[0].pCycleStartTime).substring(12, 23).replace('T', ' ');
        console.log(cycleTime);
       // newData.push([dataArray[i].pCycleStartTime, duration]);
        var stringtest = count + '';
        
        if (_temp.length >= 30) {
            _temp.shift();
            console.log("AFTER SHIFT " + _temp);
            _temp[29] = [cycleTime, duration, stringtest];
            // _temp[i] = [cycleTime, duration, stringtest];
        }
           
           // var j = 30;
            
           // temp[j] = [cycleTime, duration, stringtest];
            //j = j - 1;
          //  console.log("i is " + i);
      //  }
        else {
            _temp[i] = [cycleTime, duration, stringtest];
            console.log("BEFORE SHIFT " + _temp);
        }
      //  }
        /*tempObj = {
            'cTime': cycleTime,
            'cDuration': duration,
            'tests': stringtest
        }
        temp.push(tempObj);*/
        
       // data.addRow(temp);
       // console.log(data);
       /* if (data.length >= 30) {
            data.addRow([cycleTime, duration, stringtest]);
        }
        else {
            data.addRow([cycleTime, duration, stringtest]);
        }*/
        
    }
    //data = temp;
    temp[0] = ['cTime', 'cDuration', 'count'];
    for (var j = 0; j < _temp.length; j++) {
        temp[j + 1] = _temp[j];
    }
    console.log("temp array is " + temp);
    var data = new google.visualization.arrayToDataTable(temp, false);
    console.log(data);
   // data.addColumn('string', 'DateTime');
    //data.addColumn('number', 'Duration');
    //data.addColumn({ type: 'string', role: 'annotation' });

    console.log('Google data is' + JSON.parse(JSON.stringify(data)));

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 2,
            color: "grey",
            type: "string",
            role: "annotation"
        }]);
   // data = newData;
    var options = {

        trendlines: {
            0: {
                type: 'polynomial',
                color: 'grey',
                lineWidth: 3,
                opacity: 0.3,
                showR2: true,
                visibleInLegend: true
            }
        },

        hAxis: {
           // format: 'h:mm a',
            viewWindowMode: 'explicit',
            viewWindow: {
                min: 0,//[00, 00, 0],
                max: 30//[20, 30, 0]
            },
         
            slantedText: true,
            slantedTextAngle: 45
        },
      /*  vAxis: {
            gridlines: {
                color: 'transparent'
            }
        },*/
        seriesType: 'bars',
        bar: {
            width: 8,  
            //gap: 1,
        },
       
        colors: ['#95C8D8'],
        legend: { position: 'right' },

    };

    var pCycleschart = new google.visualization.ComboChart(document.getElementById('test_col'));
    pCycleschart.draw(view, options);
}

$(window).resize(function () {
    drawProcessChart(dataArray);
});


