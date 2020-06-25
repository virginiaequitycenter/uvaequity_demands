var DemandsText;
var DemandsTags;

function loadData() {
    
    d3.csv("data/demands_text.csv")
        .then(function(data){
        
        DemandsText = data;   
        DrawDemandDocs(DemandsText);
        
             });
    
    d3.csv("data/demands_tags.csv")
       .then(function(data){
        DemandsTags = data;   
        ColorDemands(DemandsTags);
    });

}