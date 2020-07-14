gsap.registerPlugin(ScrollTrigger);


function initiatemovement() {

// Animate Stream Chart

gsap.to("#streamchart", {
    scrollTrigger: {
        trigger: "#streamchart",
        start: "center center",
        endTrigger: "#streamstory",
        end: "bottom top",
//                markers: true,
        pin: "#streamchart",
        pinSpacing: false,
        onEnterBack: function () {
    updatestreams(demands, "Muddy Floor Report")
         thestreams
                .on("mouseover", function () {})
                .on("mousemove", function () {})
                .on("mouseleave", function () {});
        },
        onLeave: function () {
            updatestreams(demands, "Student Body Referendum")

        }
    },

});

gsap.to("#streamchart", {
    scrollTrigger: {
        trigger: "#text1",
        start: "center center",
        //      endTrigger: "#streamstory",
        end: "top top",
        //        markers: true,
        scrub: 1
    },
    opacity: 1
});

gsap.to("#text1", {
    scrollTrigger: {
        trigger: "#text1",
        start: "center center",
        //      endTrigger: "#streamstory",
        end: +10,
        //        markers: true,
        scrub: 1
    },
    opacity: 1
});

var myAreas = d3.selectAll(".myArea");

gsap.to(myAreas, {
    scrollTrigger: {
        trigger: "#text3",
        start: "center center",
        //      endTrigger: "#streamstory",
        end: +10,
        //        markers: true,
        //        scrub: 1,

        onEnterBack: function () {
            thestreams.style("opacity", function (d) {
                return opacitystreams(d.key);
            })
        },
        onLeave: function () {
            thestreams.style("opacity", .1)
            d3.select("#MinorityStudentRecruitment").style("opacity", .9)
        },
    },
});



gsap.to(myAreas, {
    scrollTrigger: {
        trigger: "#text4",
        start: "center center",
        //      endTrigger: "#streamstory",
        end:+10,
        //        markers: true,
        //        scrub: 1,

        onEnterBack: function () {
            thestreams.style("opacity", .1)
            d3.select("#MinorityStudentRecruitment").style("opacity", .9)
        },
        onLeave: function () {
            thestreams.style("opacity", .1)
           d3.select("#AbolitionDefunding").style("opacity", .9)
        },
    },
});


gsap.to(myAreas, {
    scrollTrigger: {
        trigger: "#text5",
        start: "center center",
        //      endTrigger: "#streamstory",
        end:+10,
        //        markers: true,
        //        scrub: 1,

        onEnterBack: function () {
        updatestreams(demands, "Student Body Referendum")

        thestreams.style("opacity", .1);
         d3.selectAll("#AbolitionDefunding").style("opacity", .9);  
            
        thestreams.on("mouseover", function () {})
                .on("mousemove", function () {})
                .on("mouseleave", function () {});
       
            
        },
        onLeave: function () {
            updatestreams(demands, "An Audacious Faith")
            thestreams
                .on("mouseover", function () {})
                .on("mousemove", function () {})
                .on("mouseleave", function () {}) 
            
        },
    },
});


gsap.to(myAreas, {
    scrollTrigger: {
        trigger: "#text6",
        start: "center center",
        //      endTrigger: "#streamstory",
        end:+10,
        //        markers: true,
        //        scrub: 1,

        onEnterBack: function () {
            updatestreams(demands, "An Audacious Faith")
            thestreams
                .on("mouseover", function () {})
                .on("mousemove", function () {})
                .on("mouseleave", function () {}) 
       
            
        },
        onLeave: function () {
            
         updatestreams(demands, "Muddy Floor Report")
         thestreams
                .on("mouseover", function () {})
                .on("mousemove", function () {})
                .on("mouseleave", function () {}) 
 
        },
    },
});
    
};


