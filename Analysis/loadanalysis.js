var demands;
var chords;

function loadData() {

    d3.csv("data/demands.csv").then(function (d) {
        demands = d;
        streamgraph(demands);
        DrawStreamsControl(demands);
    });

    d3.csv("data/chord.csv").then(function (d) {
        chords = d;
        drawchords(chords, "Total");
        DrawChordsControl(chords);
    });


}
