require('dotenv').config()
var sptfy = require('node-spotify-api');
var axios = require("axios")
var keys = require("./keys.js");
// var spotify = Spotify(keys.spotify);
var fs = require('fs');

var comm = process.argv[2];
var input = process.argv.slice(3).join(" ");
var q;
console.log(input);
console.log(comm);

function band() {
    axios.get("https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp").then(
        function(response) {
            console.log(response)
        }
    )
}

function movie() {
    axios.get("http://www.omdbapi.com/?t=" + input + "&apikey=" + keys.omdb.key).then(
        function(response) {
            console.log(response)
        }
    )
}

function song() {
    // sptfy.search()
    spotify.search()
}

function dothis() {
    fs.readFile('random.txt', 'utf-8', function(err, data){
        if (err) {throw err};
        q = data;
        // console.log(q)
        var e = ("");
        var r = ("");
        for (var w = 0; w < q.length; w++) {
            e = e += q[w]
            if (e === "spotify-this-song" || e === "concert-this" || e === "movie-this"){
                r = r += q[w]
            }
        }
        console.log(r)
        // console.log(e)
    });
}

if (comm === "concert-this") {
    band()
}
else if (comm === "spotify-this-song"){
    song()
}
else if (comm === "movie-this") {
    movie()
}
else if (comm === "do-what-it-says") {
    dothis()
}
else {
    console.log("Command not recognized");
}