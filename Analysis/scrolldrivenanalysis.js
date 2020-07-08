gsap.registerPlugin(ScrollTrigger);


gsap.to("#chordchart", {
    scrollTrigger:{
       trigger: "#chordstory",
        start: "top bottom",
        end: "bottom top",
        markers: true,
        pin: "#chordchart",
        pinSpacing: false,
        onEnterBack: () => d3.select("#ThemeChange").selectAll(".form-control").remove(),
        onLeave: () => DrawChordsControl(chords)
    },
  });



        
gsap.to("#streamchart", {
    scrollTrigger:{
       trigger: "#streamstory",
        start: "top bottom",
        end: "bottom top",
        markers: true,
        pin: "#streamchart",
        pinSpacing: false,
        onEnterBack: () => d3.select("#DocChange").selectAll(".form-control").remove(),
        onLeave: () => DrawStreamsControl(demands)
    },
  });
