var demands;
var chords;
var demos;

function loadData() {

    d3.csv("data/demands.csv").then(function (d) {
        demands = d;
        streamgraph(demands);
        DrawStreamsControl(demands);
        
        
        d3.csv("data/demos.csv").then(function(d){
        demos = d;
        drawdemos(demos);
            initiatemovement();
    })
        
    });

//    d3.csv("data/chord.csv").then(function (d) {
//        chords = d;
//        drawchords(chords, "Total");
//    });
    
    


}
