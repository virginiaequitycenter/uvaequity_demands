var demands;
var chords;
var demos;
var keyness;
var AllCodes
var colorstreams;

function loadData() {

    d3.csv("../assets/data/demands.csv").then(function (d) {
        demands = d;
        AllCodes = d3.map(demands, function (d) {
            return d.Code;
        }).keys();

        var addon = ["Other"];
        var ColorCodes = addon.concat(AllCodes);

        colorstreams = d3.scaleOrdinal()
            .domain(ColorCodes)
            .range(['#bd7b45', '#683a20', '#dca77d', '#7d452c', '#9d5d2d', '#e8bfa3', '#894f29', '#efd1b7', '#d39156', '#a86b3f', '#ac7752', '#e2ad85', '#6d3b20', '#fde7da', '#824f30', '#dcb17d', '#dfad89', '#f2d3b1'])

        var marktext = []
        var marknodes = d3.selectAll(".colorstream").nodes()
        marknodes.forEach(function (node) {
            marktext.push(node.firstChild.data.trim()) })
        console.log(marktext)
        var marks = d3.selectAll(".colorstream").style("background-color", (d, i) => colorstreams(marktext[[i]]))

        streamgraph_all(demands);
//        streamgraph(demands);
        DrawStreamsControl(demands);
        initiatemovement();

        d3.csv("../assets/data/demos.csv").then(function (d) {
            demos = d;
            drawdemos(demos);

        })

        d3.csv("../assets/data/keyness.csv").then(function (d) {
            keyness = d;
            drawkeyness(keyness);
        });

    });


}
