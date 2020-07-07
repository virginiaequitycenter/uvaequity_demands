var chorddata;

function drawchords(data, input_code) {

d3.select("#chords").selectAll("g").remove();
    
var chordsvg = d3.select("#chords")
    .append("g")
    .attr("transform", "translate(300,300)");
    
chorddata = data.filter(function (el) {
        return el.Code === input_code;
    });

    console.log(chorddata.Alumni)
    
 const indexByName = new Map;
 const  nameByIndex = new Map;
  const matrix = [];
  let n = 0;

  // Compute a unique index for each package name.
  chorddata.forEach(d => {
     if (!indexByName.has( d = d.Demographic) ) {
      nameByIndex.set(n, d);
      indexByName.set(d, n++);
    }
  });
    
   console.log(nameByIndex);

   var uselength = chorddata.length - 1;
    
    var i;
    var j;
    var array = []
    
    for (i = 0; i < chorddata.length; i++) {
      var usearray = []
        for (j = 0; j < chorddata.length; j++) {
            var name = nameByIndex.get(j)
            usearray[j] = +chorddata[[i]][name]
        }  
      array[i] = usearray
    };
        
    console.log(array);
    
    
var outerRadius = 210;

var innerRadius = 200;
    
var color = d3.scaleOrdinal(["#c33b5c", "#fc9c9c", "#953146", "#9b5464", "#cc9fa2", "#964d5a", "#bf7068"]);
    
var ribbon = d3.ribbon()
    .radius(innerRadius-10);  
    
var arc = d3.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);
    
var chord = d3.chord()
    .padAngle(.05)
    .sortSubgroups(d3.descending)
    .sortChords(d3.descending);

 const chords = chord(array);
      
 console.log (chords);
    
 const group = chordsvg.append("g")
    .selectAll("g")
    .data(chords.groups)
    .join("g");
    
group.append("path")
      .attr("fill", d => color(d.index))
      .attr("stroke", d => color(d.index))
       .attr("opacity", .5)
      .attr("d", arc);
    
 group.append("text")
      .each(d => { d.angle = (d.startAngle + d.endAngle) / 2; })
      .attr("dy", ".35em")
      .attr("x", 0)
      .attr("transform", d => `
        rotate(${(d.angle * 180 / Math.PI - 90)})
        translate(${innerRadius + 26})
        ${d.angle > Math.PI ? "rotate(180)" : ""}
      `)
      .attr("text-anchor", d => d.angle > Math.PI ? "end" : null)
      .text(d => nameByIndex.get(d.index))
      .call(wrap, 100)
     .attr("class", "labeltext");


 var tooltip = d3.select("#tooltip");
 var  opacityDefault = 0.8;

    
  chordsvg.append("g")
      .attr("fill-opacity", 0.67)
    .selectAll("path")
    .data(chords)
    .join("path")
    .attr("stroke", d => d3.rgb(color(d.source.index)).darker())
      .attr("fill", d => color(d.source.index))
      .attr("d", ribbon)
      .on("mouseover", mouseoverchord)
      .on("mousemove", mousemovechord)
    .on("mouseleave", mouseleavechord);
    

  return chordsvg.node();
    
}