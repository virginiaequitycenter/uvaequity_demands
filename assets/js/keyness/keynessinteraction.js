var mouseoverkey = function(d) {
    
    d3.select("#tooltipchord")
      .style("visibility","visible");
    
   d3.select(this)
      .style("opacity", .5); 
    
    d3.select("#chordtext").text(d.feature + ": Used " + d.count + " times")

}

var mousemovekey = function(d) {
    
    d3.select("#tooltipchord")
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY - 10 + "px")
  }

var mouseleavekey = function(d) {
  d3.select("#tooltipchord")
      .style("visibility","hidden");
      
   d3.select(this)
      .style("opacity", 1); 
    
  }