var demands;
var chords;
var demos;

function loadData() {

    d3.csv("assets/data/demands.csv").then(function (d) {
        demands = d;
        streamgraph(demands);
        DrawStreamsControl(demands);
        
        
        d3.csv("assets/data/demos.csv").then(function(d){
        demos = d;
        drawdemos(demos);
        initiatemovement();
    })
        
    });

}
