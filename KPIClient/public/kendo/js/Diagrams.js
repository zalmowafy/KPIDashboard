var data = [{
    Type: "System",
    Name: "Festo Rig",
    colorScheme: "#1696d3",
    items: [{
        Type: "Process",
        Name: "S1- Distribution",
        colorScheme: "#ef6944",
        items: [{
            Type: "Actuator",
            Name: "Pusher",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Swivel Arm",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Vaccum",
            colorScheme: "#75be16"
        }]
    }, {
        Type: "Process",
        Name: "S2- Buffering",
        colorScheme: "#ef6944",
        items: [{
            Type: "Actuator",
            Name: "Conveyor Belt",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Separator/ Stopper",
            colorScheme: "#75be16"
        }]
    }, {
        Type: "Process",
        Name: "S3- Processing",
        colorScheme: "#ef6944",
        items: [{
            Type: "Actuator",
            Name: "Rotary Table",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Path Checker",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Driller",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Compressor",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Ejector",
            colorScheme: "#75be16"
        }]
    }, {
        Type: "Process",
        Name: "S4- Handling",
        colorScheme: "#ef6944",
        items: [{
            Type: "Actuator",
            Name: "Rotary Table",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Transfer Arm",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Grapper",
            colorScheme: "#75be16"
        }, {
            Type: "Actuator",
            Name: "Compressor",
            colorScheme: "#75be16"
        }]

    }]
}];

function visualTemplate(options) {
    var dataviz = kendo.dataviz;
    var g = new dataviz.diagram.Group();
    var dataItem = options.dataItem;

    g.append(new dataviz.diagram.Rectangle({
        width: 210,
        height: 75,
        stroke: {
            width: 0
        },
        fill: {
            gradient: {
                type: "linear",
                stops: [{
                    color: dataItem.colorScheme,
                    offset: 0,
                    opacity: 0.5
                }, {
                    color: dataItem.colorScheme,
                    offset: 1,
                    opacity: 1
                }]
            }
        }
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.Name,
        x: 85,
        y: 20,
        fill: "#fff"
    }));

    g.append(new dataviz.diagram.TextBlock({
        text: dataItem.Type,
        x: 85,
        y: 40,
        fill: "#fff"
    }));



    return g;
}

function createDiagram() {
    $("#diagram").kendoDiagram({
        dataSource: new kendo.data.HierarchicalDataSource({
            data: data,
            schema: {
                model: {
                    children: "items"
                }
            }
        }),
        layout: {
            type: "layered"
        },
        shapeDefaults: {
            visual: visualTemplate
        },
        connectionDefaults: {
            stroke: {
                color: "#979797",
                width: 2
            }
        }
    });

    var diagram = $("#diagram").getKendoDiagram();
    diagram.bringIntoView(diagram.shapes);
}

$(document).ready(createDiagram);