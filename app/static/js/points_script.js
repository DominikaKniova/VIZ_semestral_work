var margin = {top: 10, right: 30, bottom: 30, left: 50},
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#plot")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

  var data_x=[];
  var data_y=[];
  console.log("info", "we are here");
  d3.csv("data/points.csv", function(data){
        data.map(function(d){
            data_x.push(+d.x);
            data_y.push(+d.y);
        })

        console.log("data_x",data_x);
        console.log("data_y",data_y);
        console.log("d",data_x[0]);

    // draw points
    svg.append('g')
      .selectAll("dot")
      .data(data)
      .enter()
      .append("circle")
        .attr("fill", "red")
        .attr("cx", function(d) { return d.x })
        .attr("cy", function(d) { return d.y })
        .attr("r", 3)

});