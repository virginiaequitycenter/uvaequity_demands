//Taken from http://bl.ocks.org/mbostock/7555321
//Wraps SVG text	
function wrap(text, width) {
    text.each(function () {
        var text = d3.select(this),
            words = text.text().split(/\s+/).reverse(),
            word,
            line = [],
            lineNumber = 0,
            lineHeight = 1, // ems
            y = text.attr("y"),
            x = text.attr("x"),
            dy = parseFloat(text.attr("dy")),
            tspan = text.text(null).append("tspan").attr("x", x).attr("y", y).attr("dy", dy + "em");

        while (word = words.pop()) {
            line.push(word);
            tspan.text(line.join(" "));
            if (tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(" "));
                line = [word];
                tspan = text.append("tspan").attr("x", x).attr("y", y).attr("dy", ++lineNumber * lineHeight + dy + "em").text(word);
            }
        }
    });
} //wrap	




function wrap2(text) {
  text.each(function() {
    var text = d3.select(this),
        letters = text.text().split('').reverse(),
        letter,
        line = [],
        lineNumber = 0,
        lineHeight = 1.1, // ems
        y = text.attr("y"),
        dy = parseFloat(text.attr("dy")),
        textPath = text.text(null).append("textPath") // Add a textPath element
            .attr("startOffset", '50%')
            .style("text-anchor", "middle")
            .attr("xlink:href", function(d) { return "#outerArc" + d.i; }),
        tspan = textPath.append('tspan'), // Inslide textPath, add a tspan element, for offset feature later.
        path = d3.select(text.select('textPath').attr('xlink:href')); // Get the path to compute width of text later.
    var startLoc = /M(.*?)A/;
    var newStart = path.attr('d').match(startLoc)[1];
    var newEnd = path.attr('d').indexOf(' 0 0 0 ') > -1 
        ? path.attr('d').split(' 0 0 0 ')[1] 
        : path.attr('d').split(' 0 0 1 ')[1] ;
    
    // Compute the start/end coordinate points of the arc that the text will follow.
    var x1 = parseFloat(newStart.split(' ')[0]),
        y1 = parseFloat(newStart.split(' ')[1]),
        x2 = parseFloat(newEnd.split(' ')[0]),
        y2 = parseFloat(newEnd.split(' ')[1]);
    
    // Compute the length of the segment between the arc start/end points. This will be the
    // width which the labels should wrap when reaching it.
    var width = Math.sqrt(Math.pow((x2 - x1), 2) + Math.pow((y2 - y1), 2));
    
    // And then we go on (with slight changes) with the example from Mike Bostock 
    // from here https://bl.ocks.org/mbostock/7555321
    while (letter = letters.pop()) {
      line.push(letter);
      tspan.text(line.join(""));
      if (tspan.node().getComputedTextLength() > width) {
        line.pop();
        tspan.text(line.join(""));
        line = [letter];

        // Instead of adding only a tspan element, add a new textPath so that the wrapped 
        // letters will be aligned to center. Without it, the letters will start drawing 
        // from right with part of them invisible, like if the labels are not wrapped. 
        textPath = text.append("textPath")
            .attr("startOffset", '50%')
            .style("text-anchor", "middle")
            .attr("xlink:href", function(d) { return "#outerArc" + d.i; }),
          
        // Add a tspan element to offset the wrapped letters from the previous line
        tspan = textPath.append("tspan")
            .attr('dy', '1em')
            .attr('text-anchor', 'middle')
            .text(letter);
      }
    }
  });
}