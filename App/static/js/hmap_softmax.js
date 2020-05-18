function draw_softmax(id) {
    var svg = svg_softmax
    var svg_avg = svg_softmax_avg
    var diverging = true

    d3.csv("endpoint/data_softmax.csv?id="+id, function (data) {
        // store data to structure
        data.forEach(function (d) {
            d.activation = +d.activation;
        });

        if (data.length == 20){
            diverging = false
        }

        var myColor= function (act) {
            // sequential grayscale color mapping (mapping is defined in palettes.js)
            return d3.rgb(...get_rgb(act, 0.0, 1.0, _greys_data))
        }

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
    })
}