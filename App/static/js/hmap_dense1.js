function draw_heatmap(data, color ){
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

        var tooltip = d3.select("#hmap_dense1")
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
            // .style("opacity", 1)
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
                return myColor(d.activation)
            })
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        svg.select("text").remove()

        svg.append("text")
            .attr("x", 0)
            .attr("y", height_heatmap-10)
            .style("font-size", fontsize)
            .text("Dense layer 1");

        svg.select('text').attr('x', function () {
            return svg.select('text').attr('x') + svg.select('g').node().getBBox().width / 2 - svg.select('text').node().getBBox().width / 2
        })
}

function draw_dense1(id) { // put everything inside, it will be run once
    var cols = 16
    var svg = svg_dense1
    var svg_avg = svg_dense1_avg
    var act_min = Number.POSITIVE_INFINITY;
    var act_max = Number.NEGATIVE_INFINITY;
    var diverging = true
    var data_avg = []

    d3.csv("endpoint/data_dense1.csv?id="+id, function (data) {

        data.forEach(function (d,i) {
            d.activation = +d.activation;
            if (d.activation > act_max){
            act_max = d.activation;
            }
            if (d.activation < act_min){
                act_min = d.activation;
            }
            d.x = (i % cols)
            d.y = (i - i % cols) / cols
        });

        if (data.length == 1024){
            data_avg = data.slice(512, 1024);
            data = data.slice(0, 512);
            diverging = false
        }

        if (!diverging){
            // var myColor = d3.scaleSequential()
            //     .interpolator(d3.interpolateViridis)
            //     .domain([min_act, max_act])

            var myColor= function (act) {
                return d3.rgb(...get_rgb(act, act_min, act_max, _viridis_data))
            }
        }
        else{
            // var myColor = d3.scaleSequential()
            //     .interpolator(d3.interpolateRdBu)
            //     .domain([act_min, act_max])

            var myColor= function (act) {
                return d3.rgb(...get_rgb(act, act_min, act_max, _RdBu_data))
            }
        }

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

        var tooltip = d3.select("#hmap_dense1")
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
            // .style("opacity", 1)
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
                return myColor(d.activation)
            })
            .style("stroke-width", 4)
            .style("stroke", "none")
            .style("opacity", 0.8)
            .on("mouseover", mouseover)
            .on("mousemove", mousemove)
            .on("mouseleave", mouseleave)

        svg.select("text").remove()

        svg.append("text")
            .attr("x", 0)
            .attr("y", height_heatmap-10)
            .style("font-size", fontsize)
            .text("Dense layer 1");

        svg.select('text').attr('x', function () {
            return svg.select('text').attr('x') + svg.select('g').node().getBBox().width / 2 - svg.select('text').node().getBBox().width / 2
        })
    })
}