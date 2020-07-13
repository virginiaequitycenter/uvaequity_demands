// Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").removeClass("navbar-dark").addClass("bg-white");
    } else {
      $("#mainNav").addClass("navbar-dark").removeClass("bg-white");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

//        
//// element to detect scroll direction of
const $el = $(window);

//// initialize last scroll position
//let lastY = $el.scrollTop();
//    
//$el.on('scroll', function() {
//    // get current scroll position
//    const currY = $el.scrollTop();
//        
//    // determine current scroll direction
//    const y = (currY < lastY - 5) ? 'up' : ((currY === lastY) ? 'none' : 'down');
//
//    // do something here...
//    console.log(y);
//    
//    if ((y === "down") &  $("#mainNav").offset().top > 600) {
//         $('.navbar').addClass("navbar-hide"); 
//    } else if (y === "up") {
//        
//    $('.navbar').removeClass("navbar-hide");
//    } else {
//        
//        
//    }
//
//    // update last scroll position to current position
//    lastY = currY;
//});


//var prevScrollpos = window.pageYOffset;
//window.onscroll = function() {
//  var currentScrollPos = window.pageYOffset;
//  if (prevScrollpos > currentScrollPos) {
//    document.getElementById("#mainNav").style.top = "0";
//  } else {
//    document.getElementById("#mainNav").style.top = "-50px";
//  }
//  prevScrollpos = currentScrollPos;
//}