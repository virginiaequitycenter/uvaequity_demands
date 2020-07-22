var keynessdata;
var keynessroll;

function drawkeyness(data) {

    keynessdata =
        data.filter(function (el) {
            return el.source === "key";
        });


    var AllCodes = d3.map(data, function (d) {
        return d.code;
    }).keys().sort();

    var colorbars = d3.scaleOrdinal()
        .domain(["Other", AllCodes])
        .range(['#fde7da', '#dfad89', '#683a20', '#dcb17d', '#bd7b45', '#6d3b20', '#f2d3b1', '#9d5d2d', '#ac7752', '#894f29', '#d39156', '#efd1b7', '#e2ad85', '#dca77d', '#824f30', '#7d452c', '#a86b3f', '#e8bfa3'])


    // set the dimensions and margins of the graph
    var margin = {
            top: 0,
            right: 0,
            bottom: 0,
            left: 0
        },
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom,
        usewidth = width + margin.left + margin.right,
        useheight = height + margin.top + margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height - 10) / 2; // the outerRadius goes from the middle of the SVG area to the border 


    var vizbox = d3.select("#keynessviz");

    var keysvg = vizbox.append("svg")
        .attr("viewBox", "0 0 " + usewidth + " " + useheight)
        .attr("class", "svg-content")
        .attr("id", "keysvg")
        .append("g")
        .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 3 + margin.top) + ")");



    function scaleRadial() {
        var domain = [0, 1],
            range = [0, 1];

        function scale(x) {
            var r0 = range[0] * range[0],
                r1 = range[1] * range[1];
            return Math.sqrt((x - domain[0]) / (domain[1] - domain[0]) * (r1 - r0) + r0);
        }

        scale.domain = function (_) {
            return arguments.length ? (domain = [+_[0], +_[1]], scale) : domain.slice();
        };

        scale.range = function (_) {
            return arguments.length ? (range = [+_[0], +_[1]], scale) : range.slice();
        };

        scale.ticks = function (count) {
            return d3.scaleLinear().domain(domain).ticks(count);
        };

        scale.tickFormat = function (count, specifier) {
            return d3.scaleLinear().domain(domain).tickFormat(count, specifier);
        };

        return scale;
    }

    var x = d3.scaleBand()
        .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0) // This does nothing
        .domain(keynessdata.map(function (d) {
            return d.code_feature;
        }))

    var ymax = d3.max(keynessdata, d => d.freq);
    console.log(ymax);

    var y = scaleRadial()
        .range([innerRadius, outerRadius]) // Domain will be define later.
        .domain([0, ymax]);

    keysvg.append("g")
        .selectAll(".bars")
        .data(keynessdata)
        .enter()
        .append("path")
        .attr("fill", d => colorbars(d.code))
    .attr("class", "bars")
        .attr("d", d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(innerRadius)
            .outerRadius(function (d) {
                return y(d['freq']);
            })
            .startAngle(function (d) {
                return x(d.code_feature);
            })
            .endAngle(function (d) {
                return x(d.code_feature) + x.bandwidth();
            })
            .padAngle(0.02)
            .padRadius(innerRadius))

    keysvg.append("g")
        .selectAll("g")
        .data(keynessdata)
        .enter()
        .append("g")
        .attr("text-anchor", function (d) {
            return (x(d.code_feature) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
        })
        .attr("transform", function (d) {
            return "rotate(" + ((x(d.code_feature) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(d['freq']) + 2.5) + ",0)";
        })
        .append("text")
        .text(function (d) {
            return (d.feature)
        })
        .attr("transform", function (d) {
            return (x(d.code_feature) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
        })
        .classed("visualizationtext", true)
        .style("font-size", "10px")
        .attr("alignment-baseline", "middle")

    keynessroll = [];
    keynessdata.forEach(function (line) {
        keynessroll.push({
            code: line.code,
            x: x(line.code_feature),
            freq: line.freq < 23 ? 23 : line.freq
        });
    });

    keynessroll =   
        d3.nest()
        .key(d => d.code)
        .rollup(
//         v => d3.mean(v, d => d.x ),
        v => d3.max(v, d => +d.freq)
    )
        .entries(keynessroll);   


    var x2 = d3.scaleBand()
        .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0) // This does nothing
        .domain(keynessroll.map(function (d) {
            return d.key;
        }))
    
    
     keysvg.append("g")
        .selectAll(".bands")
        .data(keynessroll)
        .enter()
        .append("path")
        .attr("fill", "black")
        .attr("d", d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(innerRadius - 5 - 1)
            .outerRadius(innerRadius-5)
            .startAngle(function (d) {
                return x2(d.key);
            })
            .endAngle(function (d) {
                return x2(d.key) + x2.bandwidth();
            })
            .padAngle(0.05)
            .padRadius(innerRadius))
//       .attr("id", function(d,i) {return "arc" + i})
    
// append the blank ones
    keysvg.append("g")
        .selectAll(".outerlabels")
        .data(keynessroll)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("d", d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(d =>  y(d.value) + 17)
            .outerRadius(d => y(d.value) + 18)
            .startAngle(function (d) {
                return x2(d.key);
            })
            .endAngle(function (d) {
                return x2(d.key) + x2.bandwidth()*2;
            })
            .padAngle(0.05)
            .padRadius(innerRadius))
    .attr("id", function(d,i) {return "arc" + i})
    
    //Create the new invisible arcs and flip the direction for the bottom half labels

//    keysvg.append("g")
//        .selectAll("g")
//        .data(keynessroll)
//        .enter()
//        .append("g")
//        .attr("text-anchor", "middle"
////              function (d) {
////            return (x2(d.key) + x2.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
////        }
//             )
//        .attr("transform", function (d) {
//            return "rotate(" + ((x2(d.key) + x2.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + (y(0) -20 )  + ",0)";
//        })
//        .append("text")
//        .text(function (d) {
//            return (d.key)
//        })
//        .attr("transform", function (d) {
//            return (x2(d.code_feature) + x2.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(-270)" : "rotate(-270)";
//        }).attr("dy", 1)
//        .call(wrap, 400)
//        .classed("visualizationtext", true)
//        .style("font-size", "6px")
//        .attr("alignment-baseline", "middle")
    
    keysvg.selectAll(".arctext")
         .data(keynessroll)
        .enter()
        .append("text")
       .classed("visualizationtext", true)
      .attr("x", 2)   //Move the text from the start angle of the arc
    .attr("dy", -15) //Move the text down
//    .call(wrap, 40)
    .style("font-size", "11px")
//    .style("text-anchor", "middle")
    .append("textPath")
    .attr("xlink:href",function(d,i){return "#arc"+i;})
    .text(function(d){return d.key;});

}
