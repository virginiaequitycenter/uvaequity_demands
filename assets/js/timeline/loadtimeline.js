var DemandsText;
var DemandsTags;
var events;
var maxscroll;

function loadData() {

    d3.csv("assets/data/demands_tags.csv")
        .then(function (data) {
            DemandsTags = data;
            DrawTagFilter(DemandsTags);
        });

    d3.csv("assets/data/demands_text.csv")
        .then(function (data1) {
            d3.csv("assets/data/events.csv")
               .then(function(data2){
            DemandsText = data1;
            events = data2;
            DrawYearJump(DemandsText);
            DrawDemandDocs(DemandsText, events);
            maxscroll = d3.map(DemandsText, (d) => d.DocTitle).keys().length;

            });
        


        });

    


}
