// --global variables--

// points plot variables
var width_left = 600;
var height_left = 600;
var midx = width_left/2;
var midy = height_left/2;
var mult = 200;
var zoom = d3.zoom();

var get_coord = function(x){
    return midx + mult * x;
}

//heatmap variables
var cell_size = 15;
var width_heatmap = 240;
var height_heatmap = 480;
var margin_heatmap = 50;

var width_softmax = 120;
var height_softmax = 480;
var softmax_cell_size = 30;
var margin_softmax = 50;

fontsize = '20px'

//slider variables
var slider_range_min = 0.5;
var slider_range_max = 1.0;
var slider_ticks = 5;
var currentZoom = 1;

//checkbox variables
var checkbox_choices = [0,1,2,3,4,5,6,7,8,9];
var hideCorrect = false;

// zoom handler
zoom.wheelDelta(function () {
        // change zoom speed
        scale = -d3.event.deltaY * 0.03;
        return scale;
    });

var zoomed = function () {
    currentZoom = d3.event.transform.k;
    svg_left.attr("transform", d3.event.transform)
    d3.selectAll("#puntiky")
        .attr("r", 3 / d3.event.transform.k)
}

// svg handler for points
var svg_left = d3.select("#plot")
        .append("svg")
        .attr("width", width_left)
        .attr("height", height_left)
        .call(zoom.on("zoom", zoomed))
        .on("dblclick.zoom", null)
        .append('g')
svg_left.append('g').attr('id','g_vectors')
svg_left.append('g').attr('id','g_dots')
svg_left.append('g').attr('id','g_lines')

// svg handlers for softmax layers
var svg_softmax = d3.select("#hmap_softmax")
        .append("svg")
        .attr("width", width_softmax + 60)
        .attr("height", height_softmax)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_softmax.append("g")

var svg_softmax_avg = d3.select("#hmap_softmax_avg")
        .append("svg")
        .attr("width", width_softmax + 60)
        .attr("height", height_softmax)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_softmax_avg.append("g")

// svg handlers for dense layers
var svg_dense1 = d3.select("#hmap_dense1")
        .append("svg")
        .attr("width", width_heatmap)
        .attr("height", height_heatmap + 60)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_dense1.append("g")

var svg_dense2 = d3.select("#hmap_dense2")
        .append("svg")
        .attr("width", width_heatmap)
        .attr("height", height_heatmap + 60)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")
svg_dense2.append("g")

var svg_dense1_avg = d3.select("#hmap_dense1_avg")
        .append("svg")
        .attr("width", width_heatmap)
        .attr("height", height_heatmap)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")

svg_dense1_avg.append("g")

var svg_dense2_avg = d3.select("#hmap_dense2_avg")
        .append("svg")
        .attr("width", width_heatmap)
        .attr("height", height_heatmap)
        .append("g")
        .attr("transform", "translate(" + 0 + "," + 0 + ")")

svg_dense2_avg.append("g")

// allows to move lines to the back, so they do not interfere with selection
d3.selection.prototype.moveToBack = function() {
    return this.each(function() {
        var firstChild = this.parentNode.firstChild;
        if (firstChild) {
            this.parentNode.insertBefore(this, firstChild);
        }
    });
};

// --prepare data before drawing--
var all_points = 0;
d3.csv("endpoint/points.csv", function (data) {
    data.forEach(function (d) {
        d.class = +d.class;
        d.x = +d.x;
        d.y = +d.y;
    });
    all_points = data;
    draw_points();
})

var global_vectors = 0;
d3.csv("endpoint/vectors.csv", function (data) {
    data.forEach(function (d) {
        d.x = +d.x;
        d.y = +d.y;
    });
    global_vectors = data;
    draw_vectors();
})

var all_softmax = 0;
d3.text("endpoint/all_softmax.csv", function (data) {
    function csvToArray (csv) {
        rows = csv.split("\n");
        return rows.map(function (row) {
            return row.split(",").map(Number);
        });
    }
    all_softmax = csvToArray(data)
})