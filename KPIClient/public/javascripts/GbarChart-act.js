var func = require('../javascripts/calcDuration');
function drawABarChart(aLatestData) {
   /* var data = google.visualization.arrayToDataTable([
        ["Actuator", "Cycle Duration", { role: "style" }],
        ["Pusher", 2, "#b87333"],
        ["Swivel Arm", 5, "silver"],
        ["Swivel Gripper", 2, "gold"]
    ]);

    var view = new google.visualization.DataView(data);
    view.setColumns([0, 1,
        {
            calc: "stringify",
            sourceColumn: 1,
            type: "string",
            role: "annotation"
        },
        2]);*/
    
    console.log("Latest Data Received to drawer is: " + aLatestData);
    var _a1Id = 22;
    var _a2Id = 23;
    var _a3Id = 24;
    var _aName;
    var data = [];
    var Obj = {};
    var temp = [];
    var aCT;
    var flag = 0;
    for (var i = 0; i < aLatestData.length; i++) {
        Obj = JSON.parse(JSON.stringify(aLatestData[i]));

        var arrTime = ((Obj.aCycleTime).split(':'));
        console.log(arrTime);

        var aCT = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        console.log(aCT);

        arrTime = ((Obj.aDCycleMax).split(':'));
        var dMax = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.aDCycleMin).split(':'));
        var dMin = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.aLCycleMin).split(':'));
        var lMin = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.aLCycleAvg).split(':'));
        var lAvg = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        arrTime = ((Obj.aLCycleMax).split(':'));
        var lMax = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        if (aCT >= dMax) {
            flag = 1;
        }
        else {
            flag = 0;
        }
        if (Obj.DepCompId == _a1Id) {
            console.log("1");
            _aName = "Pusher";
            data[0] = [_aName, aCT, dMax, dMin, lMax, lAvg, lMin, flag];
        }
        else if (Obj.DepCompId == _a2Id) {
            console.log("2");
            _aName = "Swivel Arm";
            data[1] = [_aName, aCT, dMax, dMin, lMax, lAvg, lMin, flag];
        }
        else {
            console.log("3");
            _aName = "Swivel Gripper";
            data[2] = [_aName, aCT, dMax, dMin, lMax, lAvg, lMin, flag];
        }
    }
    console.log(data);
    temp[0] = ["Actuator", "Cycle Duration", "D_Max", "D_Min", "L_Max", "L_Avg", "L_Min", "Flag"];
    for (var j = 0; j < data.length; j++) {
        temp[j + 1] = data[j];
    }

    var gData = google.visualization.arrayToDataTable(temp, false);

    var view = new google.visualization.DataView(gData);
    view.setColumns([0, 1,
        {
            calc: function (dt, row) {
                if ((dt.getValue(row, 7) == 1)) {
                    return 'red';
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
        title: "Actutators duration for current cycle",
       // width: 600,
       // height: 400,
        bars: 'vertical',
        bar: {
           // width: '5px'
            groupWidth: '5%'
        },
        legend: { position: "none" },
       
    };
    var processChart = new google.charts.Bar(document.getElementById("act_cycle"));//new google.visualization.BarChart(document.getElementById("process_cycle"));

    function selectHandler() {
        var selectedItem = processChart.getSelection()[0];
        if (selectedItem) {
            var topping = gData.getValue(selectedItem.row, 0);
            //alert('The user selected ' + topping);
            // HistCycles.draw(gData, options)
            if (topping == "Swivel Arm") {
                $('#max1').text(temp[2][2]);
                $('#min1').text(temp[2][3]);
                $('#lmax1').text(temp[2][6]);
                $('#lmin1').text(temp[2][4]);
                $('#lavg1').text(temp[2][5]);
            }
            else if (topping == "Swivel Gripper") {
                $('#max1').text(temp[3][2]);
                $('#min1').text(temp[3][3]);
                $('#lmax1').text(temp[3][6]);
                $('#lmin1').text(temp[3][4]);
                $('#lavg1').text(temp[3][5]);
            }
            else {
                $('#max1').text(temp[1][2]);
                $('#min1').text(temp[1][3]);
                $('#lmax1').text(temp[1][6]);
                $('#lmin1').text(temp[1][4]);
                $('#lavg1').text(temp[1][5]);
            }
        }
    }
    // selectHandler(sHistCycles, gData, 2);
    //var selected = selectHandler();
    google.visualization.events.addListener(processChart, 'select', selectHandler);

    $('#max1').text(temp[1][2]);
    $('#min1').text(temp[1][3]);
    $('#lmax1').text(temp[1][6]);
    $('#lmin1').text(temp[1][4]);
    $('#lavg1').text(temp[1][5]);

    processChart.draw(view, options);
}

$(window).resize(function () {
    drawABarChart(aLatestData);
});