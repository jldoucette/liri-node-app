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
console.log("Client keys"+client);
var params = {screen_name: 'jldoucette_bcs',
count:20};
client.get('statuses/user_timeline', params, function(error, tweets, response) {
  if (!error) {
    for (i=0;i<tweets.length;i++){
    console.log("Tweet: "+tweets[i].text+" Tweeted at: "+tweets[i].created_at);
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
        }
});
}

function movieinfo() {
	console.log("Movie Info");

}

function doit() {
	console.log("Do This Thing");
fs.readFile('random.txt', "utf8", function(err, data) {
  if (err) {
    return console.log(err);
  }
  else {
    var randomArr=data.split(',');
    console.log("randomArr "+randomArr);
    inputRequest=randomArr[0];
    searchRequest=randomArr[1];
    console.log("New inputRequest: "+inputRequest);
    console.log("New searchRequest: "+searchRequest);
    console.log("Random.txt data: "+data);
    processInput();

}
  

});
}
