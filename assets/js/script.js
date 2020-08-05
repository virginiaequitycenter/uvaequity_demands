//
//// Activate scrollspy to add active class to navbar items on scroll
//  $('body').scrollspy({
//    target: '#mainNav',
//    offset: 70
//  });
//
//  // Collapse Navbar
//  var navbarCollapse = function() {
//    if ($("#mainNav").offset().top > 10) {
//      $("#mainNav")
////      .removeClass("fixed-top")
//          .addClass("bg-brown");
//    } else {
//      $("#mainNav")
////          .addClass("fixed-top")
//          .removeClass("bg-brown");
//    }
//  };
//  // Collapse now if page is not at top
//  navbarCollapse();
//  // Collapse the navbar when page is scrolled
//  $(window).scroll(navbarCollapse);
//


d3.csv("assets/data/picture_grid.csv").then(function (d) {
    drawProjects(d);
});

function drawProjects(photos) {

    var photocontainer = d3.select("#pictures")

    console.log(photos);

    var photoelements = photocontainer
        .selectAll(".square")
        .data(photos)
        .enter()
        .append("div")
        .classed("square", true)
        .classed("square-2", (d) => (d.imagesize === "2") ? true : false)
        .classed("square-3", (d) => (d.imagesize === "3") ? true : false)


    var imageboxes = photoelements
        .append("div")
        .classed("square-content", true)
    .classed("image-box", true);

//         .style("background", 
//                function (d) {
//           return "linear-gradient(rgba(41, 23, 12, .75), rgba(41, 23, 12, .75)), url(assets/front-images/" + d.image + "" + d.type + ") "}
//                )        

imageboxes.append("img")
        .attr("src", function (d) {
            return "assets/front-images/" + d.image + "" + d.type
        })
//    .style("z-index", (d) => d.z)

imageboxes.append("div").classed("overlay", true);



};
