var sumstat;
var stackedData;
var mygroup;
var title_input = "Student Body Referendum";
var colorstreams;
var opacitystreams;
var xstreams;
var ystreams;
var streamssvg;
var thestreams;


function streamgraph(data) {

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
    
    d3.select("#streams").selectAll("g")
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
     AllCodes = d3.map(data, function (d) {
        return d.Code;
    }).keys();

    //   console.log(data);

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
    
   var  diff = CodeList.filter(function(x) { return Other.indexOf(x) < 0 });
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


     stackedData = d3.stack()
        .keys(CodeList)
        (wide);

    console.log(stackedData);

    // Ridiculous Data Manipulation is OVER

   
     colorstreams = d3.scaleOrdinal()
        .domain(["Other", AllCodes ])
        .range(['#fde7da','#dfad89', '#683a20', '#dcb17d', '#bd7b45', '#6d3b20', '#f2d3b1', '#9d5d2d', '#ac7752', '#894f29', '#d39156', '#efd1b7', '#e2ad85',  '#dca77d', '#824f30', '#7d452c', '#a86b3f', '#e8bfa3']);

//    "#fde9de" "#fde7da" "#fde3cc" "#f2d3b1" "#fce1c6" "#efd1b7" "#f4cca8" "#e8bfa3" "#fad5b8" "#e9c39f" "#e8bc99" "#e2ad85" "#eeba93"
// "#dfad89" "#d9a57d" "#e4ac7c" "#dca77d" "#d59d6d" "#e7ae85" "#dcb17d" "#ca9262" "#d28f58" "#d39063" "#d39156" "#ac7752" "#b67849"
// "#bd7b45" "#c98256" "#ca875a" "#a86b3f" "#a65e23" "#9d5d2d" "#ab6939" "#894f29" "#9b5b35" "#824f30" "#7d452c" "#6d3b20" "#683a20"
// "#583218"
    
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
        .attr("d", area);
    
    // Add Year Annotation
    var DocYear = d3.map(data.filter(function (el) {
        return el.DocTitle === title_input && el.Count > 0;
    }), function (d) {
        return d.YEAR;
    }).keys()[[0]];

    console.log(DocYear);

    var displayyear = DocYear - (1 * -1);

    streamssvg
        .append("line")
        .attr("x1", xstreams(DocYear))
        .attr("x2", xstreams(DocYear))
        .attr("y1", ystreams(0))
        .attr("y2", ystreams(150))
        .attr("class", "annotationline");

    var display = title_input + " " + DocYear
    // Add Title & Year Name Annotation
    streamssvg
        .append("g")
        .attr("transform",
            "translate(" + xstreams(displayyear) + "," + ystreams(140) + ")")
        .attr("class", "textannotationg")
        .append("text")
        .attr("y", 0)
        .attr("dy", .1)
         .attr("x", 0)
        .text(display)
        .attr("class", "textannotation")
        .call(wrap, 100);
    
}

var AllCodes;
