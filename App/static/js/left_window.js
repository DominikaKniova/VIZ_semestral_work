function draw_points(){
    var svg = svg_left
    d3.csv("endpoint/ids.csv?min="+slider_range_min+"&max="+slider_range_max+"&checkbox="+checkbox_choices.join('')+'&hideCorrect='+(hideCorrect | 0), function (data) {
        // console.log(data)
        data.forEach(function (d) {
            d.id = +d.id;
        });
        console.log(data)

        var color = d3.scaleSequential()
            .interpolator(d3.interpolateRainbow)
            .domain([0, 9])

        var tooltip2 = d3.select("#plot") // create a tooltip
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("width", "60px")
            .style("height", "20px")
            .style("border-radius", "5px")
            .style("padding", "5px")

        var mouseover = function () {
            tooltip2.style("opacity", 1);
        }
        var mousemove = function (d) {
            tooltip2
                .html("class is: " + all_points[d.id].class)
                .style("opacity", 1)
                .style("left", (d3.event.pageX + 20) + "px")
                .style("top", (d3.event.pageY) + "px")
                .append("img")
                .attr("src","/endpoint/image?id="+d.id)
            d3.select(this)
            .attr("r", 10 / currentZoom)
            .style("opacity", 1.0)
        }
        var mouseleave = function () {
            tooltip2.style("opacity", 0);
            d3.select(this)
            .attr("r", 3 / currentZoom)
            .style("opacity", 0.5)
        }
        var mouseclick = function (d) {
            draw_softmax(d.id)
            draw_dense1(d.id)
            draw_dense2(d.id)
        }

        svg.select('#g_dots').selectAll("circle").remove();
        svg.select('#g_dots').selectAll("circle").data(data).enter()
            .append("circle")
            .attr('id', 'puntiky')
            .attr("cx", function (d) {
                return midx + mult * all_points[d.id].x
            })
            .attr("cy", function (d) {
                return midy + mult * all_points[d.id].y
            })
            .attr("r", 3)
            .style("opacity", 0.5)
            .style("fill", function (d) {
                return color(all_points[d.id].class)
            })
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)
            .on("click", mouseclick)
    })
}

(function () { // everything inside is called ONCE
    var svg = svg_left;
    d3.csv("endpoint/vectors.csv", function (data) {
        data.forEach(function (d) {
            d.x = +d.x;
            d.y = +d.y;
        });

        var color = d3.scaleSequential()
            .interpolator(d3.interpolateRainbow)
            .domain([0, 9])

        var defs = svg.append("defs"); // this adds radial gradient color to big circles (turned out it is not really noticeable :D)
        for(var i = 0; i < 10; i++) {
            defs.append("radialGradient")
                .attr("id", "sun-gradient" + i)
                // .attr("cx", "50%")	//not really needed, since 50% is the default
                // .attr("cy", "50%")	//not really needed, since 50% is the default
                // .attr("r", "50%")	//not really needed, since 50% is the default
                .selectAll("stop")
                .data([
                    {offset: "0%", color: (function(){
                        c = d3.color(color(i))
                        return d3.rgb(c.r, c.g, c.b, 0.5)
                    })()},
                    {offset: "50%", color: (function(){
                        c = d3.color(color(i))
                        return d3.rgb(c.r, c.g, c.b, 0.3)
                    })()},
                    {offset: "100%", color: (function(){
                        c = d3.color(color(i))
                        return d3.rgb(c.r, c.g, c.b, 0)
                    })()},
                ])
                .enter().append("stop")
                .attr("offset", function (d) {
                    return d.offset;
                })
                .attr("stop-color", function (d) {
                    return d.color;
                });
        }

        var tooltip = d3.select("#plot")
            .append("div")
            .style("opacity", 0)
            .attr("class", "tooltip")
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("width", "40px")
            .style("height", "30px")
            .style("padding", "5px")

        var mouseover = function(d, i){
                tooltip
                .html("Class " + i)
                .style("opacity", 1)
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY) + "px")
        }

        var mouseleave = function(){
            tooltip.style("opacity", 0)
        }

        svg
            .select('#g_vectors')
            .selectAll('circle')
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
                return midx + mult * d.x
            })
            .attr("cy", function (d) {
                return midy + mult * d.y
            })
            .attr("r", 50)
//            .on("mouseover", mouseover)
//            .on("mouseleave", mouseleave)
            .style("fill", function(d,i){
                return "url(#sun-gradient"+i+')'
            });
        // .style("stroke", function (d, i) { return color(i) })
    })

    draw_points();
}()); // immediately calls the function