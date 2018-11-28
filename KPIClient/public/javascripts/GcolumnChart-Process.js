function drawColChart(proData, histFlag) {
         
    // Some raw data (not necessarily accurate)
    /*var data = google.visualization.arrayToDataTable([
        ['timestamp', 'cycle duration'],//, 'Average', 'LM Min', 'LM Max', 'Design Min', 'Design Max'],
        [{ v: [1, 0, 0], f: '1 am' }, 2], //614.6, 160, 170, 160, 270],
        [{ v: [2, 0, 0], f: '2 am' }, 2], //682, 130, 140, 130, 270],
        [{ v: [3, 0, 0], f: '3 am' }, 3], //623, 150, 160, 150, 270],
        [{ v: [3, 30, 0], f: '3:30 am' }, 5], //609.4, 130, 141, 130, 270],
        [{ v: [5, 0, 0], f: '5 am' }, 3], //569.6, 130, 140, 130, 270],
        [{ v: [6, 30, 0], f: '6:30 am' }, 5], //609.4, 130, 140, 130, 270],
        [{ v: [7, 30, 0], f: '7:30 am' }, 6], //609.4, 130, 140, 130, 270],
        [{ v: [10, 0, 0], f: '10 am' }, 6], //609.4, 130, 140, 130, 270],
        [{ v: [11, 30, 0], f: '11:30 am' }, 7], //609.4, 130, 140, 130, 270],
        [{ v: [1, 0, 0], f: '1 pm' }, 7], //609.4, 130, 140, 130, 270],
        [{ v: [2, 0, 0], f: '2 pm' }, 7], //614.6, 160, 170, 160, 270],
        [{ v: [15, 30, 0], f: '3:30 pm' }, 8], //682, 130, 140, 130, 270],
        [{ v: [16, 0, 0], f: '4 pm' }, 8], //623, 150, 160, 150, 270],
        [{ v: [16, 30, 0], f: '4:30 pm' }, 6], //609.4, 130, 141, 130, 270],
        [{ v: [17, 0, 0], f: '5 pm' }, 9], //569.6, 130, 140, 130, 270],
        [{ v: [17, 30, 0], f: '5:30 pm' }, 10], //609.4, 130, 140, 130, 270],
        [{ v: [18, 0, 0], f: '6 pm' }, 11], //609.4, 130, 140, 130, 270],
        [{ v: [18, 30, 0], f: '6:30 pm' }, 11], //609.4, 130, 140, 130, 270],
        [{ v: [19, 0, 0], f: '7 pm' }, 12], //609.4, 130, 140, 130, 270],
        [{ v: [19, 30, 0], f: '7:30 pm' }, 13] //,609.4, 130, 140, 130, 270]
    ]);*/


    var Obj = [];
    var data = [];
    var temp = [];
    var count = 0;
    var flag = 0;

    temp[0] = ['Id', 'cycle duration', 'Cycle Id', 'flag'];

    if (histFlag == true) {
        for (var i = 0; i < proData.length; i++) {
            if (count >= 30) {
                count = 0;
            }
            count++;
            Obj = JSON.parse(JSON.stringify(proData[i]));
            console.log(Obj);

            var arrTime = ((Obj.pCycleDuration).split(':'));
            console.log(arrTime);
            var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
            if (duration >= 8) {
                flag = 1;
            }
            else {
                flag = 0;
            }
            if (duration != 0) {
                data[i] = [count, duration, Obj.CycleId + '', flag];
            }

        }

        for (var j = 0; j < data.length; j++) {
            temp[j + 1] = data[j];
            console.log(temp);
        }
        console.log("Data inside process chart is " + proData);
    }
    
    else {
        for (var i = 0; i < proData.length; i++) {
            if (count >= 30) {
                count = 0;
            }
            count++;
            Obj = JSON.parse(JSON.stringify(proData[i]));
            console.log(Obj);

            var arrTime = ((Obj.pCycleDuration).split(':'));
            console.log(arrTime);
            var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
            if (duration >= 8) {
                flag = 1;
            }
            else {
                flag = 0;
            }
            if (duration != 0) {
                data[i] = [count, duration, Obj.CycleId + '', flag];
            }

        }
        console.log("Data prepared is: " + data);



        for (var j = 0; j < data.length; j++) {
            temp[j + 1] = data[j];
            console.log(temp);
        }
    }
    
    

    var gData = google.visualization.arrayToDataTable(temp, false);

    var view = new google.visualization.DataView(gData);
    view.setColumns([0, 1,
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

    var options = {
       // title: 'Monthly Coffee Production by Country',
        trendlines: {
            0: {
                type: 'polynomial',
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
               // min: [00, 00, 0],
                min: 0,
               // max: [20, 30, 0]
                max: 30
            },
            slantedText: false,
            slantedTextAngle: 360
        },
        seriesType: 'bars',
        bar: {
              width: 8,
           // gap: 2,  
        },
       
       // colors: ['#95C8D8'],
        legend: { position: 'none' },

    };

    var sCycleschart = new google.visualization.ComboChart(document.getElementById('process_cycles'));
    sCycleschart.draw(view, options);
}

$(window).resize(function () {
    drawColChart();
});


