/*$(document).ready(function() {
        // OEE = chart.getOEE
    
    var availability1 = parseFloat($('#availability').text());
    var availability = 100 - availability1;
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
				innerSize: '75%',
                text: OEE,
				data: [
                    { name: 'Used', y: availability1, color: '#0000FF' },//linear-gradient('#97FFFF') },
                    { name: 'Rest', y: availability, color: '#3d3d3d' }
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



function draw(infoE) {
    //$(document).ready(function () {
    // OEE = chart.getOEE

    // });
    // 
    
    $('#try').text(infoE);
   
    var oee1 = parseFloat(infoE);
    var oee2 = 100 - oee1;
    //info.series[0].setData([oee1,100-oee1]);
    //alert(infoE);
    info = new Highcharts.Chart({

        chart: {
            renderTo: 'load',
            //width: 230,
           // height: 230,
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
            }]
    });
}
