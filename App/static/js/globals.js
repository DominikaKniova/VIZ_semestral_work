// these guys are visible everywhere
// these guys are visible everywhere

var width_left = 600;
var height_left = 600;
var midx = width_left/2;
var midy = height_left/2;
var mult = 200;
var zoom = d3.zoom();


var cell_size = 15;
var width_heatmap = 240;
var height_heatmap = 480;
var margin_heatmap = 50;
// var heatmap_window_height = 20;

var width_softmax = 100;
var height_softmax = 480;
var softmax_cell_size = 30;
var margin_softmax = 50;

fontsize = '20px'

//slider variables
var slider_range_min = 0.5;
var slider_range_max = 1.0;
var slider_ticks = 5;

zoom.wheelDelta(function () { // change zoom speed
        scale = -d3.event.deltaY * 0.03;
        return scale;
    });

    var zoomed = function () {
        svg_left.attr("transform", d3.event.transform)
        d3.selectAll("#puntiky")
            .attr("r", 3 / d3.event.transform.k)
    }

var svg_left = d3.select("#plot")
        .append("svg")
        .attr("width", width_left)
        .attr("height", height_left)
        // .call(zoom.on("zoom", function () {
        //     svg_left.attr("transform", d3.event.transform)
        // }))
        .call(zoom.on("zoom", zoomed))
        .on("dblclick.zoom", null)
        .append('g')
svg_left.append('g').attr('id','g_vectors')
svg_left.append('g').attr('id','g_dots')

var svg_softmax = d3.select("#hmap_softmax")
        .append("svg")
        .attr("width", width_softmax)
        .attr("height", height_softmax)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_softmax.append("g")

var svg_dense1 = d3.select("#hmap_dense1")
        .append("svg")
        .attr("width", width_heatmap)
        .attr("height", height_heatmap)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_dense1.append("g")

var svg_dense2 = d3.select("#hmap_dense2")
        .append("svg")
        .attr("width", width_heatmap)
        .attr("height", height_heatmap)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_dense2.append("g")