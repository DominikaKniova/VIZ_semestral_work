function call_me_maybe() { // put everything inside, it will be run once
    zoom.wheelDelta(function () { // change zoom speed
        scale = -d3.event.deltaY * 0.03;
        return scale;
    });

    var zoomed = function () {
        svg_left.attr("transform", d3.event.transform)
        d3.selectAll("#puntiky")
            .attr("r", 3 / d3.event.transform.k)
    }

    var svg_left = d3.select("#plot") // append the svg object to the body of the page
        .append("svg")
        .attr("width", width_left)
        .attr("height", height_left)
        // .call(zoom.on("zoom", function () {
        //     svg_left.attr("transform", d3.event.transform)
        // }))
        .call(zoom.on("zoom", zoomed))
        .on("dblclick.zoom", null)
        .append("g")


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

    d3.csv("endpoint/points.csv", function (data) {
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
            // console.log(d.class);
            // var json_data = [{"id": d.class, "class": d.class, "x": d.x, "y": d.y}];
            // $.post("/data_receiver", {js_data: JSON.stringify(json_data)});
        }

        svg_left.append('g') // draw points
            .selectAll("dot")
            .data(data)
            .enter()
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
        // .style("fill", "url(#linear-gradient)")
        // .style("stroke", function (d, i) { return color(i) })
    })
}
call_me_maybe()