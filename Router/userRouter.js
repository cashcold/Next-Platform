const express = require('express')
const User = require('../UserModel/userModel')
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

    const user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('Email already Exist')


    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const saveUser = new User({
        full_Name: req.body.full_Name,
        user_Name: req.body.user_Name,
        password: hashPassword,
        email: req.body.email,
        bitcoin: req.body.bitcoin,
        bitcoinCash: req.body.bitcoinCash,
        ethereum: req.body.ethereum,
        ip_address: req.body.ip_address,
        accountBalance: req.body.accountBalance,
        reffer: req.body.reffer
    })

    var mailgun = require('mailgun-js')({apiKey: process.env.API_key, domain: process.env.API_baseURL});
    var data = {
        from: 'PayItForward <payitforwardinvestmentlimited@gmail.com>',
        to: 'frankainoo@gmail.com',
        subject: 'Hello',
        text: 'Thank you for making Bussiness with us, Have a nice day. Thank You'
    };
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
  

    await saveUser.save()
    res.send("user save")

})

Router.post('/register', async(req,res)=>{


    const user = await User.findOne({email: req.body.email})
    if(user) return res.status(400).send('Email already Exist')


    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    const saveUser = new User({
        full_Name: req.body.full_Name,
        user_Name: req.body.user_Name,
        password: hashPassword,
        email: req.body.email,
        bitcoin: req.body.bitcoin,
        bitcoinCash: req.body.bitcoinCash,
        ethereum: req.body.ethereum,
        ip_address: req.body.ip_address,
        accountBalance: req.body.accountBalance,
        reffer: req.body.reffer
    })

    var mailgun = require('mailgun-js')({apiKey: process.env.API_key, domain: process.env.API_baseURL});
    var data = {
        from: 'PayItForward <payitforwardinvestmentlimited@gmail.com>',
        to: 'frankainoo@gmail.com',
        subject: 'Hello',
        text: 'Thank you for making Bussiness with us, Have a nice day. Thank You'
    };
    mailgun.messages().send(data, function (error, body) {
        console.log(body);
      });
  

    await saveUser.save()
    res.send("user save")

})


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

    var ebay = new Ebay({
      clientID: "CashCold-PRODUCTS-PRD-eac50eb8e-e3204a11",
      headers: {
        // optional
        "X-EBAY-C-MARKETPLACE-ID": "EBAY_GB" // For Great Britain https://www.ebay.co.uk
      }
    });

// Router.get('/ebay_produck_ckeck', (req,res) => {
//   ebay.findItemsByKeywords('iphone').then((data) => {
//    res.json(data);
// }, (error) => {
//     console.log(error);
// }); 
//     })

  





module.exports = Router;
