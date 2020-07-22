var DemandsText;
var DemandsTags;
var events;
var maxscroll;
var images;
var AllCodes;
var colortimeline

function loadData() {

    d3.csv("assets/data/demands_tags.csv")
        .then(function (data) {
            DemandsTags = data;
            DrawTagFilter(DemandsTags);
        
        
    AllCodes = d3.map(data, function (d) {
        return d.Code;
    }).keys().sort();
        
    colortimeline = d3.scaleOrdinal()
        .domain(["Other", AllCodes ])
        .range(['#fde7da','#dfad89', '#683a20', '#dcb17d', '#bd7b45', '#6d3b20', '#f2d3b1', '#9d5d2d', '#ac7752', '#894f29', '#d39156', '#efd1b7', '#e2ad85',  '#dca77d', '#824f30', '#7d452c', '#a86b3f', '#e8bfa3'])
        
        });

    d3.csv("assets/data/demands_text.csv")
        .then(function (data1) {
            d3.csv("assets/data/events.csv")
                .then(function (data2) {
                    d3.csv("assets/data/images.csv").then(function (data3) {

                        DemandsText = data1;
                        events = data2;
                        images = data3;
                        
                        DrawYearJump(DemandsText);
                        DrawDemandDocs(DemandsText, events, images);
                        maxscroll = d3.map(DemandsText, (d) => d.DocTitle).keys().length;
                    });
                });

        });




}
