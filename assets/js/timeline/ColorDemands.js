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
