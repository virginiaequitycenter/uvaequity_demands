var mouseoverdemos = function(d) {
    
    d3.select("#tooltipchord")
      .style("visibility","visible");
    
   d3.select(this)
      .style("opacity", .5); 
    
    d3.select("#chordtext").text(d.Demographic + ": " + d.Count)

}


var mousemovedemos = function(d) {
    
    d3.select("#tooltipchord")
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY - 10 + "px")
  }

var mouseleavedemos = function(d) {
  d3.select("#tooltipchord")
      .style("visibility","hidden");
      
   d3.select(this)
      .style("opacity", .8); 
    
  }