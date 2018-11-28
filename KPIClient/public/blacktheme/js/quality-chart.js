function drawQ(infoQ) {
    //$(document).ready(function () {
    // OEE = chart.getOEE

    // });
    // 

    $('#quality').text(infoQ);

    //var oee1 = parseFloat(infoE);
    //var oee2 = 100 - oee1;
    var quality1 = parseFloat(infoQ);
    var quality = 100 - quality1;
    //info.series[0].setData([oee1,100-oee1]);
    //alert(infoE);
    info = new Highcharts.Chart({

        chart: {
            renderTo: 'loading',
            width: 158,
            height: 158,
            //position: centre,
            margin: [0, 0, 0, 0],
            backgroundColor: null,
            plotBackgroundColor: 'none',

        },

        title: {
            text: null
        },

        tooltip: {
            formatter: function () {
                return this.point.name + ': ' + this.y + ' %';

            }
        },
        series: [
            {
                borderWidth: 2,
                borderColor: '#F1F3EB',
                shadow: false,
                type: 'pie',
                name: 'Income',
                innerSize: '75%',
                text: OEE,
                data: [
                    { name: 'Used', y: quality1, color: '#97FFFF' },//linear-gradient('#97FFFF') },
                    { name: 'Rest', y: quality, color: '#3d3d3d' }
                ],
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000'
                }
            }]
    });
}