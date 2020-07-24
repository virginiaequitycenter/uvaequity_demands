// Activate scrollspy to add active class to navbar items on scroll
  $('body').scrollspy({
    target: '#mainNav',
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 50) {
      $("#mainNav")
      .removeClass("fixed-top")
          .addClass("bg-brown");
    } else {
      $("#mainNav")
//          .addClass("fixed-top")
          .removeClass("bg-brown");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

