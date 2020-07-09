var mouseoverchord = function(d) {
    
    d3.select("#tooltipchord")
      .style("visibility","visible");
    
    var attribute =  d3.select(this);
 
   d3.selectAll(".chordribbons").style("opacity", .3);
    
   attribute
      .style("opacity", 1); 

}


var mousemovechord = function(d) {
    
    d3.select("#tooltipchord")
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY - 10 + "px")
  }

var mouseleavechord = function(d) {
  d3.select("#tooltipchord")
      .style("visibility","hidden");
      
   d3.selectAll(".chordribbons").style("opacity", .67);

    
  }