var width_left = 600;
var height_left = 600;
var width_heatmap = 300;
var height_heatmap = 300;
var midx = width_left/2;
var midy = height_left/2;
var mult = 200;
var margin_heatmap = 100;
var zoom = d3.zoom();
zoom.wheelDelta(function () { return -d3.event.deltaY * 0.03; }); // change zoom speed

var svg_left = d3.select("#plot") // append the svg object to the body of the page
    .append("svg")
    .attr("width", width_left)
    .attr("height", height_left)
    .call(zoom.on("zoom", function () {
        svg_left.attr("transform", d3.event.transform)
    }))
    .append("g")

d3.csv("Tmp/points.csv", function (data) {
    var data_x = [];
    var data_y = [];
    data.map(function (d) {
        data_x.push(+d.x);
        data_y.push(+d.y);
    })

    // console.log("data_x", data_x);
    // console.log("data_y", data_y);
    // console.log("d", data_x[0]);

    // svg_left.append('g') // draw points
    //     .selectAll("dot")
    //     .data(data)
    //     .enter()
    //     .append("circle")
    //     .attr("fill", "red")
    //     .attr("cx", function (d) { return d.x })
    //     .attr("cy", function (d) { return d.y })
    //     .attr("r", 3)
});


var svg_hmap1 = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width_left)
    .attr("height", height_left)
    .append("g")
    .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")");


d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function (data) {
    // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
    var myGroups = d3.map(data, function (d) {
        return d.group;
    }).keys()
    var myVars = d3.map(data, function (d) {
        return d.variable;
    }).keys()

    // holder.append("line")          // attach a line
    // .style("stroke", "black")  // colour the line
    // .attr("x1", 100)     // x position of the first end of the line
    // .attr("y1", 50)      // y position of the first end of the line
    // .attr("x2", 300)     // x position of the second end of the line
    // .attr("y2", 150);    // y position of the second end of the line

    // Build X scales and axis:
    var x = d3.scaleBand()
        .range([0, width_heatmap])
        .domain(myGroups)
        .padding(0.05);

    // Build Y scales and axis:
    var y = d3.scaleBand()
        .range([height_heatmap, 0])
        .domain(myVars)
        .padding(0.05);

    // Build color scale
    var myColor = d3.scaleSequential()
        .interpolator(d3.interpolateInferno)
        .domain([1, 100])

    var tooltip = d3.select("#my_dataviz") // create a tooltip
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        // .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("padding", "5px")

    // Three function that change the tooltip when user hover / move / leave a cell
    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", "3px")
            // .style("opacity", 1)
    }
    var mousemove = function (d) {
        tooltip
            .html("The exact value of<br>this cell is: " + d.value)
            .style("left", (d3.mouse(this)[0] + width_left) + "px")
            .style("top", (d3.mouse(this)[1]) + "px")
            // .style("position", 'fixed')
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    // add the squares
    svg_hmap1.selectAll()
        .data(data, function (d) {
            return d.group + ':' + d.variable;
        })
        .enter()
        .append("rect")
        .attr("x", function (d) {
            return x(d.group)
        })
        .attr("y", function (d) {
            return y(d.variable)
        })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth())
        .attr("height", y.bandwidth())
        .style("fill", function (d) { return myColor(d.value) })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    // Add title to graph
    svg_hmap1.append("text")
        .attr("x", 0)
        .attr("y", -50)
        .attr("text-anchor", "left")
        .style("font-size", "22px")
    // .text("A d3.js heatmap");

    // Add subtitle to graph
    svg_hmap1.append("text")
        .attr("x", 0)
        .attr("y", -20)
        .attr("text-anchor", "left")
        .style("font-size", "14px")
        .style("fill", "grey")
        .style("max-width", 400)
    // .text("A short description");
})


// var svg_hmap2 = d3.select("#my_dataviz")
//     .append("svg")
//     .attr("width", width_left)
//     .attr("height", height_left)
//     .append("g")
//     .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")");
//
// d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function (data) {
//     // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'
//     var myGroups = d3.map(data, function (d) {
//         return d.group;
//     }).keys()
//     var myVars = d3.map(data, function (d) {
//         return d.variable;
//     }).keys()
//
//     // Build X scales and axis:
//     var x = d3.scaleBand()
//         .range([0, width_heatmap])
//         .domain(myGroups)
//         .padding(0.05);
//
//     // Build Y scales and axis:
//     var y = d3.scaleBand()
//         .range([height_left, 0])
//         .domain(myVars)
//         .padding(0.05);
//
//     // Build color scale
//     var myColor = d3.scaleSequential()
//         .interpolator(d3.interpolateInferno)
//         .domain([1, 100])
//
//     // create a tooltip
//     var tooltip = d3.select("#my_dataviz")
//         .append("div")
//         .style("opacity", 0)
//         .attr("class", "tooltip")
//         .style("background-color", "white")
//     // .style("border", "solid")
//     // .style("border-width", "2px")
//     // .style("border-radius", "5px")
//     // .style("padding", "5px")
//
//     // Three function that change the tooltip when user hover / move / leave a cell
//     var mouseover = function (d) {
//         tooltip
//             .style("opacity", 1)
//         d3.select(this)
//             .style("stroke", "black")
//             // .style("opacity", 1)
//     }
//     var mousemove = function (d) {
//         tooltip
//             .html("The exact value of<br>this cell is: " + d.value)
//             .style("left", (d3.mouse(this)[0] + 70) + "px")
//             .style("top", (d3.mouse(this)[1]) + "px")
//     }
//     var mouseleave = function (d) {
//         tooltip
//             .style("opacity", 0)
//         d3.select(this)
//             .style("stroke", "none")
//             .style("opacity", 0.8)
//     }
//
//     // add the squares
//     svg_hmap2.selectAll()
//         .data(data, function (d) {
//             return d.group + ':' + d.variable;
//         })
//         .enter()
//         .append("rect")
//         .attr("x", function (d) {
//             return x(d.group)
//         })
//         .attr("y", function (d) {
//             return y(d.variable)
//         })
//         .attr("rx", 4)
//         .attr("ry", 4)
//         .attr("width", x.bandwidth())
//         .attr("height", y.bandwidth())
//         .style("fill", function (d) { return myColor(d.value) })
//         .style("stroke-width", 4)
//         .style("stroke", "none")
//         .style("opacity", 0.8)
//         .on("mouseover", mouseover)
//         .on("mousemove", mousemove)
//         .on("mouseleave", mouseleave)
//
//     // Add title to graph
//     svg_hmap2.append("text")
//         .attr("x", 0)
//         .attr("y", -50)
//         .attr("text-anchor", "left")
//         .style("font-size", "22px")
//     // .text("A d3.js heatmap");
//
//     // Add subtitle to graph
//     svg_hmap2.append("text")
//         .attr("x", 0)
//         .attr("y", -20)
//         .attr("text-anchor", "left")
//         .style("font-size", "14px")
//         .style("fill", "grey")
//         .style("max-width", 400)
//     // .text("A short description");
// })


d3.csv("Data/vectors.csv", function (data) {
    data.forEach(function(d) {
        d.x = +d['# x'];
        d.y = +d.y;
    });

    // console.log(data)

    var color = d3.scaleSequential()
        .interpolator(d3.interpolateRainbow)
        .domain([1, 10])

    svg_left.append('g') // draw points
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        // .attr("fill", "red")
        .attr("cx", function (d) { return midx + mult*d.x })
        .attr("cy", function (d) { return midy + mult*d.y })
        .attr("r", 50)
        .style("opacity", 0.2)
        .style("fill", function (d, i) { return color(i) })
        // .style("fill", "url(#linear-gradient)")
        // .style("stroke", function (d, i) { return color(i) })
})

d3.csv("Data/points.csv", function (data) {
    data.forEach(function(d) {
        d.x = +d['# x'];
        d.y = +d.y;
        d.class = +d.class;
    });

    // console.log(data)

    var color = d3.scaleSequential()
        .interpolator(d3.interpolateRainbow)
        .domain([1, 10])

    svg_left.append('g') // draw points
        .selectAll("dot")
        .data(data)
        .enter()
        .append("circle")
        // .attr("fill", "red")
        .attr("cx", function (d) { return midx + mult*d.x })
        .attr("cy", function (d) { return midy + mult*d.y })
        .attr("r", 3)
        .style("opacity", 0.5)
        .style("fill", function (d) { return color(d.class) })
        // .style("fill", "url(#linear-gradient)")
        // .style("stroke", function (d, i) { return color(i) })
})