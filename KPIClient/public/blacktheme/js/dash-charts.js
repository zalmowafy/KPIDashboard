/*** First Chart in Dashboard page ***/
//var chart = require('../../models/home/chart');


//console.log("ZEINAB" + socket);
//var OEE, avail;
//socket.on('completeData', function (data) {
   // OEE = data.OEE;
   // avail = data.Availability;
//});

/*function draw(infoE) {
//$(document).ready(function () {
    // OEE = chart.getOEE

    // });
   // alert(info);
    $('#try').text(infoE);
    var oee1 = parseFloat(infoE);
    var oee2 = 100 - oee1;
    //info.series[0].setData([oee1,100-oee1]);
   
    info = new Highcharts.Chart({
        
        chart: {
            renderTo: 'load',
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
                    { name: 'Used', y: oee1, color: '#97FFFF' },//linear-gradient('#97FFFF') },
                    { name: 'Rest', y: oee2, color: '#3d3d3d' }
                ],
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000'
                }
            }],

        chart: {
            renderTo: 'space',
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
                name: 'Availability',
                innerSize: '75%',
                data: [
                    { name: 'Used', y: 50, color: '#4033FF' },
                    { name: 'Rest', y: 50, color: '#3d3d3d' }
                ],
                dataLabels: {
                    enabled: false,
                    color: '#000000',
                    connectorColor: '#000000'
                }
            }]
    });
//});
}*/
        //}

        //$(document).alert(oee1);
   // });


    /*$(document).ready(function() {
            // OEE = chart.getOEE
        
                var quality1 = parseFloat($('#quality').text());
                var quality = 100 - quality1;
    alert(quality1);
    //info.series[0].setData([oee1,100-oee1]);
            info = new Highcharts.Chart({
                chart: {
                    renderTo: 'space',
                    margin: [0, 0, 0, 0],
                    backgroundColor: null,
                    plotBackgroundColor: 'none',
                            	
                },
            	
                title: {
                    text: null
                },
    
                tooltip: {
                    formatter: function() { 
                        return this.point.name +': '+ this.y +' %';
                        	
                    } 	
                },
                series: [
                    {
                    borderWidth: 2,
                    borderColor: '#F1F3EB',
                    shadow: false,	
                    type: 'pie',
                    name: 'Income',
                    innerSize: '65%',
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
            });*/

    //}

    //$(document).alert(oee1);
    //});


    /*** second Chart in Dashboard page ***/


//$(document).ready(function () {
function drawA(infoA) {
    // 
    
    $('#availability').text(infoA);
  //  var socket = io('http://127.0.0.1');
      //  socket.on('completeData', function (data) {
    //    $('#availability').text(data.Availability);
    var availability1 = parseFloat(infoA);
    var availability = 100 - availability1;
    //alert(infoA);
            info = new Highcharts.Chart({
           // $('#availability').highcharts({
                chart: {
                    renderTo: 'space',
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
                        name: 'Availability',
                        innerSize: '75%',
                        data: [
                            { name: 'Used', y: availability1, color: '#4033FF' },
                            { name: 'Rest', y: availability, color: '#3d3d3d' }
                        ],
                        dataLabels: {
                            enabled: false,
                            color: '#000000',
                            connectorColor: '#000000'
                        }
                    }]
            });

}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
   // });

    /*** third Chart in Dashboard page ***/

    /*$(document).ready(function() {
            // OEE = chart.getOEE
        
                var availability1 = parseFloat($('#availability').text());
                var availability = 100 - availability1;
    
            info = new Highcharts.Chart({
                chart: {
                    renderTo: 'load1',
                    margin: [0, 0, 0, 0],
                    backgroundColor: null,
                    plotBackgroundColor: 'none',
                            	
                },
            	
                title: {
                    text: null
                },
    
                tooltip: {
                    formatter: function() { 
                        return this.point.name +': '+ this.y +' %';
                        	
                    } 	
                },
                series: [
                    {
                    borderWidth: 2,
                    borderColor: '#F1F3EB',
                    shadow: false,	
                    type: 'pie',
                    name: 'Availability',
                    innerSize: '75%',
                    text: Availability,
                    data: [
                        { name: 'Used', y: availability1, color: '#97FFFF' },//linear-gradient('#97FFFF') },
                        { name: 'Rest', y: availability, color: '#3d3d3d' }
                    ],
                    dataLabels: {
                        enabled: false,
                        color: '#000000',
                        connectorColor: '#000000'
                    }
                }]
            });
    //alert(availability1);
        });*/


   /* $(document).ready(function () {
        // OEE = chart.getOEE

        var quality1 = parseFloat($('#quality').text());
        var quality = 100 - quality1;
        //info.series[0].setData([oee1,100-oee1]);
        info = new Highcharts.Chart({
            chart: {
                renderTo: 'loading',
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
                    text: Quality,
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

        //}

        //$(document).alert(oee1);
    });*/
