function createChart() {
    $("#OEEdonutchart").width(200).height(200).kendoChart({
        title: {
            position: "bottom",
            text: "OEE"
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
            startAngle: 180
        },
        series: [{

            name: "Process",
            data: [{
                category: "S1",
                value: 25,
                color: "#6600cc"
            }, {
                category: "S2",
                value: 75,
                color: "#330066"
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
    var text = "70%";
    $(".oee-inner-content").text(text);
}

$(document).ready(createChart);
$(document).bind("kendo:skinChange", createChart);