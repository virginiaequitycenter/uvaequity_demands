gsap.registerPlugin(ScrollTrigger);


gsap.to("#chordchart", {
    scrollTrigger:{
       trigger: "#chords",
        start: "center center",
        endTrigger: "#chordstory",
        end: "bottom top",
//        markers: true,
        pin: "#chordchart",
        pinSpacing: false,
        onEnterBack: () => d3.select("#ThemeChange").selectAll(".form-control").remove(),
        onLeave: () => DrawChordsControl(chords)
    },
  });



        
gsap.to("#streamchart", {
    scrollTrigger:{
       trigger: "#streams",
        start: "center center",
        endTrigger: "#streamstory",
        end: "bottom top",
//        markers: true,
        pin: "#streamchart",
        pinSpacing: false,
        onEnterBack: () => d3.select("#DocChange").selectAll(".form-control").remove(),
        onLeave: () => DrawStreamsControl(demands)
    },
  });


