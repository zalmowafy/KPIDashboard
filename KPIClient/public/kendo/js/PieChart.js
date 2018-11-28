function createChart() {
    $("#piechart").kendoChart({
        
        legend: {
            visible: true,
            color: "#fff",
            //position: "bottom",
        },
        chartArea: {
            background: ""
        },
        seriesDefaults: {
            labels: {
                visible: true,
                background: "transparent",
                template: "#= category # (#= series.name #): #= value #%"
            }
        },
        series: [{
            type: "pie",
            startAngle: 250,
            data: [{
                category: "S1 - Tool Change",
                value: 25.0,
                color: "#6633FF"
            }, {
                category: "S2 - Setup",
                value: 25.0,
                    color: "#3333FF"
            }, {
                category: "S3 - Blocked",
                value: 25.0,
                    color: "#3399FF"
            }, {
                category: "S4 - Cycling",
                value: 25.0,
                    color: "#33CCFF"
                
            }]
        }],
        tooltip: {
            visible: true,
            template: "#= category # (#= series.name #): #= value #%"
        }
    });
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);