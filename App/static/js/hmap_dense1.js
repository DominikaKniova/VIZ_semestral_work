function draw_dense1(id) {
    var cols = 16
    var svg = svg_dense1
    var svg_avg = svg_dense1_avg
    var act_min = Number.POSITIVE_INFINITY;
    var act_max = Number.NEGATIVE_INFINITY;
    var diverging = true

    d3.csv("endpoint/data_dense1.csv?id="+id, function (data) {
        if (data.length == 1024){
            diverging = false
        }
        // store data to structure
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

        if (!diverging){
            // sequential color mapping (mapping is defined in palettes.js)
            var myColor= function (act) {
                return d3.rgb(...get_rgb(act, act_min, act_max, _viridis_data))
            }
        }
        else{
            // diverging color mapping (mapping is defined in palettes.js)
            var myColor= function (act) {
                return d3.rgb(...get_rgb(act, act_min, act_max, _RdBu_data))
            }
        }

        if (!diverging){
            // specify data of current classification and the average
            var newdata = data;
            data = data.slice(0, 512);
            newdata = newdata.slice(512, 1024);
            // draw
            draw_dense_heatmap(svg, data, myColor, "#hmap_dense1", act_min, act_max, "Dense layer 1")
            draw_dense_heatmap(svg_avg, newdata, myColor, "#hmap_dense1_avg", act_min, act_max, "Average dense layer 1")
        }
        else {
            hide_average_heatmaps(1)
            draw_dense_heatmap(svg, data, myColor, "#hmap_dense1", act_min, act_max, "Dense layer 1")
        }
    })
}