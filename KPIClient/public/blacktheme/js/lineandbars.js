	// LINE AND BARS CHARTS
function draw(data) {
    var actid = [];
    $(function () {
        //function draw() {
        function generateNumber(min, max) {
            min = typeof min !== 'undefined' ? min : 10000;
            max = typeof max !== 'undefined' ? max : 800000;

            return Math.floor((Math.random() * max) + min);
        }

        function convertToDuration(dataT) {
            var acttimes = [];
            
            // var i = 0;
            for (var i = 0; i < dataT.length; i++) {
                // var aDate = new Date(data[i].actuator_cycle_time);
                console.log(i);
                var arrTime = ((dataT[i].actuator_cycle_time).split(':'));
                console.log(arrTime);
                var duration = Number(arrTime[0] * 60000) + Number(arrTime[1] * 1000) + Number(arrTime[2]);
                console.log(duration);
                acttimes.push(duration);
                actid.push(dataT[i].actuator_test_id);

            }
            console.log(acttimes);
            return acttimes;
        }
        
        // console.log(acttimes);
        // var aDate = ne(data[i].actuator_cycle_time);
        
        //console.log(duration);
       // console.log(data.length);
       // console.log(data[i].actuator_cycle_time);
        var chart,
            categories = [data[0].actuator_test_id, data[1].actuator_test_id, data[2].actuator_test_id, data[3].actuator_test_id, data[4].actuator_test_id, data[5].actuator_test_id, data[6].actuator_test_id, data[7].actuator_test_id,
            data[8].actuator_test_id, data[9].actuator_test_id],
            //categories = convertToDuration(data).actid,
            //console.log(categories);
            //  serie1 = [10035, 484009, 559004, 110002],
            serie1 = convertToDuration(data),
            // serie2 = [10302, 485550, 559510, 119002],
            serie2 = convertToDuration(data);
           // series3 = convertToDuration(data);
           // $aapls;

        $(document).ready(function () {

            chart = new Highcharts.Chart({
                chart: {
                    renderTo: 'importantchart',
                    type: 'column',
                    backgroundColor: 'transparent',
                    height: 140,
                    marginLeft: 3,
                    marginRight: 3,
                    marginBottom: 0,
                    marginTop: 0
                },
                title: {
                    text: "Actuators Cycle Time/ Process"
                },
              /*  xAxis: {
                    categories: categories,
                    labels: {
                        enabled: true,
                        style: {
                            color: 'red'
                        }
                    }
                },*/
               xAxis: {
                    lineWidth: 3,
                    tickWidth: 3,
                    categories: categories,
                    labels: {
                        enabled: true,
                        style: {
                            color: 'red'
                        }
 
                    }
                    
                },
                yAxis: {
                    labels: {
                        enabled: true
                    },
                    gridLineWidth: 0,
                    title: {
                        text: 'Cycle Time',
                    },
                },
                series: [{
                    name: 'Actual Duration',
                    data: serie1
                }, {
                    name: 'Trending',
                    color: '#fff',
                    type: 'line',
                    data: serie2
                }],
                credits: {
                    enabled: false
                },
                legend: {
                    enabled: false
                },
                plotOptions: {
                    column: {
                        borderWidth: 0,
                        color: '#191970',
                        shadow: true
                    },
                    line: {
                        marker: {
                            enabled: true
                        },
                        lineWidth: 3
                    }
                },
                tooltip: {
                    enabled: true
                }
            });

           // setInterval(function () {
                chart.series[0].addPoint(generateNumber(), true, true);
            chart.series[1].addPoint(generateNumber(serie1[9], serie1[0]), true, true);
         //   }, 1000);



            setInterval(function () {
                $('.info-aapl span').each(function (index, elem) {
                    $(elem).animate({
                        height: generateNumber(1, 40)
                    });
                });

            }, 3000);
        });
        //}
    });
}
