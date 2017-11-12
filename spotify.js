var SpotifyWebApi = require('spotify-web-api-node');

// // credentials are optional
// const spotifyApi = new SpotifyWebApi({
//     clientId: 'af76f0bf4ec84fb298ef17da228841aa',
//     clientSecret: '8a354e3a8c874fb28beef134ec8eefa0',
//     redirectUri: 'http://localhost:8888/callback'
// });




// // spotifyApi.setAccessToken('BQB6cbG4BNq7_FSYBzxxb2WTztoy3x8oQEn0uP1kQVYX2heJ44g7_-qWbEZWapepGhjoDJW4wNy89IEviPomlQ');
// // Set an access token.
// // This is required as Spotify implemented a new auth flow since May 2017.
// // See https://developer.spotify.com/news-stories/2017/01/27/removing-unauthenticated-calls-to-the-web-api/
// spotifyApi.clientCredentialsGrant().then(function(data) {
//     console.log('The access token expires in ' + data.body['expires_in']);
//     console.log('The access token is ' + data.body['access_token']);
//     // Save the access token so that it's used in future calls
//     spotifyApi.setAccessToken(data.body['access_token']);
// }, function(err) {
//     console.log('Something went wrong when retrieving an access token', err.message);
// });




// spotifyApi.getArtist('/artist/:kanye')
//     .then(function(data) {
//         console.log('Artist albums', data.body);
//     }, function(err) {
//         console.error(err);
//     });






// Set necessary parts of the credentials on the constructor
var spotifyApi = new SpotifyWebApi({
    clientId: 'af76f0bf4ec84fb298ef17da228841aa',
    clientSecret: '8a354e3a8c874fb28beef134ec8eefa0',
    redirectUri: 'http://localhost:8888/callback'
});