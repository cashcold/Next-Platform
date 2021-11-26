const fs = require('fs')
const SpotifyWebApi = require('spotify-web-api-node');
const token = "BQAkBL4V5YwzNegmUONWjKUuY_gdN-9zPhsk3B62v1y1friJbs6OovwxV9w_jzSN0R7Dfq8Yd4or3phRY3EiNEaCTl2hSCnQlhN5vcRGkC2TrllHB4lOTHdaEb42xwpylTJ0v67sKcWaSmdskqVGd14QhK9Yl5FcIMS9oPU4_vBhQes9Sbqu5q1GHTMX2bxhC94MwbvAPpTkV3ZvIaSvF6TzKI6wtNtfkTWqGSYBmnBCzVGoFt1peHzOIfhZl9OOgJLVLa8koxnMM1_rOObzsESuBHiHvz8lgS_i2jwFLPxh6apT69sC";

const spotifyApi = new SpotifyWebApi();
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

  console.log("---------------+++++++++++++++++++++++++")
  let playlists = []

  for (let playlist of data.body.items) {
    console.log(playlist.name + " " + playlist.id)
    
    let tracks = await getPlaylistTracks(playlist.id, playlist.name);
    // console.log(tracks);

    const tracksJSON = { tracks }
    let data = JSON.stringify(tracksJSON);
    // fs.writeFileSync(playlist.name+'.json', data);
    localStorage.setItem('dataFromSpotify', data)
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
    console.log(track.name + " : " + track.artists[0].name)
  }
  
  console.log("---------------+++++++++++++++++++++++++")
  return tracks;
}

getMyData();