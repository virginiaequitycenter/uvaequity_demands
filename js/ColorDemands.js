var tagsdata;
var queryids;

function ColorDemands(tags, input_code) {

    d3.selectAll(".demandlines").transition().style("background-color", "#E0E1E1").duration(1000)

    tagsdata = tags.filter(function (el) {
        return el.Code === input_code;
    });

    queryids = d3.map(tagsdata, function (d) {
        return d.demand_id;
    }).keys().join(', #ID');


    //   d3.selectAll("#ID" + queryids).style("background-image", "url(pics/redsquareuse.jpg)")
    d3.selectAll("#ID" + queryids).transition().style("background-color", "rgba(163, 0, 11, 1)").duration(1000)

    // gsap.registerPlugin(ScrollTrigger);

    //let sections = gsap.utils.toArray(".demandboxes");
    //
    //gsap.to(".box", {
    //  xPercent: 100 * (sections.length - 1),
    //  ease: "none",
    //  scrollTrigger: {
    //    trigger: ".box",
    //    markers: true,
    //    pin: true,
    //    scrub: 1,
    //    snap: 1 / (sections.length - 1),
    //    // base vertical scrolling on how wide the container is so it feels more natural.
    //    end: () => "+=" + document.querySelector(".box").offsetWidth;
    //  }
    //});

}

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

function DrawYearJump(Data) {

    var YearList = d3.map(Data, function (d) {
        return d.YEAR;
    }).keys();

    var yearjump = d3.select(".yearjump")
        .append("select")
        .classed("form-control", true)
        .classed("yearjumpselect", true)


    $('.yearjumpselect').change(function () {
    
        var data =  $(this).val();
        var elmnt =  document.getElementById(data); 
        var x = elmnt.scrollLeft;
        var y = elmnt.scrollTop;

        elmnt.scrollLeft = 200;

        console.log(x, y, data);

//    $('.timelinecontainer').animate({
//        scrollLeft: $(data).offset().top
//    }, 2000);
//    return false;
        
//        var leftPos = $('.timelinecontainer').scrollLeft();
//         $(".timelinecontainer").animate({scrollLeft: leftPos - 200}, 800);
//        
        
 //          $(".timelinecontainer").scrollTo($(data), 1000);
    });

    yearjump.selectAll("option")
        .data(YearList)
        .enter()
        .append("option")
        .attr("value", (d) => "Y" + d)
        .text((d) => d)
        .classed("tagoption", true);
}
