function drawChart() {

    var data = google.visualization.arrayToDataTable([
        ['Label', 'Value'],
        ['Cycle Time', 31.2]

    ]);

    var options = {
        width: 450, height: 170,
        redFrom: 35, redTo: 38,
        yellowFrom: 32, yellowTo: 35,
        max: 38,
        minorTicks: 1
    };

    var chart = new google.visualization.Gauge(document.getElementById('gauge'));

    chart.draw(data, options);


}