const SpotifyWebApi = require('spotify-web-api-node');
let token = localStorage.getItem('spotify_access_token')
import SpotifyPlayer from 'react-spotify-web-playback';

var credentials = {
  clientId: '7274681e5f564e29b6246893ed62f20a',
  clientSecret: '6c641ca17e444af4a111c84d7f83ddb9',
  redirectUri: 'http://localhost:3000/music',
  accessToken: token,
};



const spotifyApi = new SpotifyWebApi(credentials);

spotifyApi.setAccessToken(token);


//GET MY PROFILE DATA
function getMyData() {
  (async () => {
    const me = await spotifyApi.getMe();
    console.log(me.body);
    getUserPlaylists(me.body.id);
  })().catch(e => {
    console.error(e);
  });
}

//GET MY PLAYLISTS
async function getUserPlaylists(userName) {
  const data = await spotifyApi.getUserPlaylists(userName)

  console.log("---------------+++++++++++++++++++++++++Inside PlayList")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
   
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name,);
    console.log(tracks);

    const tracksJSON = { tracks }   
    let data = JSON.stringify(tracksJSON);
  }
}

//GET SONGS FROM PLAYLIST
async function getPlaylistTracks(playlistId, playlistName) {

  const data = await spotifyApi.getPlaylistTracks(playlistId, {
    offset: 1,
    limit: 100,
    fields: 'items'
  })

  // console.log('The playlist contains these tracks', data.body);
  // console.log('The playlist contains these tracks: ', data.body.items[0].track);
  // console.log("'" + playlistName + "'" + ' contains these tracks:');
  let tracks = [];

  for (let track_obj of data.body.items) {
    const track = track_obj.track
    tracks.push(track);
    console.log("Tracsk name and artists name "+ track.name + " : " + track.artists[0].name )
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();