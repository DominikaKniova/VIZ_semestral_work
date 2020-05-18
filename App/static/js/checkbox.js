function checkAll(){
    d3.selectAll('.checkb').property('checked','true');
}
function uncheckAll(){
    d3.selectAll('.checkb').property('checked','false');
}

// --checkbox handler--
(function (){
    // define on_change listener for checkboxes [0 ... 9]
    var update = function(){
        checkbox_choices = [];
        d3.selectAll(".checkb").each(function(d){
          cb = d3.select(this);
          if(cb.property("checked")){
            checkbox_choices.push(+cb.property("value"));
          }
        });
        if(checkbox_choices.length > 0){
            draw_points();
        }
      }
      d3.selectAll(".checkb").on("change", update);
      checkAll();

    // define on_change listener for hide_correct checkbox
      var update_hideCorrect = function(){
              cb = d3.select(this);
              hideCorrect = false;
              if(cb.property("checked")){
                  hideCorrect = true;
              }
                draw_points();
            }
      d3.selectAll('#checkbox_hideCorrect').on("change", update_hideCorrect);
}());