function draw_points(min, max){
    d3.csv("endpoint/points.csv?min="+min+"&max="+max, function (data) {

        data.forEach(function (d) {
            d.x = +d.x;
            d.y = +d.y;
            d.class = +d.class;
        });

        var color = d3.scaleSequential()
            .interpolator(d3.interpolateRainbow)
            .domain([1, 10])

        var tooltip2 = d3.select("#plot") // create a tooltip
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            // .attr("transform", "translate(" + margin_heatmap + "," + 0 + ")")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("width", "60px")
            .style("height", "20px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        var mouseover = function (d) {
            tooltip2
                .style("opacity", 1)
        }
        var mousemove = function (d) {
            tooltip2
                .html("class is: " + d.class)
                .style("opacity", 1)
                .style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY) + "px")
            // .style("position", 'fixed')
        }
        var mouseleave = function (d) {
            tooltip2
                .style("opacity", 0)
        }
        var mouseclick = function (d, i) {
            draw_softmax(i)
            draw_dense1(i)
            draw_dense2(i)
        }

        // update data
        var dots = svg_left.select("g").selectAll("circle").data(data);
        dots.exit().remove();
        dots.enter()
            .append("circle")
            // .attr("fill", "red")
            .attr('id', 'puntiky')
            .attr("cx", function (d) {
                return midx + mult * d.x
            })
            .attr("cy", function (d) {
                return midy + mult * d.y
            })
            .attr("r", 3)
            .style("opacity", 0.5)
            .style("fill", function (d) {
                return color(d.class)
            })
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .on("click", mouseclick)
    })

}

function call_me_maybe() { // put everything inside, it will be run once

    d3.csv("endpoint/vectors.csv", function (data) {
        data.forEach(function (d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        var color = d3.scaleSequential()
            .interpolator(d3.interpolateRainbow)
            .domain([1, 10])

        svg_left.append('g') // draw points
            .selectAll("dot")
            .data(data)
            .enter()
            .append("circle")
            // .attr("fill", "red")
            .attr("cx", function (d) {
                return midx + mult * d.x
            })
            .attr("cy", function (d) {
                return midy + mult * d.y
            })
            .attr("r", 50)
            .style("opacity", 0.2)
            .style("fill", function (d, i) {
                return color(i)
            })
        // .style("fill", "url(#linear-gradient)")
        // .style("stroke", function (d, i) { return color(i) })
    })

        draw_points(slider_range_min, slider_range_max);
}
call_me_maybe()