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
var heatmap_window_height = 20;

var width_softmax = 100;
var height_softmax = 480;
var softmax_cell_size = 30;
var margin_softmax = 50;

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