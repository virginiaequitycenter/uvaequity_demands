var mouseoverstream = function(d) {
    
    d3.select("#tooltipchord")
      .style("visibility","visible");
    
    var attribute =  d3.select(this);
 
    
     var o = .1;
    
     opacitystreams = d3.scaleOrdinal()
        .domain(["Other", AllCodes])
        .range([0, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o]);
    
   d3.selectAll(".myArea").style("opacity", d => opacitystreams(d.key));
    
    
    var o = .8;
    
     opacitystreams = d3.scaleOrdinal()
        .domain(["Other", AllCodes])
        .range([0, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o]);  
    
  attribute
      .style("opacity", d => opacitystreams(d.key)); 

}


var mousemovestream = function(d) {
    d3.select("#tooltipchord")
      .style("left", d3.event.pageX + 10 + "px")
      .style("top", d3.event.pageY - 10 + "px")
  }


var mouseleavestream = function(d) {
  d3.select("#tooltipchord")
      .style("visibility","hidden");
      
    
  var o = .8;
opacitystreams = d3.scaleOrdinal()
        .domain(["Other", AllCodes])
        .range([0, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o]);  
    
   d3.selectAll(".myArea").style("opacity", d => opacitystreams(d.key));

    
  }