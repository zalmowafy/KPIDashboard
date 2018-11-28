var cycles = [{ id: 1, value: 200, title: 'cycle_1' }, { id: 2, value: 250, title: 'cycle_2' }];

//var acttimes = [];
//var actid = [];
//var timeSeries = [];
//var actIdSeries = [];
//var dataObj = {};
//var dataSource = [];
//var _maxColumns = 28;
//var _count = 0;
function cycleHover(e) {
    console.log("hover event", e);

    //1- find za cycle item form cycles array
    var cycle = cycles.find((item) => item.title == e.category);

    //2- get za "indexes" of processes with cycle_id == cycle.id
    var childProcessesIndeces = processes.reduce((result, item, index) => {
        if (item.cycleId == cycle.id)
            result.push(index);
        return result;
    }, []);

    //3- get za processes kendoChart
    var p_chart = $("#processchart").data("kendoChart");

    //4- get our columns options
    var seriesData = p_chart.options.series[0].data;

    //5- loop over the series data
    for (var i = 0; i < seriesData.length; i++) {
        if (childProcessesIndeces.indexOf(i) >= 0) {
            seriesData[i].color = 'red';
        } else {
            seriesData[i].color = 'green';
        }
    }

    //6- refresh
    p_chart.refresh();
}

function createSysChart() {
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
    $("#syschart").kendoChart({
        // dataSource: {
        //     data: [200, 300]
        //   },
        title: {
            text: "Components Cycle Time in ms / Process"
        },
        legend: {
            position: "top"
        },
        /*   seriesDefaults: {
               type: "column"
           },*/
        //seriesColors: ["blue", "orange"],
        // transitions: false,
        dataSource: {
            data: cycles
        },
        series: [{
            type: "column",
            //field: "duration",
            // categoryField: "actuatorname",
            //colorField: "color" //----should be prepared with dataset array
            //data: [300, 200],
            field: "value",
            categoryField: "title",
            color: "blue"
            // color: dataSource.color,
            //categoryField: dataSource.actuatorname
            // dataSource: localdataSource
            /* dataSource: new kendo.data.DataSource({
                 data: timeSeries
             })*/
        },
        {
            type: "line",
            name: "Base Line",
            data: [200, 400],
            dashType: "dot",
            color: "#ec5e0a"
        }],

        seriesHover: cycleHover,

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

            categories: ["Cycle_1", "Cycle_2"],
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

$(document).ready(createSysChart);
$(document).bind("kendo:skinChange", createSysChart);

//$(document).ready(


//createChart().series[0];