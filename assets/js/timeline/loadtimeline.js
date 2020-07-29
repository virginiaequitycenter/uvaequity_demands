var DemandsText;
var DemandsTags;
var events;
var maxscroll;
var images;
var AllCodes;
var colortimeline

function loadData() {

    d3.csv("../assets/data/demands_tags.csv")
        .then(function (data) {
            DemandsTags = data;
            DrawTagFilter(DemandsTags);
        
        
 AllCodes = d3.map(data, function (d) {
            return d.Code;
        }).keys().sort()
        
     var addon = ["Other"];
     var ColorCodes = addon.concat(AllCodes);
        
        colortimeline = d3.scaleOrdinal()
            .domain(ColorCodes)
            .range(['#bd7b45',  '#683a20', '#dca77d', '#7d452c', '#9d5d2d', '#e8bfa3', '#894f29', '#efd1b7', '#d39156', '#a86b3f', '#ac7752', '#e2ad85', '#6d3b20', '#fde7da', '#824f30', '#dcb17d', '#dfad89', '#f2d3b1'])
    });

    d3.csv("../assets/data/demands_text.csv")
        .then(function (data1) {
            d3.csv("../assets/data/events.csv")
                .then(function (data2) {
                    d3.csv("../assets/data/images.csv").then(function (data3) {

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
