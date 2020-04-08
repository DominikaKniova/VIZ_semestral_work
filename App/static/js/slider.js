(function (){
    var slider_width = 200
    var onchange = function(d){
        d3.select('p#slider_value').text(d
          .map(d3.format('.2'))
          .join(' - ')
        );
        draw_points(d[0], d[1], checkbox_choices);
    }

    var slider = d3
    .sliderBottom()
    .min(0.0)
    .max(1.0)
    .width(slider_width)
    .tickFormat(d3.format('.2'))
//    .ticks(10)
    .ticks(slider_ticks)
    .default([slider_range_min, slider_range_max])
    .fill('#2196f3')
    .on('onchange', onchange);

    var g_slider = d3
    .select('div#slider')
    .append('svg')
    .attr('width', slider_width+60)
    .attr('height', 100)
    .append('g')
    .attr('transform', 'translate(30,30)');

    g_slider.call(slider);

    d3.select('p#slider_value').text(slider
      .value()
      .map(d3.format('.2'))
      .join(' - ')
    );
}());