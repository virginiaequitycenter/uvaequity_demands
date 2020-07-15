var tagsdata;
var queryids;

function ColorDemands(tags, input_code) {

    d3.selectAll(".demandlines").transition().style("background-color", "#E0E1E1").duration(1000)

    tagsdata = tags.filter(function (el) {
        return el.Code === input_code;
    });

    queryids = d3.map(tagsdata, function (d) {
        return d.demand_id;
    }).keys().join(', #ID');

    d3.selectAll("#ID" + queryids).transition().style("background-color", "rgba(163, 0, 11, 1)").duration(1000)


}

function DrawTagFilter(tags) {

    var TagList = d3.map(tags, function (d) {
        return d.Code;
    }).keys();

    var tagselector = d3.select(".tagfilter")
        .append("select")
        .classed("form-control", true)
        .classed("tagselector", true)
        .on("change", function () {
            ColorDemands(tags, this.value);
            console.log(this.value);
        });

    tagselector.selectAll("option")
        .data(TagList)
        .enter()
        .append("option")
        .attr("value", (d) => d)
        .text((d) => d)
        .classed("tagoption", true);
}

function DrawYearJump(Data) {

    var YearList = d3.map(Data, function (d) {
        return d.YEAR;
    }).keys();
    
    var addon = [""];
    var YearList = addon.concat(YearList);

    var yearjump = d3.select(".yearjump")
        .append("select")
        .classed("form-control", true)
        .classed("yearjumpselect", true)
    
    yearjump.selectAll("option")
        .data(YearList)
        .enter()
        .append("option")
        .attr("value", (d) => "Y" + d)
        .text((d) => d)
        .classed("tagoption", true);


    $('.yearjumpselect').change(function () {
    
        var data =  $(this).val();
        var position =   $('#' + data).position().left;
        var classList = document.getElementById(data).className.split(/\s+/);
        docid =  Number(classList[[0]]);
        console.log(position, Number(classList[[0]]));
        
    $(".project").animate({scrollLeft: "+=" + position  }, 1000)
      //  elmnt.scrollLeft += position
        
    });

}
