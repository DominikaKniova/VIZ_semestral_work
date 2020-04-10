function draw_softmax(id) { // put everything inside, it will be run once
    var svg = svg_softmax
    var svg_avg = svg_softmax_avg
    var diverging = true

    d3.csv("endpoint/data_softmax.csv?id="+id, function (data) {
        data.forEach(function (d) {
            d.activation = +d.activation;
        });

        if (data.length == 20){
            diverging = false
        }

//        var myXs = d3.map(data, function (d,i) {
//            return i;
//        }).keys()
//
//        var get_y = d3.scaleBand()
//            .range([0, height_softmax - margin_softmax])
//            .domain(myXs)
//            .padding(0.05);

        // Build color scale
//        var myColor = d3.scaleSequential()
//            // .interpolator(d3.interpolateInferno)
//            .interpolator(d3.interpolateRdBu)
//            .domain([-2, 2])
        var myColor = d3.scaleLinear()
          .range(["white", "black"])
          .domain([0.0,1.0])

        if (!diverging){
            var newdata = data;
            data = data.slice(0, 10);
            newdata = newdata.slice(10, 20);
            draw_softmax_heatmap(svg, data, myColor, "#hmap_softmax",  "Softmax")
            draw_softmax_heatmap(svg_avg, newdata, myColor, "#hmap_softmax_avg",  "Average softmax")
        }
        else {
             hide_average_heatmaps(3)
             draw_softmax_heatmap(svg, data, myColor, "#hmap_softmax",  "Softmax")
        }

//        var tooltip = d3.select("#hmap_softmax") // create a tooltip
//            .append("div")
//            .style("opacity", 0)
//            .attr("class", "tooltip")
//            .style("background-color", "white")
//            // .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
//            .style("border", "solid")
//            .style("border-width", "2px")
//            .style("border-radius", "5px")
//            .style("width", "60px")
//            .style("height", "60px")
//            .style("padding", "5px")
//
//        var mouseover = function (d) {
//            tooltip
//                .style("opacity", 1)
//            d3.select(this)
//                .style("stroke", "black")
//                .style("stroke-width", "1px")
//            // .style("opacity", 1)
//        }
//        var mousemove = function (d) {
//            tooltip
//                .html("The exact value of<br>this cell is: " +  d3.format('.3')(d.activation))
//                .style("left", (d3.event.pageX + 10) + "px")
//                .style("top", (d3.event.pageY) + "px")
//        }
//        var mouseleave = function (d) {
//            tooltip
//                .style("opacity", 0)
//        }
//
//        svg.select('g')
//            .selectAll("rect")
//            .remove()
//
//        svg.select('g')
//            .selectAll("rect")
//            .data(data)
//            .enter()
//            .append('rect')
//            .attr("y", function (d,i) {
//                return get_y(i)
//            })
//            .attr("x", 0)
//            .attr("width", softmax_cell_size)
//            .attr("height", softmax_cell_size)
//            .style("fill", function (d) {
//                return myColor(d.activation)
//            })
//            .style("stroke-width", 1)
//            .style("stroke", "black")
//            .style("opacity", 0.8)
//            .on("mouseover", mouseover)
//            .on("mousemove", mousemove)
//            .on("mouseleave", mouseleave)
//
//        var color = d3.scaleSequential()
//            .interpolator(d3.interpolateRainbow)
//            .domain([0, 9])
//
//        svg.select('g').selectAll('text').remove()
//
//        svg.append("text")
//            .attr("x", 0)
//            .attr("y", height_heatmap-10)
//            .style("font-size", fontsize)
//            .text("Softmax");
//
//        svg.select('g').append('g').attr('id', 'g_labels')
//            .selectAll("rect")
//            .data(data)
//            .enter()
//            .append('rect')
//            .attr("y", function (d,i) {
//                return get_y(i)
//            })
//            .attr("x", softmax_cell_size+5)
//            .attr("width", 20)
//            .attr("height", softmax_cell_size)
//            .style("fill", function (d, i) {
//                return color(i)
//            })
//            .style("stroke-width", 1)
//            // .style("stroke", "black")
//            .style("opacity", 0.2)
//            .on("mouseover", mouseover)
//            .on("mousemove", mousemove)
//            .on("mouseleave", mouseleave)
//
//        svg.select('g')
//            .selectAll("text")
//            .data(data)
//            .enter()
//            .append('text')
//            .attr("y", function (d,i) {
//                return get_y(i) + 20
//            })
//            .attr("x", 40)
//            .attr("width", softmax_cell_size)
//            .attr("height", softmax_cell_size)
//            .style("fill", function (d) {
//                return myColor(d.activation)
//            })
//            .style("stroke-width", 1)
//            .style("stroke", "black")
//            .style("opacity", 0.8)
//            .text(function (d, i) {
//                return ""+i
//            })
//
//        svg.append("text")
//            .attr("x", 0)
//            .attr("y", height_heatmap-10)
//            .style("font-size", fontsize)
//            .text("Softmax");
    })
}