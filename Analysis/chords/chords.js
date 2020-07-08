var chorddata;

function drawchords(data, input_code) {

    d3.select("#chords").selectAll("g").remove();

    var chordsvg = d3.select("#chords")
        .append("g")
        .attr("transform", "translate(300,300)");

    chorddata = data.filter(function (el) {
        return el.Code === input_code & el.RowSum > 0;
    });

    var demographiclist = d3.map(chorddata, function (d) {
        return d.Demographic;
    }).keys()

    console.log(demographiclist)

    const indexByName = new Map;
    const nameByIndex = new Map;

    const matrix = [];
    let n = 0;

    // Compute a unique index for each package name.
    chorddata.forEach(d => {
        if (!indexByName.has(d = d.Demographic)) {
            nameByIndex.set(n, d);
            indexByName.set(d, n++);
        }
    });

    console.log(nameByIndex);

    var i;
    var j;
    var array = []

    for (i = 0; i < chorddata.length; i++) {
        var usearray = []
        for (j = 0; j < chorddata.length; j++) {
            var name = nameByIndex.get(j)
            if (i == j) {
                usearray[j] = 0;
            } else {
                usearray[j] = +chorddata[[i]][name]
            }
        }
        array[i] = usearray
    };

    console.log(array);


    var outerRadius = 210;

    var innerRadius = 200;



    var ribbon = d3.ribbon()
        .radius(innerRadius - 10);

    var arc = d3.arc()
        .innerRadius(innerRadius)
        .outerRadius(outerRadius);

    var chord = customchord()
        .padAngle(.05);

    //    var chords = customChordLayout()
    //    .padding(.15)
    //    .sortChords(d3.descending)
    //    .matrix(array)

    const chords = chord(array);

    var colors = ["#c33b5c", "#fc9c9c", "#953146", "#9b5464", "#cc9fa2", "#964d5a", "#bf7068"];

  //  var colors = ["#51addf", "#c582aa", "#005b9d", "#35a993", "#cc373c", "#f7d783", "#fc9c9c"]


    var color = d3.scaleOrdinal()
        .domain(d3.range(7))
        .range(colors)


    // creating the fill gradient
    function getGradID(d) {
        return "linkGrad-" + d.source.index + "-" + d.target.index;
    }


    var grads = chordsvg.append("defs")
        .selectAll("linearGradient")
        .data(chords)
        .enter()
        .append("linearGradient")
        .attr("id", getGradID)
        .attr("gradientUnits", "userSpaceOnUse")
        .attr("x1", function (d, i) {
            return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2);
        })
        .attr("y1", function (d, i) {
            return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2);
        })
        .attr("x2", function (d, i) {
            return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2);
        })
        .attr("y2", function (d, i) {
            return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2);
        })

    // set the starting color (at 0%)

    grads.append("stop")
        .attr("offset", "0%")
        .attr("stop-color", function (d) {
            return color(d.source.index)
        })

    //set the ending color (at 100%)
    grads.append("stop")
        .attr("offset", "100%")
        .attr("stop-color", function (d) {
            return color(d.target.index)
        })



    console.log(chords);

    const group = chordsvg.append("g")
        .selectAll("g")
        .data(chords.groups)
        .join("g");

    group.append("path")
        .attr("fill", d => color(d.index))
        .attr("stroke", d => color(d.index))
        .attr("opacity", .9)
        .attr("d", arc)
        .attr("class", d => "path" + d.index)
        .on("mouseover", function (d) {
            var selection = "." + d3.select(this).attr("class")
            d3.selectAll(".chordribbons").style("opacity", .05)
            d3.selectAll(selection).style("opacity", 1)
        })
        .on("mouseleave", function (d) {
            d3.selectAll(".chordribbons").style("opacity", .67)
        });

    group.append("text")
        .each(d => {
            d.angle = (d.startAngle + d.endAngle) / 2;
        })
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

    chordsvg.append("g")
        .attr("fill-opacity", 1)
        .selectAll("path")
        .data(chords)
        .join("path")
// If you unhighlight the below line, it will fill with a gradient
//        .style("fill", function (d) {  return "url(#" + getGradID(d) + ")"; })

        //        .attr("stroke", d => d3.rgb(color(d.source.index)).darker())
        //        .attr("fill", d => color(d.source.index))
        .attr("fill-opacity", 0.67)

        .attr("d", ribbon)
        .attr("class", (d) => "path" + d.source.index + " " + "path" + d.target.index + " " + "chordribbons")
        .on("mouseover", function (d) {
            d3.select("#tooltipchord")
                .style("visibility", "visible");
            var attribute = d3.select(this);
            d3.selectAll(".chordribbons").style("opacity", .3);
            attribute
                .style("opacity", 1);
            d3.select("#chordtext").text(nameByIndex.get(d.source.index) + " & " + nameByIndex.get(d.target.index) + ": " + d.source.value);
        })
        .on("mousemove", mousemovechord)
        .on("mouseleave", mouseleavechord);

    return chordsvg.node();

}
