// these guys are visible everywhere

var width_left = 600;
var height_left = 600;
var midx = width_left/2;
var midy = height_left/2;
var mult = 200;
var margin_heatmap = 100;
var zoom = d3.zoom();

var width_heatmap = 300;
var height_heatmap = 300;
var heatmap_window_height = 20;

var svg_softmax = d3.select("#hmap_softmax")
        .append("svg")
        .attr("width", width_left)
        .attr("height", height_left)
        .append("g")
        .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
svg_softmax.append("g")

var svg_dense1 = d3.select("#hmap_dense1")
        .append("svg")
        .attr("width", width_left)
        .attr("height", height_left)
        .append("g")
        .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
svg_dense1.append("g")

var svg_dense2 = d3.select("#hmap_dense2")
        .append("svg")
        .attr("width", width_left)
        .attr("height", height_left)
        .append("g")
        .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")