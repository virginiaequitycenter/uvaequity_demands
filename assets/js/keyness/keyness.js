var keynessdata;
var keynessroll;

function drawkeyness(data) {

    keynessdata =
        data.filter(function (el) {
            return el.source === "key";
        });

    // set the dimensions and margins of the graph
    var margin = {
            top: 250,
            right: 0,
            bottom: 0,
            left: 0
        },
        width = 1000 - margin.left - margin.right,
        height = 1000 - margin.top - margin.bottom,
        usewidth = width + margin.left + margin.right,
        useheight = height + margin.top + margin.bottom,
        innerRadius = 90,
        outerRadius = Math.min(width, height - 20) / 2; // the outerRadius goes from the middle of the SVG area to the border 


    var vizbox = d3.select("#keynessviz");

    var keysvg = vizbox.append("svg")
        .attr("viewBox", "0 0 " + usewidth + " " + useheight)
        .attr("class", "svg-content")
        .attr("id", "keysvg")
        .attr("aria-labelledby", "title")
        .append("g")
        .attr("transform", "translate(" + (width / 2 + margin.left) + "," + (height / 3 + margin.top) + ")");

    keysvg.append("title")
        .attr("id", "title")
        .attr("lang", "en")
        .text("A radial bar chart of the Most Distinctive words used in demand category. The top words by category include: (1) Abolition/Defunding: Police, Enforcement, VA, Prohibit. (2) Community Labor or Partnership: Community, Service, Charlottesville, Employee, Youth (3) Current Iniatives: Office, Americam, Cultural, Space. (4) Data Collection & Transparency: System, Position, Datum, Report. (5) Diversity in Student Leadership: Committee, Three, Response, Inclusion, COVID. (6) Financial Aid & Financing: Support, Graduate, Funding, Financial, Scholarship. (7) Living Wage: Wage, Worker, Benefit, Employee, Attorney. (8) Minority Faculty/Staff: Faculty, Staff, Recruitment, Position, Hiring, Retention. (9) Minority Student Recruitment: Student, Black, Graduate, Recruitment, Virginia. (10) Reparations: Descendant, Enslaved, Repayment, Earned, Fundraiser. (11) Research or Coursework: Course, Studies, Race, History. (12) School Climate: ED, Training, Policy, Mentoring, Statement. (13) Spaces & Places: Space, Grounds, Memorial, Plaque, Confederate" 
        )

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

    var ymax = d3.max(keynessdata, d => +d.freq);
    console.log(ymax);

    var y = scaleRadial()
        .range([innerRadius, outerRadius]) // Domain will be define later.
        .domain([0, ymax]);

    keysvg.append("g")
        .selectAll(".bars")
        .data(keynessdata)
        .enter()
        .append("path")
        .attr("fill", d => colorstreams(d.code_color))
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
//        .attr("opacity", .8)
        .on("mouseover", mouseoverkey)
        .on("mousemove", mousemovekey)
        .on("mouseleave", mouseleavekey)
    .attr("tabindex", 0);
    

    keysvg.append("g")
        .selectAll("g")
        .data(keynessdata)
        .enter()
        .append("g")
        .attr("text-anchor", function (d) {
            return (x(d.code_feature) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "end" : "start";
        })
        .attr("transform", function (d) {
            return "rotate(" + ((x(d.code_feature) + x.bandwidth() / 2) * 180 / Math.PI - 90) + ")" + "translate(" + 
//                (y(d['freq']) 
                (y(100)
                 + 5) + ",0)";
        })
        .append("text")
        .text(function (d) {
            return (d.feature)
        })
        .attr("transform", function (d) {
            return (x(d.code_feature) + x.bandwidth() / 2 + Math.PI) % (2 * Math.PI) < Math.PI ? "rotate(180)" : "rotate(0)";
        })
        .classed("visualizationtext", true)
        .style("font-size", "12.5px")
        .attr("alignment-baseline", "middle")
    
  // Inner X Axes    
//     keysvg.append("g")
//        .selectAll(".outerbands")
//        .data(keynessdata)
//        .enter()
//        .append("path")
//        .attr("fill", "black")
//        .attr("d", d3.arc() // imagine your doing a part of a donut plot
//            .innerRadius(y(100) + 2)
//            .outerRadius(y(100) + 2.5)
//            .startAngle(function (d) {
//                return x(d.code_feature);
//            })
//            .endAngle(function (d) {
//                return x(d.code_feature) + x.bandwidth();
//            })
//            .padAngle(0.05)
//            .padRadius(innerRadius))
  
    
    
    
    
// Data for the inner X axes
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
    
//The Scale Band for the Labels and axes 
    var x2 = d3.scaleBand()
        .range([0, 2 * Math.PI]) // X axis goes from 0 to 2pi = all around the circle. If I stop at 1Pi, it will be around a half circle
        .align(0) // This does nothing
        .domain(keynessroll.map(function (d) {
            return d.key;
        }))
    
    
        var arc = d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(d =>  y(d.value) + 90)
            .outerRadius(d => y(d.value) + 91)
            .startAngle(function (d) {
                return x2(d.key);
            })
            .endAngle(function (d) {
                return x2(d.key) + x2.bandwidth();
            })
            .padAngle(0.05)
            .padRadius(innerRadius);
    
// Inner X Axes    
     keysvg.append("g")
        .selectAll(".bands")
        .data(keynessroll)
        .enter()
        .append("path")
        .attr("fill", "black")
        .attr("d", d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(innerRadius - 2 - 1)
            .outerRadius(innerRadius-2)
            .startAngle(function (d) {
                return x2(d.key);
            })
            .endAngle(function (d) {
                return x2(d.key) + x2.bandwidth();
            })
            .padAngle(0.05)
            .padRadius(innerRadius))

    // append the blank ones
    keysvg.append("g")
        .selectAll(".outerlabels")
        .data(keynessroll)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("d",  arc)
            .each(function(d,i) {
        
        
        //A regular expression that captures all in between the start of a string
        //(denoted by ^) and the first capital letter L
        var firstArcSection = /(^.+?)L/;

        //The [1] gives back the expression between the () (thus not the L as well)
        //which is exactly the arc statement
        var newArc = firstArcSection.exec( d3.select(this).attr("d") )[1];
        //Replace all the comma's so that IE can handle it -_-
        //The g after the / is a modifier that "find all matches rather than
        //stopping after the first match"
        newArc = newArc.replace(/,/g , " ");
          var endarc = (((x2(d.key) + x2.bandwidth())/ (2* Math.PI)) *360);
        
         if ( endarc > 90  &  endarc < 270  ) {
        //Everything between the capital M and first capital A
        var startLoc = /M(.*?)A/;
        //Everything between the capital A and 0 0 1
        var middleLoc = /A(.*?)0 0 1/;
        //Everything between the 0 0 1 and the end of the string (denoted by $)
        var endLoc = /0 0 1 (.*?)$/;
        //Flip the direction of the arc by switching the start and end point
        //and using a 0 (instead of 1) sweep flag
        var newStart = endLoc.exec( newArc )[1];
        var newEnd = startLoc.exec( newArc )[1];
        var middleSec = middleLoc.exec( newArc )[1];

        //Build up the new arc notation, set the sweep-flag to 0
        newArc = "M" + newStart + "A" + middleSec + "0 0 0 " + newEnd;
    }//if
        
        
        //Create a new invisible arc that the text can flow along
        keysvg.append("path")
            .attr("class", "hiddenDonutArcs")
            .attr("id", "arc"+i)
            .attr("d", newArc)
            .style("fill", "none");
    } );
    
    keysvg.selectAll(".arctext")
         .data(keynessroll)
        .enter()
        .append("text")
       .classed("visualizationtext", true)
      .attr("x", 0)   //Move the text from the start angle of the arc
    .attr("dy", 1) //Move the text down
    .style("font-size", "20px")
    .append("textPath")
    .attr("startOffset","50%")
    .style("text-anchor","middle")
    .attr("xlink:href",function(d,i){return "#arc"+i;})
    .text(function(d){return d.key;});
    console.log( ((x2(keynessroll[[5]].key) + x2.bandwidth()*2)/ (2* Math.PI)) *360 ) ;

    
    keysvg.append("g")
//        .selectAll(".bands")
//        .data(keynessroll)
//        .enter()
        .append("path")
        .style("fill", "none")
        .attr("d", d3.arc() // imagine your doing a part of a donut plot
            .innerRadius(innerRadius - 40)
            .outerRadius(innerRadius - 41)
            .startAngle(-59/100*Math.PI)
            .endAngle(3*Math.PI)
            .padAngle(0.05)
//            .padRadius(innerRadius)
             ).style("visiblity", "hidden")
    .attr("id", "title")
    
    keysvg
        .append("text")
       .classed("visualizationtext", true)
//      .attr("x", 80)   //Move the text from the start angle of the arc
//    .attr("dy", ) //Move the text down
    .style("font-size", "20px")
    .append("textPath")
//    .attr("startOffset","50%")
//    .style("text-anchor","middle")
    .attr("xlink:href",function(d,i){return "#title";})
    .text("Distinctive Words by Category")
    
    
    
    
}
