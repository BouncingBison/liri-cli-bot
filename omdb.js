// Call OMDB API with request package.




var processInitialAnswer = function(answers) {
    switch (answers.command) {
        case 'my-tweets':
            twitterCall();
            break;
        case 'spotify-this-song':
            if (!answers.query) {
                followUpQuestion(spotifyFollowUp);
            } else {
                answers.song = answers.query;
                answers.artist = '';
                spotifyCall(answers);
            }
            break;
        case 'movie-this':
            if (!answers.query) {
                followUpQuestion(movieFollowUp);
            } else {
                answers.movie = answers.query;
                omdbCall(answers);
            }
            break;
        case 'do-what-it-says':
            doWhatItSays();
            break;
    }
};

var omdbCall = function(answers) {
    if (answers.movie.length === 0) {
        answers.movie = 'Mr. Nobody';
    }
    request('http://www.omdbapi.com/?t=' + answers.movie + '&y=&plot=short&r=json&tomatoes=true', function(error, response) {
        var body = JSON.parse(response.body);
        if (!error && response.statusCode === 200 && body.Error === undefined) {
            console.log(chalk.yellow('\nResults:'));
            console.log('  Title: ' + body.Title);
            console.log('  Release Year: ' + body.Year);
            console.log('  IMDB Rating: ' + body.imdbRating);
            console.log('  Country: ' + body.Country);
            console.log('  Language: ' + body.Language);
            console.log('  Actors: ' + body.Actors);
            console.log('  Rotten Tomatoes Rating: ' + body.tomatoRating);
            console.log('  Rotten Tomatoes URL: ' + body.tomatoURL);
        } else {
            console.log('\nSorry, an error occurred. Please check your query and try again.');
        }
    });
    setTimeout(repeatPrompt, 1000);
};