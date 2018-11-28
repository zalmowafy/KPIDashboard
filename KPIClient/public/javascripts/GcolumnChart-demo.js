function drawActColChart(actData) {
    // Some raw data (not necessarily accurate)
    /* var data = google.visualization.arrayToDataTable([
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

    var Obj = [];
    var aName;
    var data = [];
    var temp = [];
    var max;
    var duration;
    var flag = 0;
    for (var i = 0; i < actData.length; i++) {

        Obj = JSON.parse(JSON.stringify(actData[i]));
        console.log(Obj, Obj[0].MotionDuration);

        var arrTime = ((Obj[0].MotionDuration).split(':'));
        console.log(arrTime);
        duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;

        arrTime = ((Obj[0].aDCycleMax).split(':'));
        max = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;

        var _carrTime = ((Obj[0].aCycleTime).split(':'));
        var cDuration = (Number(_carrTime[0] * 360000) + Number(_carrTime[1] * 60000) + Number(_carrTime[2] * 1000)) / 1000;
        if (cDuration >= max) {
            flag = 1;
        }
        else {
            flag = 0;
        }
        if (Obj[0].DepCompId == 22) {
            if (Obj[0].MotionStatus == 2) {
                aName = "Pshr-H to W"
                data[i] = [aName, duration, flag];
            }
            else {
                aName = "Pshr-W to H"
                data[i] = [aName, duration, flag];
            }

        }
        if (Obj[0].DepCompId == 23) {
            if (Obj[0].MotionStatus == 2) {
                aName = "SwvlA-H to W"
                data[i] = [aName, duration, flag];
            }
            else {
                aName = "SwvlA-W to H"
                data[i] = [aName, duration, flag];
            }

        }
        if (Obj[0].DepCompId == 24) {
            if (Obj[0].MotionStatus == 2) {
                aName = "SwvlG-H to W"
                data[i] = [aName, duration, flag];
            }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }

        }
        if (Obj[0].DepCompId == 12) {
           // if (Obj[0].MotionStatus == 2) {
                aName = "cnvyr"
                data[i] = [aName, duration, flag];
         /*   }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 25) {
           // if (Obj[0].MotionStatus == 2) {
                aName = "Sprtr"
                data[i] = [aName, duration, flag];
           /* }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 18) {
           // if (Obj[0].MotionStatus == 2) {
                aName = "Rot"
                data[i] = [aName, duration, flag];
          /*  }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 13) {
          //  if (Obj[0].MotionStatus == 2) {
                aName = "prtChkr"
                data[i] = [aName, duration, flag];
          /*  }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 14) {
            if (Obj[0].MotionStatus == 2) {
                aName = "drlr-H to W"
                data[i] = [aName, duration, flag];
            }
            else {
                aName = "drlr-W to H"
                data[i] = [aName, duration, flag];
            }

        }
        if (Obj[0].DepCompId == 16) {
           // if (Obj[0].MotionStatus == 2) {
            console.log(Obj[0].DepCompId);
                aName = "Clmp"
                data[i] = [aName, duration, flag];
          /*  }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 29) {
           // if (Obj[0].MotionStatus == 2) {
                aName = "unlodr"
                data[i] = [aName, duration, flag];
           /* }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 20) {
           // if (Obj[0].MotionStatus == 2) {
                aName = "Grpr"
                data[i] = [aName, duration, flag];
          /*  }
            else {
                aName = "SwvlG-W to H"
                data[i] = [aName, duration, flag];
            }*/

        }
        if (Obj[0].DepCompId == 19) {
            if (Obj[0].MotionStatus == 2) {
                aName = "GantryZ H-W"
                data[i] = [aName, duration, flag];
            }
            else {
                aName = "GantryZ W-H"
                data[i] = [aName, duration, flag];
            }

        }
        if (Obj[0].DepCompId == 21) {
            if (Obj[0].MotionStatus == 3) {
                aName = "GantryY H-W"
                data[i] = [aName, duration, flag];
            }
            else {
                aName = "GantryY W-H"
                data[i] = [aName, duration, flag];
            }

        }
       

    }
    console.log("Data prepared is: " + data);

    temp[0] = ['Motion Name', 'Motion Time', 'flag'];

    for (var j = 0; j < data.length; j++) {
        temp[j + 1] = data[j];
        console.log(temp);
    }

    var gData = google.visualization.arrayToDataTable(temp, false);

    var view = new google.visualization.DataView(gData);
    view.setColumns([0, 1,
        // style column
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 2) == 1)) {
                    return 'red';
                } else {
                    return '#95C8D8';
                }
            },
            type: 'string',
            role: 'style'
        }
    ]);

    var options = {
        // title: 'Monthly Coffee Production by Country',
        trendlines: {
            0: {
                type: 'linear',
                color: 'grey',
                lineWidth: 3,
                opacity: 0.3,
                showR2: true,
                visibleInLegend: true
            }
        },
        //  vAxis: { title: 'cycle duration' },
        hAxis: {
            //title: 'cycle timestamp',
            //format: 'h:mm a',
            viewWindow: {
                min: 0,
                max: 28
            },
            slantedText: false,
            slantedTextAngle: 90
        },
        seriesType: 'bars',
        bar: {
            //  width: 20,
            gap: 2,
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

    var aSeqchart = new google.visualization.ComboChart(document.getElementById('act_demo_cycles'));
    aSeqchart.draw(view, options);
}

$(window).resize(function () {
    drawActColChart();
});


