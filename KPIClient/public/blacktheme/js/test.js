function createChart(data, boolUpdate) {
    //console.log(data);
    //  function convertToDuration(dataT) {
    console.log(boolUpdate);
    var completeData = JSON.parse(data);
    
        var acttimes = [];
         var actid = [];
        //console.log("Data coming is " + completeData[0].actuator_test_id, completeData.length, completeData[0].actuator_cycle_time);
       
        for (var i = 0; i < completeData.length; i++) {
            // var aDate = new Date(data[i].actuator_cycle_time);
           // console.log(i);
            var arrTime = ((completeData[i].actuator_cycle_time).split(':'));
           // console.log("Array is " + arrTime);
            var duration = (Number(arrTime[0] * 60000) + Number(arrTime[1] * 1000) + Number(arrTime[2]))/1000;
            //console.log("Duration is " + duration);
            acttimes.push(duration);
            actid.push(completeData[i].actuator_test_id);

        }
       // console.log(acttimes);
     //   return acttimes;
  //  }

   /* if (boolUpdate) {
        $("#chart").kendoChart({

            title: {
                text: "Components Cycle Time in ms / Process"
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
                type: "column"
            },
            seriesColors: ["blue", "orange"],
            series: [{
                name: "actual cycle time",
                data: acttimes
            }],
            valueAxis: {
                labels: {
                    format: "{0}K ms"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: 0
            },
            categoryAxis: {
                categories: actid,
                line: {
                    visible: false
                },
                labels: {
                    padding: { top: 30 }
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #"
            }
        });
    }*/
  //  else {
        $("#chart").kendoChart({

            title: {
                text: "Components Cycle Time in ms / Process"
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
                type: "column"
            },
            seriesColors: ["blue", "orange"],
            series: [{
                name: "actual cycle time",
                data: acttimes
            }, {
                name: "avg cycle time",
                data: [520, 340, 230, 48, 670, 830, 330, 200, 100, 70]
            }],
            valueAxis: {
                labels: {
                    format: "{0}K ms"
                },
                line: {
                    visible: false
                },
                axisCrossingValue: 0
            },
            categoryAxis: {
                categories: actid,
                line: {
                    visible: false
                },
                labels: {
                    padding: { top: 30 }
                }
            },
            tooltip: {
                visible: true,
                format: "{0}%",
                template: "#= series.name #: #= value #"
            }
        });
   // }
    
}

//createChart().series[0];