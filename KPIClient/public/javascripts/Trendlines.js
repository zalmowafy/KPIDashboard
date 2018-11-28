function drawTrendChart() {
    var data = google.visualization.arrayToDataTable([
        ['X', 'Y', 'Z'],
        [0, 4, 5],
        [1, 2, 6],
        [2, 4, 8],
        [3, 6, 10],
        [4, 4, 11],
        [5, 8, 13],
        [6, 12, 15],
        [7, 15, 19],
        [8, 25, 21],
        [9, 34, 23],
        [10, 50, 27]
    ]);

    var options = {
        height: 250,
        legend: 'none',
        colors: ['#9575cd', '#33ac71'],
        pointShape: 'diamond',
        trendlines: {
            0: {
                labelInLegend: 'Bug line',
                visibleInLegend: true,
            },
            1: {
                labelInLegend: 'Test line',
                visibleInLegend: true,
            }
            /*0: {
                type: 'exponential',
                pointSize: 20,
                opacity: 0.6,
                pointsVisible: false
            },
            1: {
                type: 'linear',
                pointSize: 10,
                pointsVisible: true
            }*/
        }
    };

    var chart = new google.visualization.ScatterChart(document.getElementById('chart_div'));

    chart.draw(data, options);
}

$(window).resize(function () {
    drawTrendChart();
    
});