var sumstat;
var stackedData;
var mygroup;
var opacitystreams;
var xstreams;
var ystreams;
var streamssvg;
var thestreams;

function streamgraph_all(data) {

    // set the dimensions and margins of the graph
    var margin = {
            top: 0,
            right: 100,
            bottom: 0,
            left: 50
        },
        width = 750 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    
    d3.select("#streams").selectAll("g").remove()
     streamssvg = d3.select("#streams")
        .append("g")
        .attr("transform",
            "translate(" + margin.left + "," + margin.top + ")");

     xstreams = d3.scaleLinear()
        .domain([1970, 2020])
        .range([0, width]);

    streamssvg.append("g")
        .attr("transform", "translate(0," + height * 0.9 + ")")
        .call(d3.axisBottom(xstreams).tickSize(-height * 0.01).tickFormat(d3.format("d"))).attr("class", "axistext")
        .select(".domain").remove();

    // Customization
    streamssvg.selectAll(".tick line").attr("stroke", "#b8b8b8");


     ystreams = d3.scaleLinear()
        .domain([0, 150])
        .range([height * 0.9, 0]);


    // Start Ridiculous Data Manipulation
//     AllCodes = d3.map(data, function (d) {
//        return d.Code;
//    }).keys();

    //   console.log(data);

    var DocCodes = d3.map(data, (d) => d.Code
    ).keys();

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
    
   var  diff = CodeList.filter(function(x) { return Other.indexOf(x) < 0 });
      console.log(CodeList);
      console.log(diff);

    CodeList = [ ...diff];
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


     stackedData = d3.stack()
        .keys(CodeList)
        (wide);

    console.log(stackedData);
    
   var o = .8;
    
     opacitystreams = d3.scaleOrdinal()
        .domain(["Other", AllCodes])
        .range([0, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o, o]);
    
    console.log(AllCodes);

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

 thestreams =  streamssvg
        .selectAll(".myArea")
        .data(stackedData)
        .enter()
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
    
//    // Add Year Annotation
//    var DocYear = d3.map(data.filter(function (el) {
//        return el.DocTitle === title_input && el.Count > 0;
//    }), function (d) {
//        return d.YEAR;
//    }).keys()[[0]];

//    console.log(DocYear);

//    var displayyear = DocYear - (1 * -1);

//    streamssvg
//        .append("line")
//        .attr("x1", xstreams(DocYear))
//        .attr("x2", xstreams(DocYear))
//        .attr("y1", ystreams(0))
//        .attr("y2", ystreams(150))
//        .attr("class", "annotationline");

//    var display = title_input + " " + DocYear
//    // Add Title & Year Name Annotation
//    streamssvg
//        .append("g")
//        .attr("transform",
//            "translate(" + xstreams(displayyear) + "," + ystreams(140) + ")")
//        .attr("class", "textannotationg")
//        .append("text")
//        .attr("y", 0)
//        .attr("dy", .1)
//         .attr("x", 0)
//        .text(display)
//        .classed("textannotation", true)
//        .classed("visualizationtext", true)
//        .call(wrap, 100);
//    

//   marks .style("background-color", (d) => colorstreams(d.firstChild.data) );
// marktexts = marks.text();
}
