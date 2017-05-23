var twitter=require('twitter');
var spotify=require('spotify');
var request=require('request');
var inputRequest=process.argv[2];


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

function tweets() {
	console.log("Tweets");
}

function spotifysong() {
	console.log("Spotify This Song");
	spotify.search({ type: 'track', query: 'The Adventure' }, function(err, data) {
    if ( err ) {
        console.log('Error occurred: ' + err);
        return;
    }
        else {
        	console.log(JSON.stringify(data,null,2));
        	var responseData=JSON.stringify(data);
        	// var artistName=responseData.artists[0].name;
        	// console.log(artistName);
        }
    
 
    // Do something with 'data' 
});
}

function movieinfo() {
	console.log("Movie Info");

}

function doit() {
	console.log("Do This Thing");
}