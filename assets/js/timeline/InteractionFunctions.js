var mouseover = function (d) {

    d3.select("#tooltip")
        .style("visibility", "visible");

    var attribute = d3.select(this);

    attribute
        .style("border", "solid grey .0001px")
        .style("opacity", .5);

    d3.select("#demandtext").text(d.Text);
    d3.select("#demandtags").text(d.CodeList);

}


var mousemove = function (d) {

    d3.select("#tooltip")
    // .style("left", d3.event.pageX - 25 + "px")
    //.style("top", d3.event.pageY -110 + "px")

}

var mouseleave = function (d) {
    d3.select("#tooltip")
        .style("visibility", "hidden");

    d3.select(this)
        .style("border", "none")
        .style("opacity", 1);
}


var docid = 1;

$('#scroll-forward').click(function () {
    
    docid = docid + 1
    if (docid > maxscroll) {docid = maxscroll};

    var position = $('#did' + docid).position().left - 10
    console.log(position);

    $(".project").animate({
        scrollLeft: "+=" + position
    }, 1000)
    //  elmnt.scrollLeft += position

});

$('#scroll-back').click(function () {
    docid = docid - 1
    if (docid < 1) {docid = 1}; 
    
    var position = $('#did' + docid).position().left - 60
    console.log(position);

    $(".project").animate({
        scrollLeft: "+=" + position
    }, 1000)
    //  elmnt.scrollLeft += position

});


var ktooltips = document.querySelectorAll(".ktooltip");
ktooltips.forEach(function(ktooltip, index){                // For each ktooltip
  ktooltip.addEventListener("mouseover", position_tooltip); // On hover, launch the function below
})

function position_tooltip(){
  // Get .ktooltiptext sibling
  var tooltip = this.parentNode.querySelector(".ktooltiptext");
  
  // Get calculated ktooltip coordinates and size
  var ktooltip_rect = this.getBoundingClientRect();

  var tipX = ktooltip_rect.width + 5; // 5px on the right of the ktooltip
  var tipY = -40;                     // 40px on the top of the ktooltip
  // Position tooltip
  tooltip.style.top = tipY + 'px';
  tooltip.style.left = tipX + 'px';

  // Get calculated tooltip coordinates and size
  var tooltip_rect = tooltip.getBoundingClientRect();
  // Corrections if out of window
  if ((tooltip_rect.x + tooltip_rect.width) > window.innerWidth) // Out on the right
    tipX = -tooltip_rect.width - 5;  // Simulate a "right: tipX" position
  if (tooltip_rect.y < 0)            // Out on the top
    tipY = tipY - tooltip_rect.y;    // Align on the top

  // Apply corrected position
  tooltip.style.top = tipY + 'px';
  tooltip.style.left = tipX + 'px';
}
