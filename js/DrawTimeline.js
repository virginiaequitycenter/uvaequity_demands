var TimeLineData
var minline
var maxline

function DrawTimeLine(demands) {
    TimeLineData = d3.nest().key((d) => d.YEAR).key((d) => d.Title).entries(demands);

    var position = {
        top: 750,
        left: 1000
    }

    var height = 3000;

    var svg = d3.select("#mainsvg");
    var timelinegroup = svg.append("g")
        .attr("id", "timelinegroup")
        .attr("transform",
            "translate(" + position.left + "," + position.top + ")");

    maxtime = d3.max(TimeLineData, (d) => d.key);
    var mintime = d3.min(TimeLineData, (d) => d.key);

    minline = mintime - 1;
    maxline = maxtime - 1 * -1;

    var yScale = d3.scaleLinear()
        .domain([maxtime, mintime]) // input 
        .range([height, 0]);

    var line = d3.line()
        .x(0) // set the x values for the line generator
        .y(function (d) {
            return yScale(d);
        }) // set the y values for the line generator 
        .curve(d3.curveMonotoneX);

    var timeline = timelinegroup.append("g");

    timeline.append("path")
        .datum([minline, maxline]) // 10. Binds data to the line 
        .attr("class", "timeline") // Assign a class for styling 
        .attr("d", line); // 11. Calls the line generator 

    var dots = timelinegroup.append("g");

    dots.selectAll(".dot")
        .data(TimeLineData)
        .enter().append("circle") // Uses the enter().append() method
        .attr("class", "dot") // Assign a class for styling
        .attr("id", function (d) {
            return "A" + d.key
        })
        .attr("cx", 0)
        .attr("cy", function (d) {
            return yScale(d.key)
        })
        .attr("r", 20)
        .attr("opacity", 0)


    var yearsArray = d3.map(TimeLineData, function (d) {
        return d.key;
    }).keys().sort(d3.ascending)


    yearsArray.forEach(function (element, index) {

        console.log(index, element)
        var point = "#A" + yearsArray[index]
        tl = new TimelineMax({
            repeat: -1
        });

        tl.to(point, {

            scrollTrigger: {
                trigger: point,
                markers: true,
                start: "center center",
                pin: ".container-fluid",
               scrub: 1,
                toggleActions: "complete none  none none"

            },
            duration: 10,
            ease: "power3",
            alpha: 1
        })
    });




}
