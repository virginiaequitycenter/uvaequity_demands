function updatestreams(data, input) {

    title_input = input;

    // Start Ridiculous Data Manipulation
    var DocCodes = d3.map(data.filter(function (el) {
        return el.DocTitle === title_input && el.Count > 0;
    }), function (d) {
        return d.Code;
    }).keys();

    //    console.log(DocCodes);

    for (i in data) {
        if (DocCodes.includes(data[i].Code)) {
            data[i].CodeUse = data[i].Code;
        } else {
            data[i].CodeUse = "Other";
        }
    }

    //   console.log(data);

    var CodeList = d3.map(data, function (d) {
        return d.CodeUse;
    }).keys();

    var Other = ["Other"];

    var diff = CodeList.filter(function (x) {
        return Other.indexOf(x) < 0
    });
    console.log(CodeList);
    console.log(diff);

    CodeList = [...Other, ...diff];

    //   console.log(CodeList);

    var counteddemands = d3.nest()
        .key((d) => d.YEAR)
        .key((d) => d.CodeUse)
        .rollup(function (d) {
            return d3.sum(d, function (g) {
                return g.Count;
            });
        })
        .entries(data);

    console.log(counteddemands);


    var longdemands = [];
    counteddemands.forEach(function (year) {
        year.values.forEach(function (yeardemand) {
            longdemands.push({
                Year: year.key,
                Demand: yeardemand.key,
                Count: yeardemand.value,
            });
        });
    });

    //   console.log(longdemands)

    var wide = d3.nest()
        .key(function (d) {
            return d.Year;
        }) // sort by key
        .rollup(function (d) { // do this to each grouping
            // reduce takes a list and returns one value
            // in this case, the list is all the grouped elements
            // and the final value is an object with keys
            return d.reduce(function (prev, curr) {
                prev.Year = curr.Year;
                prev[curr.Demand] = curr.Count;
                return prev;
            }, {});
        })
        .entries(longdemands) // tell it what data to process
        .map(function (d) { // pull out only the values
            return d.value;
        });

    //   console.log(wide)


    var stackedData = d3.stack()
        .keys(CodeList)
        (wide);

    console.log(stackedData);

    var area = d3.area()
        .x(function (d) {
            return xstreams(d.data.Year);
        })
        .y0(function (d) {
            return ystreams(d[0]);
        })
        .y1(function (d) {
            return ystreams(d[1]);
        }).curve(d3.curveMonotoneX);

    streamareas = streamssvg.selectAll(".myArea");
    streamareas.remove()
    
 thestreams =  streamssvg.selectAll(".myArea").data(stackedData).enter()
        .append("path")
        .attr("class", "myArea")
        .attr("id", (d) => d.key.split(" ").join("").replace("/", ""))
        .style("fill", function (d) {
            return colorstreams(d.key);
        })
        .style("opacity", function (d) {
            return opacitystreams(d.key);
        })
        .attr("d", area)
        .on("mouseover", mouseoverstream)
        .on("mousemove", mousemovestream)
        .on("mouseleave", mouseleavestream);

    //streamareas.exit().transition().remove();

    // Add Year Annotation
    var DocYear = d3.map(data.filter(function (el) {
        return el.DocTitle === title_input && el.Count > 0;
    }), function (d) {
        return d.YEAR;
    }).keys()[[0]];

    console.log(DocYear);

    var displayyear = DocYear - (1 * -1);


    d3.selection.prototype.moveToFront = function () {
        return this.each(function () {
            this.parentNode.appendChild(this);
        });
    };

    var annotationline = streamssvg.selectAll(".annotationline")

    annotationline.moveToFront()
    annotationline.transition()
        .duration(1000)

        .attr("x1", xstreams(DocYear))
        .attr("x2", xstreams(DocYear));

    var display = title_input + " " + DocYear;
    // Add Title & Year Name Annotation

    var textannotationg = streamssvg.selectAll(".textannotationg");

    textannotationg.moveToFront();

    // Translate the g outside of the text
    textannotationg
        .transition()
        .duration(1000)
        .attr("transform",
            "translate(" + xstreams(displayyear) + "," + ystreams(140) + ")")
        .attr("class", "textannotationg")

    var textannotation = streamssvg.selectAll(".textannotation");

    // Calculate the text inside of it
    textannotation
        .text(display)
        .attr("y", 0)
        .attr("dy", .1)
        .attr("x", 0)
        .call(wrap, 100);
};




// This is the one that draws the control for the updater 

function DrawStreamsControl(Data) {

    var DocList = d3.map(Data, function (d) {
        return d.DocTitle;
    }).keys();

    
    
    var dochange = d3.select("#DocChange")
        .append("select")
        .classed("form-control", true)
        //   .classed("yearjumpselect", true)
        .on("change", function () {
            updatestreams(demands, this.value);
            console.log(this.value);
        });

    dochange.selectAll("option")
        .data(DocList)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d + " (" + d3.map(Data.filter(function(el) { return el.DocTitle == d}), (y) => y.YEAR).keys()[[0]] + ")");

    // .classed("tagoption", true);


}
