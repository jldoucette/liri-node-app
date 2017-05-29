var Twitter=require('twitter');
var spotify=require('spotify');
var request=require('request');
var keys = require("./keys.js");
var fs=require('fs');
var inputRequest=process.argv[2];
var searchRequest=process.argv[3];
var consumerKey=keys.twitterKeys.consumer_key;
var consumerSecret=keys.twitterKeys.consumer_secret;
var accessTokenKey=keys.twitterKeys.access_token_key;
var accessTokenSecret=keys.twitterKeys.access_token_secret;

function processInput() {
switch (inputRequest) {
case 'my-tweets':
tweets();
break;
case 'spotify-this-song':
spotifysong();
break;
case 'movie-this':
movieinfo();
break;
case 'do-what-it-says':
doit();
break;
}
}
processInput();
function tweets() {
	console.log("Tweets");
var client = new Twitter({
  consumer_key: consumerKey,
  consumer_secret: consumerSecret,
  access_token_key: accessTokenKey,
  access_token_secret: accessTokenSecret
});
var params = {screen_name: 'jldoucette_bcs',
count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
     var logEntry="\n --------------Last 20 Tweets-------------- "
    fs.appendFile("log.txt",logEntry,function(err) {
     if (err){console.log(err);
     }  
  });
    for (i=0;i<tweets.length;i++){
    console.log("Tweet: "+tweets[i].text+" Tweeted at: "+tweets[i].created_at);
      var logEntry="\n Tweet----- "+tweets[i].text+" ----- Tweeted at: "+tweets[i].created_at
    fs.appendFile("log.txt",logEntry,function(err) {
     if (err){console.log(err);
     }  
  });
    }
  }
  else if (error) {
    console.log(error);
  }
});
}

function spotifysong() {
	console.log("Spotify This Song");
    if (searchRequest==null) {
        searchRequest='"The Sign"';
        console.log('SearchRequest: '+searchRequest);
    }
	spotify.search({ type: 'track', query: searchRequest }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
        else {
        	var artistName=data.tracks.items[0].album.artists[0].name;
            var songName=data.tracks.items[0].album.name;
            var albumName=data.tracks.items[0].name;
            var previewLink=data.tracks.items[0].preview_url;

            console.log("Artist: " +artistName);
            console.log("Song Name: "+songName);
            console.log("Preview Link: "+previewLink);
        	  console.log("Album Name: "+albumName);
             var logEntry="\n --------------Song Lookup-------------- \n Artist: "+
             artistName + "\n Song Name: " + songName + "\n Preview Link: " + previewLink+ "\n Album Name: " +albumName
    fs.appendFile("log.txt",logEntry,function(err) {
     if (err){console.log(err);
     }  
  });
        }
});
}

function movieinfo() {
	console.log("Movie Info");
  if (searchRequest==null) {
    searchRequest="mr+nobody";
  }

request("https://www.omdbapi.com/?t="+searchRequest+"&apikey=b16fa115", function(error, response, body) {
  if (!error && response.statusCode === 200) {
    var title=JSON.parse(body).Title;
    var year=JSON.parse(body).Year;
    var IMDBRating=JSON.parse(body).imdbRating; 
    var country=JSON.parse(body).Country;
    var language=JSON.parse(body).Language;
    var plot=JSON.parse(body).Plot;
    var actors=JSON.parse(body).Actors;
    console.log("Title: "+title + "\n Year: " + year + "\n IMDBRating: " + 
    IMDBRating+ "\n Country: " +country+ "\n Language: " +
    language+ "\n Plot: " +plot+ "\n Actors: " +
    actors+"\n Rotten Tomato's URL: No Longer Available");
    console.log("The movie's rating is: " + JSON.parse(body).imdbRating);
    var logEntry="\n --------------Movie Lookup-------------- \n Title: "+
    title + "\n Year: " + year + "\n IMDBRating: " + IMDBRating+ "\n Country: " +
    country+ "\n Language: " +language+ "\n Plot: " +
    plot+ "\n Actors: " +actors+"\n Rotten Tomato's URL: No Longer Available"
    fs.appendFile("log.txt",logEntry,function(err) {
     if (err){console.log(err);
     }  
  });
  }
  else if (error) {
    console.log(error);
  }
});
}

function doit() {
	console.log("Do This Thing");
fs.readFile('random.txt', "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  else {
    var randomArr=data.split(',');
    inputRequest=randomArr[0];
    searchRequest=randomArr[1];
    processInput();
}
});
}
