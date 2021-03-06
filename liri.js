require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
var axios = require("axios");
var moment = require("moment");
var fs = require("fs");
var sys = process.argv[2];
var myInput = process.argv.slice(3).join(" ");

if (sys === "concert-this") {
    bit();
} else if (sys === "spotify-this-song") {
    spot();
} else if (sys === "movie-this") {
    mov();
} else if (sys === "do-what-it-says") {
    any();
} else {
    console.log("You did not select an API to search on!");
}

function bit() {
    axios.get("https://rest.bandsintown.com/artists/" + myInput + "/events?app_id=codingbootcamp").then(
        function (response) {
            // Then we print out movie info
            console.log("-----------------------------------------------");
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
            console.log("-----------------------------------------------");
        }
    );
}
function bit2(myInput2) {
    axios.get("https://rest.bandsintown.com/artists/" + myInput2 + "/events?app_id=codingbootcamp").then(
        function (response) {
            // Then we print out movie info
            console.log("-----------------------------------------------");
            console.log("Venue: " + response.data[0].venue.name);
            console.log("Location: " + response.data[0].venue.city + ", " + response.data[0].venue.region);
            console.log("Date of event: " + moment(response.data[0].datetime).format("MM-DD-YYYY"));
            console.log("-----------------------------------------------");
        }
    );
}

function spot() {
 if (!myInput) {
      myInput = "The Sign Ace of Base" ;
    }
    spotify.search({ type: 'track', query: myInput }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      console.log("---------------------------------------------------");
      console.log("Artist: " + data.tracks.items[0].artists[0].name)
      console.log("Song: " + data.tracks.items[0].name);
      console.log("Preview: " + data.tracks.items[3].preview_url);
      console.log("Album: " + data.tracks.items[0].album.name);
      console.log("---------------------------------------------------");
  
    });
}
function spot2(myInput2) {
    if (!myInput2) {
         myInput2 = "The Sign Ace of Base" ;
       }
       spotify.search({ type: 'track', query: myInput2 }, function (err, data) {
         if (err) {
           return console.log('Error occurred: ' + err);
         }
         console.log("---------------------------------------------------");
         console.log("Artist: " + data.tracks.items[0].artists[0].name)
         console.log("Song: " + data.tracks.items[0].name);
         console.log("Preview: " + data.tracks.items[3].preview_url);
         console.log("Album: " + data.tracks.items[0].album.name);
         console.log("---------------------------------------------------");
     
       });
   }

function mov() {
    if (!myInput) {
        myInput = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + myInput + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // Then we print out movie info
            console.log("-----------------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("-----------------------------------------------");
        }
    );
}
function mov2(myInput2) {
    if (!myInput2) {
        myInput2 = "Mr. Nobody";
    }
    axios.get("http://www.omdbapi.com/?t=" + myInput2 + "&y=&plot=short&apikey=trilogy").then(
        function (response) {
            // Then we print out movie info
            console.log("-----------------------------------------------");
            console.log("Title: " + response.data.Title);
            console.log("Year: " + response.data.Year);
            console.log("Rated: " + response.data.Rated);
            console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value);
            console.log("Country: " + response.data.Country);
            console.log("Language: " + response.data.Language);
            console.log("Plot: " + response.data.Plot);
            console.log("Actors: " + response.data.Actors);
            console.log("-----------------------------------------------");
        }
    );
}

function any() {
    fs.readFile("random.txt", "utf8", function (error, data) {
        var arr = data.split(",");
        var sys = arr[0];
        var myInput2 = arr[1].split('"').join("");

        if (error) {
          return console.log(error);
        }
    
        if (sys === "concert-this"){
          bit2(myInput2);
        }
        if (sys === "spotify-this-song"){
          spot2(myInput2);
        }
        if (sys === "movie-this"){
          mov2(myInput2);
        }
    
      });
    }