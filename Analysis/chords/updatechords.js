// This is the one that draws the control for the updater 
    
function DrawChordsControl(Data) {

   var  CodeList = d3.map(Data, function (d) {
        return d.Code;
    }).keys();

    var ThemeChange = d3.select("#ThemeChange")
        .append("select")
        .classed("form-control", true)
     //   .classed("yearjumpselect", true)
         .on("change", function () {
            drawchords(Data, this.value);
            console.log(this.value);
           });
    
    ThemeChange.selectAll("option")
        .data(CodeList)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d);

       // .classed("tagoption", true);

}