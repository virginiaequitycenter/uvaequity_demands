var DemosNested;

function drawdemos(data) {

    DemosNested = d3.nest()
        .key((d) => d.Code)
        .entries(data); // Nest to the top level of organization – the Code

    
    
    
    var margin = {
            top: 100,
            right: 10,
            bottom: 10,
            left: 10
        },
        width = 460 - margin.left - margin.right,
        height = 460 - margin.top - margin.bottom,
        usewidth = width + margin.left + margin.right,
        useheight = height + margin.top + margin.bottom,
        innerRadius = 70,
        outerRadius = Math.min(width, height) / 2; // the outerRadius goes from the middle of the SVG area to the border

    var container = d3.select("#demographicviz");

    var demoboxes = container.selectAll(".demoboxes")
        .data(DemosNested)
        .enter()
        .append("div")
        .attr("class", "demoboxes");

    var demosvgs = demoboxes.append("svg")
        .attr("viewBox", "0 0 " + usewidth + " " + useheight)
        .attr("class", "svg-content")
         .attr("id", d => d.key)
    
    
    demosvgs.append("text").text(d => d.key).attr("y", 0).attr("dy", 1).attr("x", "50%").attr("class", "demostitles").call(wrap, 400);
        
  var  circlecontainers =  demosvgs.append("g")
             .attr("transform", "translate(" + (width / 2  )+ "," + (height / 2 + margin.top) + ")");

   var x = d3.scaleBand()
      .range([0, 2 * Math.PI])    // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
      .align(0)                  // This does nothing ?
      .domain(DemosNested[[0]].values.map(function(d) { return d.Demographic; }) )
      console.log(x)
    
function scaleRadial() {
  var domain = [0, 1],
      range = [0, 1];

  function scale(x) {
    var r0 = range[0] * range[0], r1 = range[1] * range[1];
    return Math.sqrt((x - domain[0]) / (domain[1] - domain[0]) * (r1 - r0) + r0);
  }

  scale.domain = function(_) {
    return arguments.length ? (domain = [+_[0], +_[1]], scale) : domain.slice();
  };

  scale.range = function(_) {
    return arguments.length ? (range = [+_[0], +_[1]], scale) : range.slice();
  };

  scale.ticks = function(count) {
    return d3.scaleLinear().domain(domain).ticks(count);
  };

  scale.tickFormat = function(count, specifier) {
    return d3.scaleLinear().domain(domain).tickFormat(count, specifier);
  };

  return scale;
}
    
    var y = scaleRadial()
      .range([innerRadius, outerRadius])   // Domain will be define later.
      .domain([0, d3.max(DemosNested[[1]].values.map(function(d){return +d.Percent;}))]); 
    
  circlecontainers.append("g")
    .selectAll("path")
    .data((d) => d.values)
    .enter()
    .append("path")
      .attr("fill", function(d){ return colorstreams(d.Code)})
    .attr("id", function(d){ return d.Code})
       .attr("opacity", .8)
      .attr("d", d3.arc()     // imagine your doing a part of a donut plot
          .innerRadius(innerRadius)
          .outerRadius(function(d) { return y(d.Percent); })
          .startAngle(function(d) { return x(d.Demographic); })
          .endAngle(function(d) { return x(d.Demographic) + x.bandwidth(); })
          .padAngle(.25)
          .padRadius(innerRadius))
         .on("mouseover", mouseoverdemos)
        .on("mousemove", mousemovedemos)
        .on("mouseleave", mouseleavedemos);
    
    
var totalcircle =  d3.select("#Legend").select("g");
    
    totalcircle
      .selectAll("titleg")
      .data(d = DemosNested[[0]].values)
      .enter()
      .append("g")
      .attr("class", "titleg")
        .attr("text-anchor", function(d) { return (x(d.Demographic) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start"; })
        .attr("transform", function(d) { return "rotate(" + ((x(d.Demographic) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")"+"translate(" + (y(-5)) + ",0)"; })
      .append("text")
        .text(function(d){return(d.Demographic)})
        .attr("transform", function(d) { return (x(d.Demographic) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)"; })
        .style("font-size", "35px")
        .attr("alignment-baseline", "middle")


    
    
}
