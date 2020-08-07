// Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav2',
    offset: 70
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav2").offset().top > 10) {
      $("#mainNav2")
//      .removeClass("fixed-top")
          .addClass("bg-brown");
    } else {
      $("#mainNav2")
//          .addClass("fixed-top")
          .removeClass("bg-brown");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);
//


//The middle text
gsap.registerPlugin(ScrollTrigger);

gsap.to("#headertext", {
        scrollTrigger: {
            trigger: "#slidecontainer",
            start: 2,
            //      endTrigger: "#streamstory",
            end: +20,
            //        markers: true,
            scrub: 1
        },
        opacity: 1
    });


//gsap.registerPlugin(Draggable, InertiaPlugin);

var slideDelay = 4;
var slideDuration = 1;
var snapX;

var slides = document.querySelectorAll(".slide");
var progressWrap = gsap.utils.wrap(0, 1);

var numSlides = slides.length;
    
gsap.set(slides, {
//  backgroundColor: "random([red, blue, green, purple, orange, yellow, lime, pink])",
  xPercent: i => i * 100
});

var wrap = gsap.utils.wrap(-100, (numSlides - 1) * 100);
var timer = gsap.delayedCall(slideDelay, autoPlay);

var animation = gsap.to(slides, {
  xPercent: "+=" + (numSlides * 100),
  duration: 1,
  ease: "none",
  paused: true,
  repeat: -1,
  modifiers: {
    xPercent: wrap
  }
});

var proxy = document.createElement("div");
var slideAnimation = gsap.to({}, {});
var slideWidth = 0;
var wrapWidth = 0;
resize();


window.addEventListener("resize", resize);


function animateSlides(direction) {
    
  timer.restart(true);
  slideAnimation.kill();
  
  var x = snapX(gsap.getProperty(proxy, "x") + direction * slideWidth);
  
  slideAnimation = gsap.to(proxy, {
    x: x,
    duration: slideDuration,
    onUpdate: updateProgress
  });  
}

function autoPlay() {  
//  if (draggable.isPressed || draggable.isDragging || draggable.isThrowing) {
//    timer.restart(true);
//  } else {
    animateSlides(-1);
//  }
}

function updateProgress() { 
  animation.progress(progressWrap(gsap.getProperty(proxy, "x") / wrapWidth));
}

function resize() {
  
  var norm = (gsap.getProperty(proxy, "x") / wrapWidth) || 0;
  
  slideWidth = slides[0].offsetWidth;
  wrapWidth = slideWidth * numSlides;
  snapX = gsap.utils.snap(slideWidth);
  
  gsap.set(proxy, {
    x: norm * wrapWidth
  });
  
  animateSlides(0);
  slideAnimation.progress(1);
}




