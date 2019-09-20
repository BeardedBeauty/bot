require('dotenv').config()
var axios = require("axios")
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var fs = require('fs');
console.log(keys.spotify.id)
var stupidfy = new Spotify({
    id: keys.spotify.id,
    secret: keys.spotify.secret
})

var comm = process.argv[2];
var input = process.argv.slice(3).join(" ");
var r;
var t = 0;
console.log("_______________________________________")

function doreplace(r) {
    r = r.replace(/spotify-this-song,/g, '')
    r = r.replace(/concert-this,/g, '')
    r = r.replace(/movie-this,/g, '')
    r = r.replace(/,/g, '');
    r = r.replace(/"/g, '');
    if (t === 1) {
        song(r)
    }
    else if (t === 2) {
        band(r)
    }
    else if (t === 3) {
        movie(r)
    }
    else if (t === 0) {
        console.log("?")
    }
    else {
        console.log(t)
    }
}

function band(r) {
    if (r === undefined) {
        r = input
    }
    axios.get("https://rest.bandsintown.com/artists/" + r + "/events?app_id=codingbootcamp").then(
        function (response) {
            var b = response.data
            for (var y = 0; y < b.length; y++) {
                var i = "";
                var p = "";
                var a = "";
                var o = b[y].datetime
                for (var u = 0; u < o.length; u++) {
                    if (u < 4) {
                        i = i + o[u]
                    }
                    if (u > 4 && u < 7) {
                        p = p + o[u]
                    }
                    if (u > 7 && u < 10) {
                        a = a + o[u]
                    }
                }
                console.log(b[y].venue.name, "\n", b[y].venue.city + ", " + b[y].venue.country, "\n", "Date: " + p + "/" + a + "/" + i, "\n")
            }
            // console.log(b)
            console.log("_______________________________________")
        }
    )
}

function movie(r) {
    if (r === undefined) {
        r = input
    }
    axios.get("http://www.omdbapi.com/?t=" + r + "&apikey=" + keys.omdb.key).then(
        function (response) {
            var m = response.data;
            console.log(m.Title, "\n", "Year: " + m.Year, "\n", m.Ratings[0].Source + ": " + m.Ratings[0].Value, "\n", m.Ratings[1].Source + ": " + m.Ratings[1].Value, "\n", m.Country, "\n", m.Language, "\n\n", "Plot: " + m.Plot, "\n\n", "Actors: " + m.Actors)
            console.log("_______________________________________")
        }
    )
}

function song() {
    console.log(stupidfy)
    stupidfy.search({ type: 'track', query: input }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0]);
    });
}

function dothis() {
    fs.readFile('random.txt', 'utf-8', function (err, data) {
        if (err) { throw err };
        r = data
        var q = data;
        var e = ("");
        for (var w = 0; w < q.length; w++) {
            e = e += r[w]
            if (e === "spotify-this-song,") {
                t = 1;
                doreplace(r)
            }
            else if (e === "concert-this,") {
                t = 2;
                doreplace(r)
            }
            else if (e === "movie-this,") {
                t = 3;
                doreplace(r)
            }
        }
    });
}

if (comm === "concert-this") {
    band()
}
else if (comm === "spotify-this-song") {
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