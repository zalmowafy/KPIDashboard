function drawHistChart(histSys) {
    var combo = [];
    combo = histSys;
    console.log("combo is " + combo);
    var data = [];
    var _temp = [];
   
    var Obj = [];
    var flg = 0;
    
    for (var i = 0; i < histSys.length; i++) {
        
        console.log(histSys, histSys[i], i);
        Obj = JSON.parse(JSON.stringify(histSys[i]));
        console.log(Obj, Obj[0]);
        console.log(Obj.CycleDuration);
        var arrTime = ((Obj.CycleDuration).split(':'));
        console.log(arrTime);
        var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        console.log(duration);
        arrTime = ((Obj.sDCycleMax).split(':'));
        var max = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        console.log("max is " + max);
        if (duration >= max) {
            flg = 1;
        }
        else {
            flg = 0;
        }
        _temp[i] = [i + 1, duration, Obj.CycleId, flg];
        
    }
    //data = temp;
    data[0] = ['Id', 'Cycle Time', 'Cycle Id', 'flag'];
    for (var j = 0; j < _temp.length; j++) {
        data[j + 1] = _temp[j];
    }
    console.log("temp array is " + data);
    var gData = new google.visualization.arrayToDataTable(data, false);
    
    console.log('Google data is' + JSON.parse(JSON.stringify(gData)));

    var view = new google.visualization.DataView(gData);
    view.setColumns([0, 1,
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 3) == 1)) {
                    return '#980000';
                } else {
                    return '#95C8D8';
                }
            },
            type: 'string',
            role: 'style'
        },
        /*{
            calc: "stringify",
            sourceColumn: 2,
            color: "grey",
            type: "string",
            role: "annotation"
        }*/]);

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
            //format: 'h:mm a',
            viewWindow: {
                min: 0,
                max: 50
            },
            /* viewWindow: {
                 min: 0,
                 max: 22
             },*/
            slantedText: false,
            slantedTextAngle: 45
        },
        seriesType: 'bars',
        bar: {
            // width: 5
             gap: 2, 
            //width: 8,
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

    

    var sHistCycles = new google.visualization.ComboChart(document.getElementById('hist_cycles'));
    var HistCycles = new google.charts.Bar(document.getElementById('process_cycle'));
   // var HistCycles = new google.visualization.ComboChart(document.getElementById('process_cycle'));

    function selectHandler() {
        var selectedItem = sHistCycles.getSelection()[0];
        if (selectedItem) {
            var count = 0;
            var array = [];
            var process = [];
            var name;
            var topping = gData.getValue(selectedItem.row, 2);
            for (var i = 0; i < combo.length; i++) {
                Obj = JSON.parse(JSON.stringify(combo[i]));
                if (topping == Obj.CycleId) {
                    //_temp = [];
                    var arrTime = ((Obj.pCycleDuration).split(':'));
                    console.log(arrTime);
                    var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
                    console.log(duration);
                    arrTime = ((Obj.pDCycleMax).split(':'));
                    var max = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
                    if (duration >= max) {
                        flg = 1;
                    }
                    else {
                        flg = 0;
                    }
                    if (Obj.DepProcessId == 666) {
                        name = "Dist";
                        array[count] = [name, duration, flg];
                    }
                    else if (Obj.DepProcessId == 787) {
                        name = "Buff";
                        array[count] = [name, duration, flg];
                    }
                    else if (Obj.DepProcessId == 990) {
                        name = "Proc";
                        array[count] = [name, duration, flg];
                    }
                    else if (Obj.DepProcessId == 222) {
                        name = "Hndlng";
                        array[count] = [name, duration, flg];
                    }
                    //array[count] = [count, duration, Obj.DepProcessId, flg];//, Obj.CycleId, flg];
                    count++;
                }
            }
            console.log("Process array is " + array);
            process[0] = ['Process', 'Cycle Time', 'flag'];//, 'Cycle Id', 'flag'];
            for (var j = 0; j < array.length; j++) {
                process[j + 1] = array[j];
            }
           
            var gPData = new google.visualization.arrayToDataTable(process, false);
            process = [];
            console.log('Google data is' + JSON.parse(JSON.stringify(gPData)));

            var view1 = new google.visualization.DataView(gData);
            view1.setColumns([0, 1,
                {
                    calc: function (dt, row) {
                        if ((dt.getValue(row, 2) == 1)) {
                            return '#980000';
                        } else {
                            return '#95C8D8';
                        }
                    },
                    type: 'string',
                    role: 'style'
                },
       /* {
            calc: "stringify",
            sourceColumn: 2,
            color: "grey",
            type: "string",
            role: "annotation"
        }*/]);

            var Poptions = {
                // title: 'Monthly Coffee Production by Country',
               /* trendlines: {
                    0: {
                        type: 'polynomial',
                        color: '#000000',
                        lineWidth: 2,
                        opacity: 0.5,
                        showR2: true,
                        visibleInLegend: false
                    }
                },*/
                //  vAxis: { title: 'cycle duration' },
                hAxis: {
                    //title: 'cycle timestamp',
                    //format: 'h:mm a',
                    viewWindow: {
                        min: 0,
                        max: 4
                    },
                    /* viewWindow: {
                         min: 0,
                         max: 22
                     },*/
                    slantedText: false,
                    slantedTextAngle: 45
                },
                seriesType: 'bars',
                bar: {
                    // width: 5
                    gap: 2,
                    //width: 3,
                },

                //colors: ['#95C8D8'],
                legend: { position: 'top' },


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
          
            //alert('The user selected ' + process);
            
            //console.log("HistCycles " + (JSON.parse(HistCycles)));
            // HistCycles.draw(gPData, Poptions);
            console.log(gPData, Poptions);
            HistCycles.draw(gPData, Poptions);
            
        }
       
    }
  // selectHandler(sHistCycles, gData, 2);
    //var selected = selectHandler();
    google.visualization.events.addListener(sHistCycles, 'select', selectHandler);
    sHistCycles.draw(view, options);
   

   // return selected;
}

$(window).resize(function () {
    drawHistChart();
});


