var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;


actScale = 1;
zoomFactor = 0.1;

var zoom = d3.zoom();
zoom.wheelDelta(function () {
    return -d3.event.deltaY * 0.01;
});

// append the svg object to the body of the page
var svg = d3.select("#plot")
    .append("svg")
    .attr("style", "outline: 5px solid black;")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .call(zoom.on("zoom", function () {
       svg.attr("transform", d3.event.transform)
    }))
    // .call(zoom.on("zoom", redraw).scaleExtent([minZoom, maxZoom]))
    .append("g")
    .attr("transform",
        "translate(" + margin.left + "," + margin.top + ")");

var data_x = [];
var data_y = [];
console.log("info", "we are here");
d3.csv("data/points.csv", function (data) {
    data.map(function (d) {
        data_x.push(+d.x);
        data_y.push(+d.y);
    })

    console.log("data_x", data_x);
    console.log("data_y", data_y);
    console.log("d", data_x[0]);

    // draw points
    svg.append('g')
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        .attr("fill", "red")
        .attr("cx", function (d) {
            return d.x
        })
        .attr("cy", function (d) {
            return d.y
        })
        .attr("r", 3)
});