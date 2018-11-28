function drawLineChart(histData) {
    console.log("Data Received to drawer is: " + histData);
   /* var data = google.visualization.arrayToDataTable([
        ['Timestamp', 'Distribution', 'Buffering', 'Processing', 'Handling'],
        [{ v: [1, 0, 0], f: '1 am' }, 7, , , 14],
        [{ v: [3, 0, 0], f: '3 am' }, 7, 5, 10, 14],
        [{ v: [5, 0, 0], f: '5 am' }, 7, 5, 10, 14],
        [{ v: [7, 0, 0], f: '7 am' }, 7, 5, 10, 14],
        [{ v: [10, 0, 0], f: '10 am' }, 7, 7, 10, 17],
        [{ v: [13, 0, 0], f: '1 pm' }, 7, 5, 10, 14],
        [{ v: [14, 0, 0], f: '2 pm' }, 7, 5, 10, 14],
        [{ v: [15, 0, 0], f: '3 pm' }, 7, 5, 10, 14],
        [{ v: [15, 30, 0], f: '3:30 pm' }, 8, 5, 12, 15],
        [{ v: [17, 0, 0], f: '5 pm' }, 9, 5, 13, 14],
    ]);*/
    var _p1Id = 666;
    var _p2Id = 787;
    var _p3Id = 990;
    var _p4Id = 222;
    var _p1CT = 0;
    var _p2CT = 0;
    var _p3CT = 0;
    var _p4CT = 0;
    var Obj = {};
    var data = [];
    var temp = [];
    for (var i = 0; i < histData.length; i++) {
        Obj = JSON.parse(JSON.stringify(histData[i]));
        var timeStamp = (Obj.pCycleStartTime).substring(12, 23).replace('T', ' ');
        var arrTime = ((Obj.pCycleDuration).split(':'));
        console.log(arrTime);
        _pCT = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
        console.log(_pCT);
        
        if (Obj.DepProcessId == _p1Id) {
            _p1CT = _pCT;
            data[i] = [timeStamp, _pCT, _p2CT, _p3CT, _p4CT];
        }
        else if (Obj.DepProcessId == _p2Id) {
            _p2CT = _pCT;
            data[i] = [timeStamp, _p1CT, _pCT, _p3CT, _p4CT];
        }
        else if (Obj.DepProcessId == _p3Id){
            _p3CT = _pCT;
            data[i] = [timeStamp, _p1CT, _p2CT, _pCT, _p4CT];
        }
        else {
            data[i] = [timeStamp, _p1CT, _p2CT, _p3CT, _pCT];
        }     
    }
    console.log("Data prepared for the line graph is " + data);
    temp[0] = ['Timestamp', 'Distribution', 'Buffering', 'Processing', 'Handling'];
    for (var j = 0; j < data.length; j++) {
        temp[j + 1] = data[j];
    }
    var gData = new google.visualization.arrayToDataTable(temp, false);
    console.log(gData);
    var options = {
        title: 'Processes among time',
        curveType: 'function',
        legend: { position: 'bottom' }
    };

    var linechart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    linechart.draw(gData, options);
}

$(window).resize(function () {
    drawLineChart(histData);
});
