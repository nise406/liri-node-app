require("dotenv").config();
var keys = require("./keys.js");
var request = require("request")
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);

var moment = require('moment');
moment().format();

var fs = require("fs")

var nodeArgs = process.argv;
var userInput = "";
var theUserInput = "";

for (var i = 3; i < nodeArgs.length; i++) {
    if (i > 3 && i < nodeArgs.length) {
        userInput = userInput + "%20" + nodeArgs[i];
    }
    else {
        userInput += nodeArgs[i];
    }
}

for (var i = 3; i < nodeArgs.length; i++) {
    theUserInput = userInput.replace(/%20/g, " ");
}

var userCommand = process.argv[2];
function runLiri() {
    switch (userCommand) {
        case "concert-this":
            fs.appendFileSync("log.txt", theUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });
            var queryURL = "https://rest.bandsintown.com/artists/" + userInput + "/events?app_id=codingbootcamp"
            request(queryURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var data = JSON.parse(body);
                    for (var i = 0; i < data.length; i++) {
                        console.log("Venue: " + data[i].venue.name);
                        fs.appendFileSync("log.txt", "Venue: " + data[i].venue.name + "\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                        if (data[i].venue.region == "") {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.country);
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });
                        } else {
                            console.log("Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country);
                            fs.appendFileSync("log.txt", "Location: " + data[i].venue.city + ", " + data[i].venue.region + ", " + data[i].venue.country + "\n", function (error) {
                                if (error) {
                                    console.log(error);
                                };
                            });
                        }
                        var date = data[i].datetime;
                        date = moment(date).format("MM/DD/YYYY");
                        console.log("Date: " + date)
                        fs.appendFileSync("log.txt", "Date: " + date + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                        console.log("----------------")
                    }
                }
            });
            break;
        case "spotify-this-song":
            if (!userInput) {
                userInput = "The%20Sign";
                theUserInput = userInput.replace(/%20/g, " ");
            }
            fs.appendFileSync("log.txt", theUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });
            spotify.search({
                type: "track",
                query: userInput
            }, function (err, data) {
                if (err) {
                    console.log("Error occured: " + err)
                }
                var info = data.tracks.items
                for (var i = 0; i < info.length; i++) {
                    var albumObject = info[i].album;
                    var trackName = info[i].name
                    var preview = info[i].preview_url
                    var artistsInfo = albumObject.artists
                    for (var j = 0; j < artistsInfo.length; j++) {
                        console.log("Artist: " + artistsInfo[j].name)
                        console.log("Song Name: " + trackName)
                        console.log("Preview of Song: " + preview)
                        console.log("Album Name: " + albumObject.name)
                        console.log("----------------")
                        //Append data to log.txt
                        fs.appendFileSync("log.txt", "Artist: " + artistsInfo[j].name + "\nSong Name: " + trackName + "\nPreview of Song: " + preview + "\nAlbum Name: " + albumObject.name + "\n----------------\n", function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                    }
                }
            })
            break;
        case "movie-this":
            if (!userInput) {
                userInput = "Mr%20Nobody";
                theUserInput = userInput.replace(/%20/g, " ");
            }
            fs.appendFileSync("log.txt", theUserInput + "\n----------------\n", function (error) {
                if (error) {
                    console.log(error);
                };
            });
            var queryURL = "https://www.omdbapi.com/?t=" + userInput + "&y=&plot=short&apikey=trilogy"
            request(queryURL, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    var info = JSON.parse(body);
                    console.log("Title: " + info.Title)
                    console.log("Release Year: " + info.Year)
                    console.log("IMDB Rating: " + info.Ratings[0].Value)
                    console.log("Rotten Tomatoes Rating: " + info.Ratings[1].Value)
                    console.log("Country: " + info.Country)
                    console.log("Language: " + info.Language)
                    console.log("Plot: " + info.Plot)
                    console.log("Actors: " + info.Actors)
                    fs.appendFileSync("log.txt", "Title: " + info.Title + "\nRelease Year: " + info.Year + "\nIMDB Rating: " + info.Ratings[0].Value + "\nRotten Tomatoes Rating: " +
                        info.Ratings[1].Value + "\nCountry: " + info.Country + "\nLanguage: " + info.Language + "\nPlot: " + info.Plot + "\nActors: " + info.Actors + "\n----------------\n",
                        function (error) {
                            if (error) {
                                console.log(error);
                            };
                        });
                }
            });
            break;
    }
}

if (userCommand == "do-what-it-says") {
    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function (error, data) {
        if (error) {
            return console.log(error)
        }
        var textArr = data.split(",");
        userCommand = textArr[0];
        userInput = textArr[1];
        theUserInput = userInput.replace(/%20/g, " ");
        runLiri();
    })
}

runLiri();