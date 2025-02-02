const SpotifyWebApi = require('spotify-web-api-node');
let token_main = localStorage.getItem('spotify_access_token')
const token = token_main;

var credentials = {
  clientId: '7274681e5f564e29b6246893ed62f20a',
  clientSecret: '6c641ca17e444af4a111c84d7f83ddb9',
  redirectUri: 'http://localhost:3000/music',
  accessToken: token,
};



const spotifyApi = new SpotifyWebApi(credentials);
spotifyApi.setAccessToken(token);

spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE').then(
  function(data) {
    console.log('Artist albums', data.body.items.map(data => data.name));
  },
  function(err) {
    console.error(err);
  }
);