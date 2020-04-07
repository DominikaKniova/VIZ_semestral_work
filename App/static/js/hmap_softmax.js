function draw_softmax(id) { // put everything inside, it will be run once
    // d3.csv("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/heatmap_data.csv", function (data) {
    console.log('uaaa')
    d3.csv("endpoint/data_softmax.csv?id="+id, function (data) {
        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'

        data.forEach(function (d) {
            d.activation = +d.activation;
        });

        var myXs = d3.map(data, function (d,i) {
            return i;
        }).keys()

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, height_softmax - margin_softmax])
            .domain(myXs)
            .padding(0.05);

//         var y = d3.scaleBand()
//             .range([0, height_softmax])
//             .domain(myVars)
//             .padding(0.05);

        // Build color scale
//        var myColor = d3.scaleSequential()
//            // .interpolator(d3.interpolateInferno)
//            .interpolator(d3.interpolateRdBu)
//            .domain([-2, 2])
        var myColor = d3.scaleLinear()
          .range(["white", "black"])
          .domain([0.0,1.0])

        var tooltip = d3.select("#hmap_softmax") // create a tooltip
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
                .html("The exact value of<br>this cell is: " + Math.round(d.activation*1000)/1000)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY) + "px")
            // .style("position", 'fixed')
        }
        var mouseleave = function (d) {
            tooltip
                .style("opacity", 0)
            d3.select(this)
                .style("stroke", "none")
                .style("opacity", 0.8)
        }

        rects = svg_softmax.select('g')
            .selectAll("rect")
            .data(data)

        rects.exit().remove()

        rects.enter().append('rect')

        rects
            // .enter()
            // .append("rect")
            .attr("y", function (d,i) {
                return x(i)
            })
            .attr("x", 0)
//            .attr("rx", 4)
//            .attr("ry", 4)
            .attr("width", softmax_cell_size)
            .attr("height", softmax_cell_size)
            .style("fill", function (d) {
                return myColor(d.activation)
            })
            .style("stroke-width", 1)
            .style("stroke", "black")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        // Add title to graph
        svg_softmax.append("text")
            .attr("x", 0)
            .attr("y", -50)
            .attr("text-anchor", "left")
            .style("font-size", "22px")
        // .text("A d3.js heatmap");

        // Add subtitle to graph
        svg_softmax.append("text")
            .attr("x", 0)
            .attr("y", -20)
            .attr("text-anchor", "left")
            .style("font-size", "14px")
            .style("fill", "grey")
            .style("max-width", 400)
        // .text("A short description");
    })
}
// draw_softmax()