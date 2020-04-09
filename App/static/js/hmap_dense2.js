function draw_dense2(id) { // put everything inside, it will be run once
    var cols = 16;
    var svg = svg_dense2
    var svg_avg = svg_dense2_avg
    var act_max = Number.NEGATIVE_INFINITY;
    var act_min = Number.POSITIVE_INFINITY;
    var diverging = true

    d3.csv("endpoint/data_dense2.csv?id="+id, function (data) {
        if (data.length == 2){
            console.log(data);
        }

        if (data.length == 1024){
            // data = data.slice(512, 1024);
//            data = data.slice(0, 512); // we want instance, not class?
            diverging = false
        }

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

        if (!diverging){
            var newdata = data;
            data = data.slice(0, 512);
            newdata = newdata.slice(512, 1024);
            draw_heatmap(svg, data, myColor, "#hmap_dense2", act_min, act_max, "Dense layer 2")
            draw_heatmap(svg_avg, newdata, myColor, "#hmap_dense2_avg", act_min, act_max, "Average dense layer 2")
        }
        else {
            hide_average_heatmaps(2);
            draw_heatmap(svg, data, myColor, "#hmap_dense2", act_min, act_max, "Dense layer 2")
        }
    })
}