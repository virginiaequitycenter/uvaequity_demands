gsap.registerPlugin(ScrollTrigger);


function initiatemovement() {

    //var chartoffset = document.getElementById('streams').getBoundingClientRect().height/2
    //// Animate Stream Chart
    //
    //var streammargin = "calc(50vh' + chartoffset')'";

    //d3.select("#streamstory").style("margin-bottom", streammargin);

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
            start: "bottom bottom",
            //      endTrigger: "#streamstory",
            end: +10,
            //        markers: true,
            scrub: 1
        },
        opacity: 1
    });

    gsap.to("#text2", {
            scrollTrigger: {
                trigger: "#text2",
                start: "center center",
                //      endTrigger: "#streamstory",
                end: +10,
                //        markers: true,

                onEnterBack: function () {
                    streamgraph_all(demands);
                },
                onLeave: function () {
                    streamgraph(demands);
                    d3.select("#tooltipstream")
                        .style("visibility", "hidden");},
                },
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
                end: +10,
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
                end: +10,
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
                end: +10,
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

        gsap.to("#iframesearch", {
            scrollTrigger: {
                trigger: "#search",
                start: "top bottom",
                //      endTrigger: "#streamstory",
                end: "bottom top",
                //        markers: true,
                //        scrub: 1,

                onEnter: function () {
                    var ifr = document.getElementsByName('keysearch')[0]
                    ifr.src = "https://commpaslab.shinyapps.io/demandkeywords/"
                },
                //            onLeaveBack: function(){
                //                var ifr = document.getElementsByName('keysearch')[0]
                //                ifr.src = "#"
                //            }

            },
        });




        gsap.to("#tocify-header1", {
            scrollTrigger: {
                trigger: "#mainNav",
                start: "top top",
                endTrigger: "#when",
                end: "top top",
                toggleClass: {
                    targets: "#tocify-header1",
                    className: "tocify-highlighted"
                }
            },
        });


        gsap.to("#tocify-header2", {
            scrollTrigger: {
                trigger: "#when",
                start: "top top",
                endTrigger: "#who",
                end: "top top",
                toggleClass: {
                    targets: "#tocify-header2",
                    className: "tocify-highlighted"
                }
            },
        });



        gsap.to("#tocify-header3", {
            scrollTrigger: {
                trigger: "#who",
                start: "top top",
                endTrigger: "#what",
                end: "top top",
                toggleClass: {
                    targets: "#tocify-header3",
                    className: "tocify-highlighted"
                }
            },
        });

        gsap.to("#tocify-header4", {
            scrollTrigger: {
                trigger: "#what",
                start: "top top",
                endTrigger: "#search",
                end: "top top",
                toggleClass: {
                    targets: "#tocify-header4",
                    className: "tocify-highlighted"
                }
            },
        });


        gsap.to("#tocify-header5", {
            scrollTrigger: {
                trigger: "#search",
                start: "top top",
                endTrigger: "#footer",
                end: "top top",
                toggleClass: {
                    targets: "#tocify-header5",
                    className: "tocify-highlighted"
                }
            },
        });

        gsap.to("#tocify-header5", {
            scrollTrigger: {
                trigger: "#iframesearch",
                start: "top center",
                endTrigger: "#footer",
                end: "top top",
                onEnter: function () {
                    d3.select("#TOC").classed("tocify-stick", true)
                },
                onLeaveBack: function () {
                    d3.select("#TOC").classed("tocify-stick", false)
                }
            },
        });


    };
