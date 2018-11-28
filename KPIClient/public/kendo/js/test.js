var acttimes = [];
var actid = [];
var timeSeries = [];
var actIdSeries = [];
var aBaseline = [];
var dataObj = {};
var dataSource = [];

function createChart(data) {
    
    console.log("client data is  " + data, data.length);
    //console.log(data[0]);
  /*  if (data.length == 1) {
        console.log(data);
        console.log(data[0]);
        var dataObjTemp = JSON.parse(JSON.stringify(data[0]));
        console.log(dataObjTemp, dataObjTemp[0], dataObjTemp.aCycleTime);
        var arrTime = ((dataObjTemp.aCycleTime).split(':'));
        var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
       // _count++;
        if (duration > 20) {
            dataObj = {
                "duration": duration,
                "color": "red"
                // "actuatorname": _count + data[i].actuator_name
            };
        }
        else {
            dataObj = {
                "duration": duration,
                "color": "blue"
                // "actuatorname": (_count + 1) + data[i].actuator_name
            };
        }
        var baseLine = dataObjTemp.actuator_baseline;
        var act_name = dataObjTemp.actuator_name;
        actIdSeries.unshift(act_name);
        dataSource.unshift(dataObj);
        aBaseline.unshift(baseLine);
      
        console.log("Length is " + dataSource.length);

    }

    else {*/
    for (var i = 0; i < data.length; i++) {
        if (dataSource.length == 50) {
            dataSource = [];
            aBaseline = [];
            actIdSeries = [];
        }
       
            console.log(data[i]);
            var baseLine = data[i].actuator_baseline;
            var act_name = data[i].actuator_name;
            
            var arrTime = ((data[i].MotionDuration).split(':'));
            var duration = Number(arrTime[0] * 3600) + Number(arrTime[1] * 60) + Number(arrTime[2]);
            console.log(duration);
           if (duration > 0) {
                actIdSeries.push(act_name);
                console.log(actIdSeries);
               aBaseline.push(baseLine);
               if (duration > baseLine) {
                   console.log("INSIDE IF!");
                   dataObj = {
                       "duration": duration,
                       "color": "#D10830"
                       // "actuatorname": _count + data[i].actuator_name
                   };

               }
               else {
                   // if (duration > 0) {
                   console.log("INSIDE ELSE!");
                   dataObj = {
                       "duration": duration,
                       "color": "#223A5C"
                       // "actuatorname": (_count + 1) + data[i].actuator_name
                   };
                   // }


               }


               dataSource.push(dataObj);

               console.log("Length is " + dataSource.length);




           }
            
        }
   
   // }
    console.log("Datasource is " + dataSource);
        //timeSeries = acttimes.reverse();
        //actIdSeries = actid.reverse();
       // var localdataSource = new kendo.data.DataSource({
         //   data: timeSeries
        //});
   /* var dataTest = [{
        "duration": 130,
        "color": "blue",
        "actuatorname": 12
    }, {
            "duration": 120,
            "color": "blue",
            "actuatorname": 13
        }
    ]*/

    //console.log(dataTest);
//console.log("CTUATOR TIMES" + timeSeries);
   // $(document).ready(function () { 
    $("#chart").kendoChart({
           dataSource: {
               data: dataSource
            },
            title: {
                text: "System Heartbeat"
            },
            legend: {
                position: "top"
            },
            seriesDefaults: {
              //  gap: 0.5,
                width: 1
            },
            //seriesColors: ["blue", "orange"],
            transitions: false,
            series: [{
                type: "column",
               field: "duration",
              // categoryField: "actuatorname",
                colorField: "color",
                width: 1,
                spacing: 0.2,
               // gap: 0
                //----should be prepared with dataset array
               // data: dataSource.duration,
               // color: dataSource.color,
                //categoryField: dataSource.actuatorname
               // dataSource: localdataSource
                /* dataSource: new kendo.data.DataSource({
                     data: timeSeries
                 })*/
            }, {
                    type: "line",
                    style: "smooth",
                 name: "Base Line",
                    data: aBaseline,
                // dashType: "dot",
                 color: "#ec5e0a"
            }],
        valueAxis: {
            majorGridLines: {
                visible: true
            },
                labels: {
                    max: 1800,
                    format: "{0}K ms"
                },
                line: {
                    visible: true
                },
                axisCrossingValue: 0
            },
            categoryAxis: {
                majorGridLines: {
                    visible: false
                },
                categories: actIdSeries,
                min: 0,
                max: 50,
                line: {
                    visible: true
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
    //});
}
    


//$(document).ready(


//createChart().series[0];