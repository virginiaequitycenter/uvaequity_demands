var tagsdata;
var queryids;

function ColorDemands(tags) {

    tagsdata = tags.filter(function (el) {
        return el.Code === "Minority Student Recruitment";
    });

    queryids = d3.map(tagsdata, function (d) {
        return d.demand_id;
    }).keys().join(', #ID');
   
    
    d3.selectAll("#ID" + queryids).style("background", "url(pics/redsquareuse.jpg) red")

    
    
    
    
    
    
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


