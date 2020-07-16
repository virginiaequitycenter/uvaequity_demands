var mouseover = function (d) {

    d3.select("#tooltip")
        .style("visibility", "visible");

    var attribute = d3.select(this);

    attribute
        .style("border", "solid grey .0001px")
        .style("opacity", .5);

    d3.select("#demandtext").text(d.Text);
    d3.select("#demandtags").text(d.CodeList);

}


var mousemove = function (d) {

    d3.select("#tooltip")
    // .style("left", d3.event.pageX - 25 + "px")
    //.style("top", d3.event.pageY -110 + "px")

}

var mouseleave = function (d) {
    d3.select("#tooltip")
        .style("visibility", "hidden");

    d3.select(this)
        .style("border", "none")
        .style("opacity", 1);
}


// This Draws the Color Filter Selector
function DrawTagFilter(tags) {

    var TagList = d3.map(tags, function (d) {
        return d.Code;
    }).keys();

    var tagselector = d3.select(".tagfilter")
        .append("select")
        .classed("form-control", true)
        .classed("tagselector", true)
        .on("change", function () {
            ColorDemands(tags, this.value);
            console.log(this.value);
        });

    tagselector.selectAll("option")
        .data(TagList)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d)
        .classed("tagoption", true);
}

// This Draws the Year Jump thing
function DrawYearJump(Data) {

    var YearList = d3.map(Data, function (d) {
        return d.YEAR;
    }).keys();
    
    var addon = [""];
    var YearList = addon.concat(YearList);

    var yearjump = d3.select(".yearjump")
        .append("select")
        .classed("form-control", true)
        .classed("yearjumpselect", true)
    
    yearjump.selectAll("option")
        .data(YearList)
        .enter()
        .append("option")
        .attr("value", (d) => "Y" + d)
        .text((d) => d)
        .classed("tagoption", true);


    $('.yearjumpselect').change(function () {
    
        var data =  $(this).val();
        var position =   $('#' + data).position().left;        
     
    $(".project").animate({scrollLeft: "+=" + position  }, 1000)
      //  elmnt.scrollLeft += position
        
        var classList = document.getElementById(data).className.split(/\s+/);
        // Update Doc ID for the year jumper
        docid =  Number(classList[[0]]);
        console.log(position, Number(classList[[0]]));
        
    });
}


// Year Jump Forward and Jump Back
var docid = 1;

$('#scroll-forward').click(function () {
    
    docid = docid + 1
    if (docid > maxscroll) {docid = maxscroll};
    console.log(docid);

    var position = $('#did' + docid).position().left - 10
    console.log(position);

    $(".project").animate({
        scrollLeft: "+=" + position
    }, 1000)
    //  elmnt.scrollLeft += position

});

$('#scroll-back').click(function () {
    docid = docid - 1
    if (docid < 1) {docid = 1}; 
    console.log(docid);
    var position = $('#did' + docid).position().left - 60
    console.log(position);

    $(".project").animate({
        scrollLeft: "+=" + position
    }, 1000)
    //  elmnt.scrollLeft += position

});

// Trying to make the enlarge unenlarge text on the timeline more maneagable

var mouseovertip = function (d) {
    var windowwidth = d3.select("body").node().getBoundingClientRect()
    var thiswidth = d3.select(this).node().getBoundingClientRect()
    var windowleft = $("#project").scrollLeft();

    var left = thiswidth.x - 250;
   // var width = thiswidth.width;
    var right = thiswidth.x - 250*-1;

    var useleft;
    var usetransform;
    if (left < 0) {useleft =  windowleft - 5*-1
                  usetransform = 0
                  }
    else if (right > windowwidth.width) {
      useleft = windowleft + windowwidth.width - 505;
      usetransform = 0
    } else {
      useleft = left  - windowleft*-1;
     usetransform = 0;
    };
    
    d3.select("#eventtooltip")
        .style("visibility", "visible");
      d3.select("#eventtooltip")
        .style("opacity", 1)

    d3.select("#eventtexttip").text(d.Text);
    
    d3.select("#eventtooltip")
     .style("left", useleft + "px")
     .style("transform", "translate(" + usetransform + "%, 0)")
        console.log(useleft)
}

var mouseleavetip = function (d) {
    d3.select("#eventtooltip")
        .style("visibility", "hidden");
    d3.select("#eventtooltip")
        .style("opacity", 0)
}