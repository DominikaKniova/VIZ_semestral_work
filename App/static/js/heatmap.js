function draw_heatmap(svg, data, color, html_element, act_min, act_max, description){
    var myXs = d3.map(data, function (d) {
        return d.x
    }).keys()

    var myYs = d3.map(data, function (d) {
        return d.y
    }).keys()

    var get_x = d3.scaleBand()
        .range([0, width_heatmap])
        .domain(myXs)
        .padding(0.05);

    var get_y = d3.scaleBand()
        .range([0, height_heatmap - margin_heatmap])
        .domain(myYs)
        .padding(0.05);

    var tooltip = d3.select(html_element) // create a tooltip
        .append("div")
        .style("opacity", 0)
        .attr("class", "tooltip")
        .style("background-color", "white")
        // .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
        .style("border", "solid")
        .style("border-width", "2px")
        .style("border-radius", "5px")
        .style("width", "60px")
        .style("height", "60px")
        .style("padding", "5px")

    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", "3px")
    }
    var mousemove = function (d) {
        tooltip
            .html("The exact value of<br>this cell is: " + d3.format('.3')(d.activation))
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
        d3.select(this)
            .style("stroke", "none")
            .style("opacity", 0.8)
    }

    svg.select('g')
        .selectAll("rect")
        .remove()

    svg.select('g')
        .selectAll("rect")
        .data(data)
        .enter()
        .append('rect')
        .attr("x", function (d,i) {
            return get_x(d.x)
        })
        .attr("y", function (d,i) {
            return get_y(d.y)
        })
        .attr("width", cell_size)
        .attr("height", cell_size)
        .style("fill", function (d) {
            return color(d.activation)
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 1)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    svg.selectAll("text").remove()

    svg.append("text")
        .attr("x", 0)
        .attr("y", height_heatmap-10)
        .style("font-size", fontsize)
        .text(description);

    svg.select('g') // act_min legend
        .append('rect')
        .attr("x", 50)
        .attr("y", function (d,i) {
            return height_heatmap + 10
        })
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function (d) {
            return color(act_min)
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 1)

    svg.append("text") // act_min legend
        .attr("x", 90)
        .attr("y", height_heatmap + 25)
        .style("font-size", fontsize-4)
        .text("min = "+d3.format('.3')(act_min));

    svg.select('g') // act_max legend
        .append('rect')
        .attr("x", 50)
        .attr("y", function (d,i) {
            return height_heatmap + 40
        })
        .attr("width", 20)
        .attr("height", 20)
        .style("fill", function (d) {
            return color(act_max)
        })
        .style("stroke-width", 4)
        .style("stroke", "none")
        .style("opacity", 1)

    svg.append("text") // act_max legend
        .attr("x", 90)
        .attr("y", height_heatmap + 55)
        .style("font-size", fontsize-4)
        .text("max = "+d3.format('.3')(act_max));

    svg.select('text').attr('x', function () {
        return svg.select('text').attr('x') + svg.select('g').node().getBBox().width / 2 - svg.select('text').node().getBBox().width / 2
    })
}

function draw_softmax_heatmap(svg, data, color, html_element,  description){
    var myXs = d3.map(data, function (d,i) {
            return i;
        }).keys()

    var get_y = d3.scaleBand()
        .range([0, height_softmax - margin_softmax])
        .domain(myXs)
        .padding(0.05);

    var tooltip = d3.select(html_element) // create a tooltip
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            // .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("width", "60px")
            .style("height", "60px")
            .style("padding", "5px")

    var mouseover = function (d) {
        tooltip
            .style("opacity", 1)
        d3.select(this)
            .style("stroke", "black")
            .style("stroke-width", "1px")
        // .style("opacity", 1)
    }
    var mousemove = function (d) {
        tooltip
            .html("The exact value of<br>this cell is: " +  d3.format('.3')(d.activation))
            .style("left", (d3.event.pageX + 10) + "px")
            .style("top", (d3.event.pageY) + "px")
    }
    var mouseleave = function (d) {
        tooltip
            .style("opacity", 0)
    }

    svg.select('g')
        .selectAll("rect")
        .remove()

    svg.select('g')
        .selectAll("rect")
        .data(data)
        .enter()
        .append('rect')
        .attr("y", function (d,i) {
            return get_y(i)
        })
        .attr("x", 0)
        .attr("width", softmax_cell_size)
        .attr("height", softmax_cell_size)
        .style("fill", function (d) {
            return color(d.activation)
        })
        .style("stroke-width", 1)
        .style("stroke", "black")
        .style("opacity", 0.8)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    var color2 = d3.scaleSequential()
        .interpolator(d3.interpolateRainbow)
        .domain([0, 9])

    svg.select('g').selectAll('text').remove()

    svg.append("text")
        .attr("x", 0)
        .attr("y", height_heatmap-10)
        .style("font-size", fontsize)
        .text(description);

    svg.select('g').append('g').attr('id', 'g_labels')
        .selectAll("rect")
        .data(data)
        .enter()
        .append('rect')
        .attr("y", function (d,i) {
            return get_y(i)
        })
        .attr("x", softmax_cell_size+5)
        .attr("width", 20)
        .attr("height", softmax_cell_size)
        .style("fill", function (d, i) {
            return color2(i)
        })
        .style("stroke-width", 1)
        // .style("stroke", "black")
        .style("opacity", 0.2)
        .on("mouseover", mouseover)
        .on("mousemove", mousemove)
        .on("mouseleave", mouseleave)

    svg.select('g')
        .selectAll("text")
        .data(data)
        .enter()
        .append('text')
        .attr("y", function (d,i) {
            return get_y(i) + 20
        })
        .attr("x", 40)
        .attr("width", softmax_cell_size)
        .attr("height", softmax_cell_size)
        .style("fill", function (d) {
            return color(d.activation)
        })
        .style("stroke-width", 1)
        .style("stroke", "black")
        .style("opacity", 0.8)
        .text(function (d, i) {
            return ""+i
        })

//    svg.append("text")
//        .attr("x", 0)
//        .attr("y", height_heatmap-10)
//        .style("font-size", fontsize)
//        .text(description);
}

function hide_average_heatmaps(layer){
    if (layer == 1){
        svg_dense1_avg.select('g')
            .selectAll("rect")
            .remove()
        svg_dense1_avg.selectAll("text").remove()
        return
    }
    if (layer == 2) {
        svg_dense2_avg.select('g')
            .selectAll("rect")
            .remove()
        svg_dense2_avg.selectAll("text").remove()
        return
    }
    if (layer == 3) {
        svg_softmax_avg.select('g')
            .selectAll("rect")
            .remove()
        svg_softmax_avg.selectAll("text").remove()
        return
    }
}