// //  our keys file will supply these
// var keys = require('./keys');
// var tweetKeys = keys.twitterKeys;
// var spotifyKeys = keys.spotifyKeys;
// // end of keys 

// requiring our modules. 
var Twitter = require('twitter');
var spotapi = require('node-spotify-api');
var inquirer = require('inquirer');
var colors = require('colors');
var fs = require('fs');
var clear = require("cli-clear");
var Twit = require('twit');
// var Spotify = require('node-spotify-api');
var spotify = require('spotify');
var Spotify = require('spotify');
var request = require('request');
// var config = require('./config');
// var Twitter = new Twit(config);
// end of modules 


//doing some inquirer work to gather user inputs 

// Initial question.
var mainQuestion = {
    type: 'list',
    name: 'command',
    message: 'What would you like me to do?',
    choices: [{
            name: 'My Tweets',
            value: 'my-tweets'
        },
        {
            name: 'Spotify this Song',
            value: 'spotify-this-song'
        },
        {
            name: 'Let me clear the terminal of clutter for you.',
            value: 'clear'
        },
        {
            name: 'Do What It Says',
            value: 'do-what-it-says'
        },
        {
            name: 'Movie',
            value: 'movie-this'
        }
    ]
};


var handleSpotifyAnswer = function() {};

// Handle first answer.
var secondSet = function(answers) {
    switch (answers.command) {
        case 'my-tweets':
            twitterWork();
            break;
        case 'spotify-this-song':
            if (!answers.query) {;
            } else {
                answers.song = answers.query;
                answers.artist = '';
                spotifyCall(answers);
            }
        case 'clear':
            clear();
            setTimeout(repeatPrompt, 1000);
            break;
        case 'movie-this':
            if (!answers.query) {
                followUpQuestion(movieFollowUp);
            } else {
                answers.movie = answers.query;
                omdbCall(answers);
            }
            break;
    }
};




// Run initial prompt.
mainPrompt();
// Initial question inquirer prompt.
function mainPrompt() {

    inquirer.prompt(mainQuestion).then(secondSet);

}

var repeatPrompt = function() {
    inquirer.prompt({
        name: 'repeat',
        message: 'Hit "Enter" to see the main menu again',
        type: 'confirm'
    }).then(function(answer) {
        if (answer.repeat) {
            mainPrompt();
        } else {
            console.log('Goodbye');
            stop();
        }
    });
};





// 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣  🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣
// twitter function 
var twitterWork = function() {
        //initializing Twit and passing it our twitter keys 
        // in a future version this will be a variable to be passed in from another file 
        var T = new Twit({
                consumer_key: '1NSNGuPmnRb3GLi2EX6dDAOdy',
                consumer_secret: 'hSkMPMId1u4QQ7fgcqf2XZGNifSuGBVY0GPtNVwHm7kAtQ1OeX',
                access_token: '901201189831933954-Lj4Iq6QfOnTpfydfly9BvtXhKKi2DRw',
                access_token_secret: 'SKMPdHbKLuR7eamYHsBlgQa5FfhRju2ypB1U3rppJQ5k7',
                timeout_ms: 60 * 1000, // optional HTTP request timeout to apply to all requests.
            })
            // find latest tweet according the query 'q' in params
        var retweet = function() {
                var params = {
                    q: '#chickenwings, #wings', // REQUIRED
                    result_type: 'recent',
                    lang: 'en'
                }
                T.get('search/tweets', params, function(err, data) {
                    // if there no errors
                    if (!err) {
                        // grab ID of tweet to retweet
                        var retweetId = data.statuses[0].id_str;
                        // Tell TWITTER to retweet
                        T.post('statuses/retweet/:id', {
                            id: retweetId
                        }, function(err, response) {
                            if (response) {
                                console.log('Retweeted!!!');
                            }
                            // if there was an error while tweeting
                            if (err) {
                                console.log('Error occured while attempting to retweet');
                            }
                        });
                    }
                    // if unable to Search a tweet
                    else {
                        console.log('Unable search for tweets');
                    }
                });
            }
            // grab & retweet as soon as program is running...
        retweet();
        // retweet interval 
        setInterval(retweet, 10000);




        T.get('search/tweets', { q: 'chicken wings since:2011-07-11', count: 10000 }, function(err, data, response) {
            fs.appendFile('chicken-wing-archive.txt', "########### new chicken wing news ###########");


            console.log(JSON.stringify(data['text']));
            console.log(JSON.stringify(data.statuses['text']));
            // fs.appendFile('chicken-wing-archive.txt', data.screen_name);
            // fs.appendFile('chicken-wing-archive.txt', Date());
        })




        T.post('statuses/update', { status: 'hi guys' }, function(err, data, response) {
            console.log("POST POST POST ");

        });
        setTimeout(repeatPrompt, 9000);
    }
    // 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣  🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣 🐔 🐧 🐦 🐤 🐣







// OMDB 
//  📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽
var movieFollowUp = [{
    type: 'input',
    name: 'movie',
    message: 'What movie would you like me to tell you about?'
}];

var movieKey = '40e9cece';

console.log("movie key is:" + movieKey);

// Call OMDB API with request package.
var omdbCall = function(answers) {
    if (answers.movie.length === 0) {
        answers.movie = 'Mr. Nobody';
    }
    request('http://www.omdbapi.com/?apikey=' + movieKey + '&t=' + answers.movie + '&y=&plot=short&r=json&tomatoes=true', function(error, response) {
        var body = JSON.parse(response.body);
        if (!error && response.statusCode === 200 && body.Error === undefined) {

            console.log('##########################################\n');
            console.log('Results:');
            console.log('  Title: ' + body.Title);
            console.log('  Release Year: '.yellow + body.Year);
            console.log('  IMDB Rating: '.yellow + body.imdbRating);
            console.log('  Country: '.yellow + body.Country);
            console.log('  Language: '.yellow + body.Language);
            console.log('  Actors: '.yellow + body.Actors);
            console.log('  Rotten Tomatoes Rating: '.yellow + body.tomatoRating);
            console.log('  Rotten Tomatoes URL: '.yellow + body.tomatoURL);
            console.log('##########################################\n');
            fs.appendFile('watchlist.txt', "\n##########################################\n");
            fs.appendFile('watchlist.txt', body.Title);
            fs.appendFile('watchlist.txt', body.Year);
            fs.appendFile('watchlist.txt', body.imdbRating);
            fs.appendFile('watchlist.txt', body.Country);
            fs.appendFile('watchlist.txt', body.Language);
            fs.appendFile('watchlist.txt', body.Actors);
            fs.appendFile('watchlist.txt', body.tomatoRating);
            fs.appendFile('watchlist.txt', body.tomatoURL);
            fs.appendFile('watchlist.txt', "\n ##########################################\n");

        } else {
            console.log('An error occurred, please try again');
        }
    });
    setTimeout(repeatPrompt, 10000);
};

//  📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽 📹 🎥 📽








// SPOTIFY 
// 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔈 🔇 🔉 🔊 🔈 🔇 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔈 🔇 🔉 🔊 🔈 🔇 🔉 🔊
function followUpQuestion(answers) {
    var spotifyFollowUp = [{
            type: 'input',
            name: 'song',
            message: 'what is the song you would like to search for?'
        },
        {
            type: 'input',
            name: 'artist',
            message: 'Optional: what artist should i search for as well?',
            when: function(answers) {
                return answers.song.length > 0;
            }
        }
    ];
    return spotifyFollowUp;
};
spotify.search({ type: 'track', query: 'dancing in the moonlight' }, function(err, data) {
    if (err) {
        console.log('Error occurred: ' + err);
        return;
    }
    // Do something with 'data' 
});
// Display the results from Spotify.
var displaySpotifyResults = function(err, data) {
    if (err || data.tracks.items.length === 0) {
        console.log('\nSorry, an error occurred. Please check your query and try again.');
    } else {
        console.log('\nResults:');
        console.log('  Artist: ' + data.tracks.items[0].artists[0].name);
        console.log('  Track Name: ' + data.tracks.items[0].name);
        console.log('  Song preview: ' + data.tracks.items[0].preview_url);
        console.log('  Album: ' + data.tracks.items[0].album.name);
    }
    setTimeout(repeatPrompt, 1000);
};
spotify

// Inquirer prompt for follow-up questions.
var followUpQuestion = function(type) {
    console.log('');
    inquirer.prompt(type).then(
        function(answers) {
            switch (type[0].name) {
                case 'twitterUsername':
                    twitterCall(answers);
                    break;
                case 'song':
                    spotifyCall(answers);
                    break;
                case 'movie':
                    omdbCall(answers);
                    break;
            }
        }
    );
};

// function mySpotify() {
//     console.log("starting the spotify search app..");
//     prompt.start();
//     console.log("Prompt success - Lets start by asking you some questions");
//     prompt.get({
//             properties: {
//                 spotifySelection: {
//                     description: colors.yellow("pick a song, any song")
//                 }
//             }
//         }),
//         function(err, result) {
//             spotifySelection = result.spotifySelection;
//             console.log("working on it");
//             spotify.search({
//                 type: 'track',
//                 query: spotifySelection
//             }, function(err, data) {
//                 if (err) {
//                     return console.log('Error occurred: ' + err);
//                 }
//                 console.log(data);
//             });
//         }
// }
// 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔈 🔇 🔉 🔊 🔈 🔇 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔇 🔈 🔉 🔊 🔈 🔇 🔉 🔊 🔈 🔇 🔉 🔊