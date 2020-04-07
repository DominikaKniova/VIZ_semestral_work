function draw_dense2(id) { // put everything inside, it will be run once
    var cols = 16;

    d3.csv("endpoint/data_dense2.csv?id="+id, function (data) {
        // Labels of row and columns -> unique identifier of the column called 'group' and 'variable'

        if (data.length == 1024){
            draw_dense2_seq(id, data);
            return;
        }

        var min = Number.POSITIVE_INFINITY;
        var max = Number.NEGATIVE_INFINITY;

        data.forEach(function (d,i) {
            d.activation = +d.activation;
            if (d.activation > max){
            max = d.activation;
            }
            if (d.activation < min){
                min = d.activation;
            }
            d.x = (i % cols)
            d.y = (i - i % cols) / cols
        });

        var myXs = d3.map(data, function (d) {
            return d.x
        }).keys()
        var myYs = d3.map(data, function (d) {
            return d.y
        }).keys()

        // Build X scales and axis:
        var x = d3.scaleBand()
            .range([0, width_heatmap])
            .domain(myXs)
            .padding(0.05);

        var y = d3.scaleBand()
            .range([0, height_heatmap - margin_heatmap])
            .domain(myYs)
            .padding(0.05);

        // data.sort(function(a,b) {return a.z - b.z});
        // math.min()

        // Build color scale
        var myColor = d3.scaleSequential()
            // .interpolator(d3.interpolateInferno)
            .interpolator(d3.interpolateRdBu)
            .domain([min, max])

        var tooltip = d3.select("#hmap_dense2") // create a tooltip
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

        svg_dense2.select('g')
            .selectAll("rect")
            .remove()

        svg_dense2.select('g')
            .selectAll("rect")
            .data(data)
            .enter()
            .append('rect')
            .attr("x", function (d,i) {
                return x(d.x)
            })
            .attr("y", function (d,i) {
                return y(d.y)
            })
            .attr("width", cell_size)
            .attr("height", cell_size)
            .style("fill", function (d) {
                return myColor(d.activation)
            })
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        // Add title to graph
        svg_dense2.append("text")
            .attr("x", 0)
            .attr("y", -50)
            .attr("text-anchor", "left")
            .style("font-size", "22px")
        // .text("A d3.js heatmap");

        // Add subtitle to graph
        svg_dense2.append("text")
            .attr("x", 0)
            .attr("y", -20)
            .attr("text-anchor", "left")
            .style("font-size", "14px")
            .style("fill", "grey")
            .style("max-width", 400)
        // .text("A short description");
    })
}