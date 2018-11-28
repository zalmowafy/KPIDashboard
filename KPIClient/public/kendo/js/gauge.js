function createGauge() {
    $("#gauge").kendoRadialGauge({

        pointer: {
            value: $("#gauge-value").val()
        },

        scale: {
            minorUnit: 5,
            startAngle: -30,
            endAngle: 180,
            max: 180
        }
    });
}

$(document).ready(function () {
    createGauge();

    function updateValue() {
        $("#gauge").data("kendoRadialGauge").value($("#gauge-value").val());
    }

    if (kendo.ui.Slider) {
        $("#gauge-value").kendoSlider({
            min: 0,
            max: 180,
            showButtons: false,
            change: updateValue
        });
    } else {
        $("#gauge-value").change(updateValue);
    }


    $(document).bind("kendo:skinChange", function (e) {
        createGauge();
    });
});