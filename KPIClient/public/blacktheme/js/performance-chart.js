function drawP(infoP) {
    //$(document).ready(function () {
    // OEE = chart.getOEE

    // });
    // 

    $('#per').text(infoP);

    //var oee1 = parseFloat(infoE);
    //var oee2 = 100 - oee1;
    var per1 = parseFloat(infoP);
    var per = 100 - per1;
    //info.series[0].setData([oee1,100-oee1]);
    //alert(infoE);
    info = new Highcharts.Chart({

        chart: {
            renderTo: 'spacing',
            width: 158,
            height: 158,
            //spacingLeft: 130,
            //spacingRight: 30,
            //position: centre,
            //align: 'right',
            margin: [0, 0, 0, 0],
            backgroundColor: null,
            plotBackgroundColor: 'none',

        },
        
        title: {
            text: null,
           // align: 'middle'
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
                    { name: 'Used', y: per1, color: '#97FFFF' },//linear-gradient('#97FFFF') },
                    { name: 'Rest', y: per, color: '#3d3d3d' }
                ],
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000'
                }
            }]
    });
}