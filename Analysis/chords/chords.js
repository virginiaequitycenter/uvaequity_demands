var chorddata;


function drawchords(data) {

var chordsvg = d3.select("#chords")
    .append("g")
    .attr("transform", "translate(220,220)");
    
chorddata = data.filter(function (el) {
        return el.Code === "Total";
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
            usearray[j] = chorddata[[i]][name]
        }  
      array[i] = usearray
    };
        
    console.log(array);


           
}