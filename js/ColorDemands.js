var tagsdata;
var queryids;

function ColorDemands(tags) {

    tagsdata = tags.filter(function (el) {
        return el.Code === "School Climate";
    });

    queryids = d3.map(tagsdata, function (d) {
        return d.demand_id;
    }).keys();
   
    queryids = queryids.join(', #ID');
    
    d3.selectAll("#ID" + queryids).style("background-color", 'red')




}
