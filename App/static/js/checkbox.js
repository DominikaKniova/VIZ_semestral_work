function checkAll(){
    d3.selectAll('.checkb').property('checked','true');
}
function uncheckAll(){
    d3.selectAll('.checkb').property('checked','false');
}

(function (){
    var update = function(){
        checkbox_choices = [];
        d3.selectAll(".checkb").each(function(d){
          cb = d3.select(this);
          if(cb.property("checked")){
            checkbox_choices.push(+cb.property("value"));
          }
        });
        if(checkbox_choices.length > 0){
//            update_points();
            draw_points();
        }
      }
  d3.selectAll(".checkb").on("change", update);
  checkAll();
}());