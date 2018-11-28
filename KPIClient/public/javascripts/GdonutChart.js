function drawDonutChart(value, colorflag) {
    console.log("DONUT CHART func is CALLED!!", value, document.getElementById("value").innerHTML);
    var _val;
    if (value > 0) {
       
        _val = value;
    }
    else {
        _val = document.getElementById("value").innerHTML;
    }
    var percentage = (_val * 100) / 100;
    //var max = (38 * 100) / 100;
    var avg = (32 * 100) / 100;
    var min = (28 * 100) / 100;
    var options;
    if (percentage > 100) {
        percentage = 100;
    }
    var max = 38;
    var data = google.visualization.arrayToDataTable([
        ['Cycle Time', 'value'],
        ['Working', percentage],
        //['min', max - 28],
        //['avg', max - 32],
        ['max', 100 - percentage]
    ]);

   // if (colorflag == 1) {
         options = {
            pieHole: 0.7,
            pieSliceTextStyle: {
                color: 'black',
            },
             colors: ['#00A2FF', '#E8E8E8'],//, 'yellow', '#00A2FF'],
            legend: 'none',
            pieSliceText: 'none'
        };
   // }
    
     
    var sysChart = new google.visualization.PieChart(document.getElementById('sys_donut'));
    sysChart.draw(data, options);
    /*var canvas = document.getElementById("sys_donut");
    var ctx = canvas.getContext("2d");
    ctx.font = "12px verdana";
    ctx.fillText('22');*/
}

$(window).resize(function () {
    drawDonutChart(value);

});