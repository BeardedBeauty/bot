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
    if (r === undefined) {
        r = input
    }
    stupidfy.search({ type: 'track', query: r }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        var d = data.tracks.items[0]
        console.log("Artist: " + d.album.artists[0].name + "\n" + "Track: " + d.name + "\n" + d.external_urls.spotify + "\n" + "Album: " + d.album.name);
        console.log("_______________________________________")
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
    console.log("I urge you to give a proper command, human");
}

// {
//     album:
//     {
//         album_type: 'album',
//             artists: [[Object]],
//                 available_markets:
//         ['AT',
//             'BE',
//             'CA',
//             'CH',
//             'DE',
//             'ES',
//             'FR',
//             'GB',
//             'IE',
//             'IT',
//             'LU',
//             'NL',
//             'US'],
//             external_urls:
//         { spotify: 'https://open.spotify.com/album/6lj5yJ6EevwWGpNMYClMyv' },
//         href: 'https://api.spotify.com/v1/albums/6lj5yJ6EevwWGpNMYClMyv',
//             id: '6lj5yJ6EevwWGpNMYClMyv',
//                 images: [[Object], [Object], [Object]],
//                     name: 'A Twist In The Myth',
//                         release_date: '2006-09-01',
//                             release_date_precision: 'day',
//                                 total_tracks: 11,
//                                     type: 'album',
//                                         uri: 'spotify:album:6lj5yJ6EevwWGpNMYClMyv'
//     },
//     artists:
//     [{
//         external_urls: [Object],
//         href: 'https://api.spotify.com/v1/artists/7jxJ25p0pPjk0MStloN6o6',
//         id: '7jxJ25p0pPjk0MStloN6o6',
//         name: 'Blind Guardian',
//         type: 'artist',
//         uri: 'spotify:artist:7jxJ25p0pPjk0MStloN6o6'
//     }],
//         available_markets:
//     ['AT',
//         'BE',
//         'CA',
//         'CH',
//         'DE',
//         'ES',
//         'FR',
//         'GB',
//         'IE',
//         'IT',
//         'LU',
//         'NL',
//         'US'],
//         disc_number: 1,
//             duration_ms: 244897,
//                 explicit: false,
//                     external_ids: { isrc: 'DED830693511' },
//     external_urls:
//     { spotify: 'https://open.spotify.com/track/26u1TE0P1pLmUDyLzkitI1' },
//     href: 'https://api.spotify.com/v1/tracks/26u1TE0P1pLmUDyLzkitI1',
//         id: '26u1TE0P1pLmUDyLzkitI1',
//             is_local: false,
//                 name: 'Carry The Blessed Home',
//                     popularity: 23,
//                         preview_url:
//     'https://p.scdn.co/mp3-preview/adb5535373527e4ab4a78ab540d768fcdfe4d741?cid=73cc80dfabb9460d95f88b4864ae4e71',
//         track_number: 5,
//             type: 'track',
//                 uri: 'spotify:track:26u1TE0P1pLmUDyLzkitI1'
// }
