const express = require('express')
const axios = require('axios')
const bcrypt = require('bcryptjs')
const mailgun = require('mailgun-js')
const dotEnv = require('dotenv')
const jwt = require('jsonwebtoken')
const async = require('async')
const crypto = require('crypto')
const UserDeposit = require('../UserModel/depositModel')
var SpotifyWebApi = require('spotify-web-api-node');
var Ebay = require('ebay-node-api')

dotEnv.config()

const Router = express.Router()


Router.post('/register/', async(req,res)=>{

    
  User.findOne({reffer : req.params})
  // reffer program

  const user = await User.findOne({email: req.body.email})
  if(user) return res.status(400).send('Email already Exist')


  const salt = await bcrypt.genSalt(10)
  const hashPassword = await bcrypt.hash(req.body.password, salt)

  const saveUser = new User({ 
      full_name: req.body.full_name,
      user_Name: req.body.user_Name,
      accountBalance: req.body.accountBalance,
      restartLinkPassword: req.body.restartLinkPassword,
      password: hashPassword,
      email: req.body.email,
      referral: req.body.referral,
      phone: Number(req.body.phone),
      ip_address: req.body.ip_address,
      date: req.body.date
  })

  var mailgun = require('mailgun-js')({apiKey: process.env.API_key, domain: process.env.API_baseURL});
  var data = {
      from: 'Next-Platform <nextplatform99@gmail.com>',
      to: 'frankainoo@gmail.com',
      subject: 'Welcome To Next-Platform',
      text: 'Thank you for JJoing Next-platform as one Family, Have a nice day. Thank You'
  };
  mailgun.messages().send(data, function (error, body) {
      console.log(body);
  });


  await saveUser.save()
  res.send("user save")

})

Router.post('/marvel', async(req,res)=>{
  var Marvel = require('marvel')
 
  var marvel = new Marvel({ publicKey: "1a38b2b7e17525de3762d2dfd0ce396c", privateKey: "6eb16e205b1528ea154f67f4577f59d7fafc5912"})
  
  marvel.characters
    .name("SPIDER-MAN")
    .get(function(err, resp) {
      if (err) { console.log("Error: ", err) }
      // else { console.log(resp) }
      res.send(resp)

    })
})
Router.post('/rawg_video_games', async(req,res)=>{

  const options = {
    method: 'GET',
    url: 'https://rawg-video-games-database.p.rapidapi.com/games',
    headers: {
      'X-RapidAPI-Key': '26deb37eaamsh3f3919f4d771adfp14666bjsn99a8e15ee5c7',
      'X-RapidAPI-Host': 'rawg-video-games-database.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
    console.log(response.data);
    res.send(response.data)
  }).catch(function (error) {
    console.error(error);
  });

})


Router.post('/music', (req,res) => {
    const credentials = {
        clientId: '7274681e5f564e29b6246893ed62f20a',
        clientSecret: '6c641ca17e444af4a111c84d7f83ddb9',
        redirectUri: "http://localhost:3000/music",
      };
    
    //  setup 
        let spotifyApi = new SpotifyWebApi(credentials)
        const error = req.query.error;
        const code = req.body.code;
        // const code = req.query.code;
        console.log("this is code jest recieved "+code)
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
      
            
            res.json({access_token : access_token }),
      
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
    
    })

    Router.post('/sendToAll',(req,res)=>{
      let notification = {
        'title': 'Title of Notification',
        'text': 'we are checking notification for web wide'
      }

      let fcm_tokens = []

      let notification_body = {
        'notification': notification,
        'registration': fcm_tokens
      }

     axios.post('https://fcm.googleapis.com/fcm/send',{
       "header": {
         'Authorization': 'key='+'',
         'Content-Type': 'application/json'
       },
       "body": JSON.stringify(notification_body)
     }).then(()=>{
         res.status(200).sen('Notification send successfuly')
     })
     .catch((err)=>{
        res.status(400).sen('Something went wrong')
        console.log(err)
     })


    })

    

 


 

  





module.exports = Router;
