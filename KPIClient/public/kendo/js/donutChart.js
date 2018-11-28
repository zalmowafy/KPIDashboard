function createChart() {
  /*  $("#OEEdonutchart").width(200).height(200).kendoChart({
        
        legend: {
            visible: false
        },
        chartArea: {
            background: "",
            height: 200
        },
        seriesDefaults: {
            type: "donut",
            holeSize: 40,
            startAngle: 180
        },
        series: [{
            
            name: "Process",
            data: [{
                category: "S1",
                value: 25,
                color: "#9de219"
            }, {
                category: "S2",
                value: 75,
                color: "#90cc38"
            }],
            labels: {
                visible: true,
                background: "transparent",
                position: "center",
                template: "#= category #: \n #= value#%"
            }
        }],
        tooltip: {
            visible: true,
            template: "#= category # (#= series.name #): #= value #%"
        }
    });*/
    //var text = "OEE";
   // $(".oee-inner-content").text(text);
    $("#donutchart").width(180).height(180).kendoChart({
        title: {
            position: "bottom",
            text: "Performance"
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: "",
            height: 200
        },
        seriesDefaults: {
            type: "donut",
            holeSize: 40,
            startAngle: 200
        },
        series: [{

            name: "Process",
            data: [{
                category: "S1",
                value: 25,
                color: "#cc99ff"
            }, {
                category: "S2",
                value: 70,
                    color: "#9933ff"
            }],
            labels: {
                visible: false,
                background: "transparent",
                position: "center",
                template: "#= category #: \n #= value#%"
            }
        }],
        tooltip: {
            visible: false,
            template: "#= category # (#= series.name #): #= value #%"
        }
    });
    var text = "80%"
    $(".per-inner-content").text(text);
    $("#availbilitydonutchart").width(140).height(140).kendoChart({
        title: {
            position: "bottom",
            text: "Availability"
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: "",
            height: 200
        },
        seriesDefaults: {
            type: "donut",
            holeSize: 30,
            startAngle: 220
        },
        series: [{

            name: "Process",
            data: [{
                category: "S1",
                value: 25,
                color: "#cc99ff"
            }, {
                category: "S2",
                value: 70,
                color: "#9933ff"
            }],
            labels: {
                visible: false,
                background: "transparent",
                position: "outsideEnd",
                template: "#= category #: \n #= value#%"
            }
        }],
        tooltip: {
            visible: false,
            template: "#= category # (#= series.name #): #= value #%"
        }
    });
    var text = "70%"
    $(".av-inner-content").text(text);
    $("#qulaitydonutchart").width(160).height(160).kendoChart({
        title: {
            position: "bottom",
            text: "Quality"
        },
        legend: {
            visible: false
        },
        chartArea: {
            background: "",
            height: 200
        },
        seriesDefaults: {
            type: "donut",
            holeSize: 35,
            startAngle: 200
        },
        series: [{

            name: "Process",
            data: [{
                category: "bad products",
                value: 20,
                color: "#cc99ff"
            }, {
                category: "Good products",
                value: 80,
                color: "#9933ff"
            }],
            labels: {
                visible: true,
                background: "transparent",
                position: "center",
                template: "#= value#%"
            }
        }],
        tooltip: {
            visible: true,
            template: "#= category # (#= series.name #): #= value #%"
        }
    });
    var text = "80%"
    $(".inner-content").text(text);
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);