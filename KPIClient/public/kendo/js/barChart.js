function createChart() {
    $("#barchart").kendoChart({
        
        legend: {
            position: "top"
        },
        seriesDefaults: {
            type: "column"
        },
        series: [{
            name: "Processes",
            data: [1.988, 2.733, 3.994, 3.464]
        }],
        valueAxis: {
            labels: {
                format: "{0}Sec"
            },
            line: {
                visible: false
            },
            axisCrossingValue: 0
        },
        categoryAxis: {
            categories: ["S1", "S2", "S3", "S4"],
            line: {
                visible: false
            },
            labels: {
                padding: { top: 2 }
            }
        },
        tooltip: {
            visible: true,
            format: "{0}%",
            template: "#= series.name #: #= value #"
        }
    });
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);