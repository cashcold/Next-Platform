import express from 'express'
import User from '../UserModel/userModel.js'
import bcrypt from 'bcryptjs'
import mailgun from 'mailgun-js'
import dotEnv from 'dotenv'
import jwt from 'jsonwebtoken'
import async from 'async'
import crypto from 'crypto'
import UserDeposit from '../UserModel/depositModel'

dotEnv.config()

const Router = express.Router() 



// Router.post('/login', async(req,res)=>{
//     const user = await User.findOne({email: req.body.email})
//     if(!user) {
//         return res.status(400).send('Email Do Not Exist')
//     }

//     await bcrypt.compare(req.body.password, user.password,(err,isMatch)=>{
//         if(!isMatch) return res.status(400).send('Invalid Password ')
//         else{
//             const payload = {
                
//                  full_Name: user.full_Name,
//                  user_Name: user.user_Name,
//                  email: user.email,
//                  password: user.password,
//                  bitcoin: user.bitcoin,
//                  bitcoinCash: user.bitcoinCash,
//                  ethereum: user.ethereum,
//                  ip_address: user.ip_address,           
//                  date: user.Date,
//                  accountBalance: user.accountBalance
//             }
//             const token = jwt.sign(payload, process.env.TokenSecret)
//             res.header('x-access-token', token)
//             return res.status(200).send(token)
//         }
//     })
// })
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

    

 


 

  





module.exports = Router;
