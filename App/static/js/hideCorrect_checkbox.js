// function uncheckAll(){/**/
//     d3.selectAll('#checkbox_hideCorrect').property('checked','false');
// }

(function (){
    var update = function(){
          cb = d3.select(this);
          hideCorrect = false;
          if(cb.property("checked")){
              hideCorrect = true;
            // checkbox_choices.push(+cb.property("value"));
          }
          console.log(hideCorrect)
            draw_points();
        }
        // if(checkbox_choices.length > 0){
//            update_points();
        // }
  d3.selectAll('#checkbox_hideCorrect').on("change", update);
  // uncheckAll();
}());