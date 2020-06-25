var tagsdata;
var queryids;

function ColorDemands(tags) {

    tagsdata = tags.filter(function (el) {
        return el.Code === "School Climate";
    });

    queryids = d3.map(tagsdata, function (d) {
        return d.Tag;
    }).keys();
   
    queryids = queryids.join(', ');
    
    d3.selectAll(queryids).style("background-color", 'red')




}
