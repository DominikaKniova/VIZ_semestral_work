(function (){
    var update = function(){
        checkbox_choices = [];
        d3.selectAll(".check").each(function(d){
          cb = d3.select(this);
          if(cb.property("checked")){
            checkbox_choices.push(+cb.property("value"));
          }
        });

        if(checkbox_choices.length > 0){
            draw_points(slider_range_min, slider_range_max, checkbox_choices);
//          newData = data.filter(function(d,i){return choices.includes(d);});
//        } else {
//          newData = data;
        }
      }
  d3.selectAll(".checkb").on("change",update);
  update();
}());