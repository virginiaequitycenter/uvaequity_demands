var DemandTextNested;

function DrawDemandDocs(demand_text) {


    DemandTextNested = d3.nest()
        .key((d) => d.YEAR)
        .key((d) => d.DocTitle)
        .key((d) => d.PageNum)
        .entries(demand_text); // Nest to the top level of organization – the Year

    var demandstimeline = d3.selectAll("#timelinecontainer").classed("d-flex", true)
        .classed("flex-row", true); // Select the container for the demands timeline

    var demanyearboxes = demandstimeline
        .selectAll(".years") // Create one box for each year
        .data(DemandTextNested)
        .enter()
        .append("div")
        .classed("years", true)
        .classed("d-flex", true)
        .classed("flex-row", true);

    var yeartextcolumn = demanyearboxes // Divide Each Year into a Text Column and a Div area for the Demands
        .append("div")
        .classed("yeartextcolumn", true).classed("d-flex", true);

    var yeartextbox = yeartextcolumn.append("div").classed("yeartextbox", true); // Create a box for the year inside the text column

    var yeartitles = yeartextbox.append("h3").text(d => d.key).classed("yearlabels", true); // Generate the Year title

    var demandboxcontainer = demanyearboxes // Create the Box that will hold all the demand texts for that year
        .append("div")
        .classed("demandboxcontainer", true);

    var demandboxes = demandboxcontainer
        .selectAll(".demandboxes")
        .data((d) => d.values)
        .enter()
        .append("div")
        .classed("demandbox", true)
        .classed("secondbox",  function(d) {  
            if (d.values[[0]].values[[0]].YearOrder > 1) {
                return true;
            } else {
                return false;
            }
         });

    var documenttitleboxes = demandboxes.append("div").classed("documenttitlebox", true);

    var documenttitles = documenttitleboxes.append("h3").text((d) => d.key);

    var demandpagescontainer = demandboxes.append("div").classed("demandpagescontainer", true).classed("d-flex", true);

    var demandlinescontainer = demandpagescontainer.selectAll(".demandlinescontainer")
        .data((d) => d.values)
        .enter().
    append("div")
        .classed("demandlinescontainer", true)
        .classed("d-flex", true)
        .classed("flex-column", true);

    var demandlines = demandlinescontainer
        .selectAll(".demandlines")
        .data((d) => d.values)
        .enter()
        .append("div")
        .classed("demandlines", true)
        .attr("id", (d) => "ID" + d.demand_id);

    ColorDemands(DemandsTags);

}
