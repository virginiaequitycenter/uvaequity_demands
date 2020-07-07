var mouseoverchord = function(d) {
    
    d3.select("#tooltip")
      .style("visibility","visible");
    
    var attribute =  d3.select(this);
 
   attribute
      .style("border", "solid grey .0001px")
      .style("opacity", .5); 
    
    d3.select("#demandtext").text(d.Text + " " );
    
}


var mousemovechord = function(d) {
    
    d3.select("#tooltip")
     // .style("left", d3.event.pageX - 25 + "px")
      //.style("top", d3.event.pageY -110 + "px")

  }

var mouseleavechord = function(d) {
  d3.select("#tooltip")
      .style("visibility","hidden");
      
    d3.select(this)
      .style("border", "none")
      .style("opacity", 1)
    
  }