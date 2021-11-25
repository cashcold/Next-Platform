const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
var SpotifyWebApi = require('spotify-web-api-node');

dotEnv.config()


mongoose.connect(process.env.DataBaseConnecting,{ useNewUrlParser: true },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000
// const PORT_web = process.env.PORT || 3000

const JungleServer = express()

JungleServer.use(cors())
JungleServer.use(bodyParser.json())

JungleServer.use('/users',userRouter)

if(process.env.NODE_ENV === 'production'){
    JungleServer.use(express.static("client/build"))
    JungleServer.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}

const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];
  
// credentials are optional
var spotifyApi = new SpotifyWebApi({
    clientId: '7274681e5f564e29b6246893ed62f20a',
    clientSecret: '6c641ca17e444af4a111c84d7f83ddb9',
    redirectUri: 'http://localhost:3000/music'
  });
  
  
  JungleServer.get('/login_spotify', (req, res) => {

    res.redirect(spotifyApi.createAuthorizeURL(scopes));
  });
  
  JungleServer.get('/music', (req, res) => {
    const error = req.query.error;
    const code = req.query.code;
    console.log(code)
    const state = req.query.state;
  
    if (error) {
      console.error('Callback Error:', error);
      res.send(`Callback Error: ${error}`);
      return;
    }
  
    spotifyApi
      .authorizationCodeGrant(code)
      .then(data => {
        const access_token = data.body['access_token'];
        const refresh_token = data.body['refresh_token'];
        const expires_in = data.body['expires_in'];
  
        spotifyApi.setAccessToken(access_token);
        spotifyApi.setRefreshToken(refresh_token);
  
        console.log('access_token:', access_token);
        console.log('refresh_token:', refresh_token);
  
        console.log(
          `Sucessfully retreived access token. Expires in ${expires_in} s.`
        );
        res.send('Success! You can now close the window.');
  
        setInterval(async () => {
          const data = await spotifyApi.refreshAccessToken();
          const access_token = data.body['access_token'];
  
          console.log('The access token has been refreshed!');
          console.log('access_token:', access_token);
          spotifyApi.setAccessToken(access_token);
        }, expires_in / 2 * 1000);
      })
      .catch(error => {
        console.error('Error getting Tokens:', error);
        res.send(`Error getting Tokens: ${error}`);
      });
  });

JungleServer.listen(PORT,()=>{
    console.log(`server is runing on local Port Number ${PORT}`)
})
// JungleServer.listen(PORT,()=>{
//     console.log(`server is runing on local Port WEb ${PORT_web}`)
// })