function drawBarChart(platestData) {
   /* var data = google.visualization.arrayToDataTable([
        ["Process", "Cycle Duration"],
        ["Distribution", 8.94],
        ["Buffering", 10.49],
        ["Processing", 19.30],
        ["Handling", 15.45]
    ]);*/

    console.log("Latest Data Received to drawer is: " + platestData);
    var _p1Id = 666;
    var _p2Id = 787;
    var _p3Id = 990;
    var _p4Id = 222;
    var _pName;
    var data = [];
    var Obj = {};
    var temp = [];
    var flag = 0;
    for (var i = 0; i < platestData.length; i++) {
        Obj = JSON.parse(JSON.stringify(platestData[i]));
        
        var arrTime = ((Obj.pCycleDuration).split(':'));
        console.log(arrTime);
        var pCT = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        console.log(pCT);
        arrTime = ((Obj.pDCycleMax).split(':'));
        var dMax = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.pDCycleMin).split(':'));
        var dMin = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.pLCycleMin).split(':'));
        var lMin = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.pLCycleAvg).split(':'));
        var lAvg = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.pLCycleMax).split(':'));
        var lMax = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        if (pCT > dMax) {
            flag = 1;
        }
        else {
            flag = 0;
        }
        if (Obj.DepProcessId == _p1Id) {
            _pName = "Distribution";
            data[i] = [_pName, pCT, dMax, dMin, lMin, lAvg, lMax, flag];
        }
        else if (Obj.DepProcessId == _p2Id) {
            _pName = "Buffering";
            data[i] = [_pName, pCT, dMax, dMin, lMin, lAvg, lMax, flag];
        }
        else if (Obj.DepProcessId == _p3Id) {
            _pName = "Processing";
            data[i] = [_pName, pCT, dMax, dMin, lMin, lAvg, lMax, flag];
        }
        else {
            _pName = "Handling";
            data[i] = [_pName, pCT, dMax, dMin, lMin, lAvg, lMax, flag];
        }
    }

    temp[0] = ["Process", "Cycle Duration", "dMax", "dMin", "lMin", "lAvg", "lMax", "flag"];
    for (var j = 0; j < data.length; j++) {
        temp[j + 1] = data[j];
    }
    console.log("Temporary array " + temp);
    var gData = new google.visualization.arrayToDataTable(temp, false);
    var view = new google.visualization.DataView(gData);
    view.setColumns([0, 1,
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 7) == 1)) {
                    return '#580000';
                } else {
                    return 'blue';
                }
            },
            type: 'string',
            role: 'style'
        },
       /* {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        }*/]);

   
    var options = {
        title: "Density of Precious Metals, in g/cm^3",
       // width: 600,
       // height: 400,
        hAxis: {
            title: 'Process',
            //format: 'h:mm a',
           /* viewWindow: {
                min: 0,
                max: 22
            },*/
            slantedText: true,
            slantedTextAngle: 90
        },
        bars: 'vertical',
        bar: {
           // width: '5px'
            groupWidth: '10%'
        },
        legend: { position: "none" },
       
    };
    var processChart = new google.charts.Bar(document.getElementById("process_cycle"));//new google.visualization.BarChart(document.getElementById("process_cycle"));
    console.log("MAAAAAAAAAAAAAAAAAAAXXXX   " + temp[0][3]);
    $('#max').text(temp[1][2]);
    $('#min').text(temp[1][3]);
    $('#lmax').text(temp[1][6]);
    $('#lmin').text(temp[1][4]);
    $('#lavg').text(temp[1][5]);

    function selectHandler() {
        var selectedItem = processChart.getSelection()[0];
        if (selectedItem) {
            var topping = gData.getValue(selectedItem.row, 0);
            //alert('The user selected ' + topping);
            // HistCycles.draw(gData, options)
            if (topping == "Buffering") {
                $('#max').text(temp[2][2]);
                $('#min').text(temp[2][3]);
                $('#lmax').text(temp[2][6]);
                $('#lmin').text(temp[2][4]);
                $('#lavg').text(temp[2][5]);
            }
            else if (topping == "Processing") {
                $('#max').text(temp[3][2]);
                $('#min').text(temp[3][3]);
                $('#lmax').text(temp[3][6]);
                $('#lmin').text(temp[3][4]);
                $('#lavg').text(temp[3][5]);
            }
            else if (topping == "Handling") {
                $('#max').text(temp[4][2]);
                $('#min').text(temp[4][3]);
                $('#lmax').text(temp[4][6]);
                $('#lmin').text(temp[4][4]);
                $('#lavg').text(temp[4][5]);
            }
            else {
                $('#max').text(temp[1][2]);
                $('#min').text(temp[1][3]);
                $('#lmax').text(temp[1][6]);
                $('#lmin').text(temp[1][4]);
                $('#lavg').text(temp[1][5]);
            }
        }
    }
    // selectHandler(sHistCycles, gData, 2);
    //var selected = selectHandler();
    google.visualization.events.addListener(processChart, 'select', selectHandler);

    
    processChart.draw(view, options);
}

$(window).resize(function () {
    drawBarChart();

});