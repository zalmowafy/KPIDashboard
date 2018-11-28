//var acttimes = [];
//var actid = [];
//var timeSeries = [];
//var actIdSeries = [];
//var dataObj = {};
//var dataSource = [];
//var _maxColumns = 28;
//var _count = 0;
function createProcessChart() {
    //console.log(data);
    //  function convertToDuration(dataT) {
    // console.log(data);
    //  var completeData = JSON.parse(data);



    /* for (var i = 0; i < data.length; i++) {
        
         var arrTime = ((data[i].actuator_cycle_time).split(':'));
         var duration = (Number(arrTime[0] * 360000) + Number(arrTime[1] * 60000) + Number(arrTime[2] * 1000)) / 1000;
         //if (dataSource.length == _maxColumns) {
          ///   dataSource = [];
           //  actIdSeries = [];
           //  _count = 0;
             _count++;
             if (duration > 200) {
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
             var act_name = data[i].actuator_id;
             actIdSeries.unshift(act_name);
             dataSource.unshift(dataObj);
         //}
       //  else {
            
       //  }
         //console.log("Duration is " + duration);
         console.log("Length is " + dataSource.length);
       //  if (dataSource.length == _maxColumns) {
         //    dataSource = [];
             //actIdSeries = [];
           
         //}
         
         
         
     }*/
    //console.log("Datasourc is " + dataSource);
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
    $("#processchart").kendoChart({
        // dataSource: {
        //     data: [200, 300]
        //   },
        title: {
            text: "Process Cycle Time in ms / System cycle"
        },
        legend: {
            position: "top"
        },
        /*   seriesDefaults: {
               type: "column"
           },*/
        //seriesColors: ["blue", "orange"],
        // transitions: false,
        series: [{
            type: "column",
            //field: "duration",
            // categoryField: "actuatorname",
            //colorField: "color" //----should be prepared with dataset array
            data: [300, 200, 700, 900],
            color: "blue"
            // color: dataSource.color,
            //categoryField: dataSource.actuatorname
            // dataSource: localdataSource
            /* dataSource: new kendo.data.DataSource({
                 data: timeSeries
             })*/
        }, {
            type: "line",
            name: "Base Line",
            data: [200, 200, 500, 300],
            style: "smooth",
            color: "#ec5e0a"
        }],
        valueAxis: {
            labels: {
                max: 1800,
                format: "{0}K ms"
            },
            line: {
                visible: false
            },
            axisCrossingValue: 0
        },
        categoryAxis: {

            categories: ["Distribution", "Buffering", "Processing", "Handling"],
            min: 0,
            max: 10,
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
    //});
}

$(document).ready(createProcessChart);
$(document).bind("kendo:skinChange", createProcessChart);

//$(document).ready(


//createChart().series[0];