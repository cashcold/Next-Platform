const express = require('express')
const mongoose = require('mongoose'); 
const { google } = require('googleapis');
const User = require('../UserModel/userModel')
const Accessory = require('../UserModel/accessory')
const Product = require('../UserModel/Product');
const axios = require('axios')
const bcrypt = require('bcryptjs')
const mailgun = require('mailgun-js')
const dotEnv = require('dotenv')
const jwt = require('jsonwebtoken')
const async = require('async')
const crypto = require('crypto')
const UserDeposit = require('../UserModel/depositModel')
const WithdrawDeposit = require('../UserModel/widthdraw')
const ReferralReward = require('../UserModel/ReferralReward')
var SpotifyWebApi = require('spotify-web-api-node');
var Ebay = require('ebay-node-api')

dotEnv.config()

const Router = express.Router()

const rawYoutubeApiKey = process.env.YOUTUBE_API_KEY || '';
const youtubeApiKey = rawYoutubeApiKey.trim();

if (!youtubeApiKey) {
  console.warn('Warning: YOUTUBE_API_KEY not set in Router/userRouter.js');
} else {
  console.log('Router YOUTUBE_API_KEY loaded:', youtubeApiKey.slice(0, 10) + '...');
}

const youtube = google.youtube({
  version: 'v3',
  auth: youtubeApiKey
});

const getInfluentialQuery = () => {
  const todayStr = new Date().toISOString().split('T')[0];
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];

  // Core targets with structural keyword weights
  const coreQueries = "(football highlights tactical masterclass) | (soccer breaking news transfer) | (exclusive football interview post-match)";
  const dateRange = `${yesterdayStr} or ${todayStr}`;
  // Strict filter to discard video game footage or text-to-speech slideshows
  const negativeFilters = "-FIFA -PES -eFootball -simulation -gaming -slideshow";

  return `${coreQueries} ${dateRange} ${negativeFilters}`;
};


Router.post("/registerNewUser", async (req, res) => {
  try {
    console.log("Getting from the body:", req.body);

    const { user_Name, email, password, phone, country, referrer, accountBalance, refferReward, offer } = req.body;

    // Validate fields
    if (!user_Name || !email || !password) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "Email already exists" });

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    // Create User Object
    const newUser = new User({
      user_Name,
      email,
      password: hashPassword,
      phone: Number(phone),
      country,
      referrer,
      accountBalance: Number(accountBalance) || 0,
      refferReward: refferReward !== undefined ? Number(refferReward) : 0,
      offer: offer !== undefined ? Number(offer) : 0,
    });

    console.log("User object before saving live:", newUser); // ✅ Debugging

    // Save user
    await newUser.save();

    // Configure Nodemailer
    const nodemailer = require("nodemailer");
    const transporter = nodemailer.createTransport({
      host: "mail.nextplatformlive.com", // Replace with your SMTP host
      port: 465, // Use 587 for TLS or 465 for SSL
      secure: true, // True for SSL, false for TLS
      auth: {
        user: "support@nextplatformlive.com", // Replace with your email
        pass: process.env.SMTP_PASS, // Replace with your email password (use environment variables for security)
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL verification
      },
    });

    // Email options
    const mailOptions = {
      from: '"Next-Platform" <support@nextplatformlive.com>', // Sender address
      to: email, // Recipient's email
      subject: `Welcome to Next-Platform, ${user_Name}!`, // Subject line
      html: `
      <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
        <h1 style="color: #2c3e50; text-align: center;">Welcome to [Your App Name]!</h1>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Hi ${user_Name},
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          We're thrilled to have you join us at [Your App Name] – the ultimate entertainment platform where your time is valuable!
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Enjoy watching videos, playing games, and engaging with content while earning rewards. The more time you spend, the more you earn!
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Start exploring now and make every moment count. If you need any assistance, our support team is here for you.
        </p>
        <p style="font-size: 16px; color: #555; line-height: 1.6;">
          Happy earning!<br>
          The Next-Platform Team
        </p>
      </div>

      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending failed:", error);
        return res.status(500).json({ message: "User registered but email not sent." });
      }
      console.log("Email sent:", info.response);
    });

    res.status(201).json({ message: "User registered successfully and welcome email sent.", user: newUser });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

Router.post('/login', async(req,res)=>{
  const user = await User.findOne({email: req.body.email})
  if(!user) {

      return res.status(400).send('Email Do Not Exist')
  } 

  await bcrypt.compare(req.body.password, user.password,(err,isMatch)=>{
      if(!isMatch) return res.status(400).send('Invalid Password ')
      else{
          const payload = {
               user_id: user._id,
               user_Name: user.user_Name,
               phone: user.phone,
               refferReward: user.refferReward,
               email: user.email,
               referrer: user.referrer,
               country: user.country,
               password: user.password,
              //  ip_address: user.ip_address,           
              //  date: user.date,
          }
          const token = jwt.sign(payload, process.env.TokenSecret)
          res.header('x-access-token', token)
          return res.status(200).send(token)
      }
  })
})

Router.post('/forgotpassword', async (req, res) => {
  try {
    const userEmail = req.body.email;

    // Generate a token
    const token = crypto.randomBytes(20).toString('hex');

    // Find the user by email
    const user = await User.findOne({ email: userEmail });
    if (!user) {
      return res.status(400).json({ message: 'Email not found' });
    }

    // Save the token and expiration time to the user object
    user.restartLinkPassword = token;
    user.resetPasswordExpires = Date.now() + 3600000; // Token valid for 1 hour
    await user.save();

    // Configure Nodemailer
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({
      host: "mail.nextplatformlive.com", // Replace with your SMTP host
      port: 465, // Use 587 for TLS or 465 for SSL
      secure: true, // True for SSL, false for TLS
      auth: {
        user: "support@nextplatformlive.com", // Replace with your email
        pass: process.env.SMTP_PASS, // Replace with your email password (use environment variables for security)
      },
      tls: {
        rejectUnauthorized: false, // Bypass SSL verification
      },
    });

    // Email options
    const mailOptions = {
      from: '"Next-Platform Support" <support@nextplatformlive.com>', // Sender address
      to: userEmail, // Recipient's email
      subject: 'Password Reset Request', // Subject line
      html: `
        <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
          <h1 style="color: #2c3e50; text-align: center;">Password Reset Request</h1>
          
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            Hi ${user.user_Name},
          </p>
          <p style="font-size: 16px; color: #555; line-height: 1.6;">
            We received a request to reset your password. Please click the button below to reset your password. If you did not request this, you can safely ignore this email.
          </p>
    
          <div style="text-align: center; margin: 30px 0;">
            <a href='${process.env.forgotPasswordLink}/${token}' 
              style="font-size: 18px; background-color: #28a745; color: white; text-decoration: none; padding: 10px 20px; border-radius: 5px; display: inline-block;">
              Reset Your Password
            </a>
          </div>
    
          <p style="font-size: 14px; color: #999;">
            Alternatively, you can copy and paste the following link into your browser:
          </p>
    
          <p style="font-size: 14px; color: #3498db;">
            <a href='${process.env.forgotPasswordLink}/${token}' style="color: #3498db; word-break: break-all;">
              ${process.env.forgotPasswordLink}/${token}
            </a>
          </p>
    
          <p style="font-size: 14px; color: #555; line-height: 1.6;">
            Thanks,<br>
            The Next-Platform Team
          </p>
    
          <p style="font-size: 12px; color: #999; text-align: center; margin-top: 30px; line-height: 1.4;">
            If you didn’t request a password reset, you can safely ignore this email.<br>
            Please do not reply to this email as it is an automated message.
          </p>
        </div>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Email sending failed:", error);
        return res.status(500).json({ message: "Failed to send password reset email." });
      }
      console.log("Email sent:", info.response);
      res.status(200).json({ message: "Password reset link sent to your email address." });
    });
  } catch (error) {
    console.error("Error in forgot password:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});


Router.post('/activtypassword/:token', async(req,res)=>{
   
  User.findOne({restartLinkPassword : req.params.token})
  .then(user=>{
      if(!user){
          return res.status(422).json({error:"Invalid token"})
      }
      bcrypt.genSalt(10, function(err, salt) {
          bcrypt.hash(req.body.password, salt, function(err, hash) {
          user.password = hash
          user.restartLinkPassword = undefined
          user.save().then((saveduser)=>{
              res.json({message:"password updated success"})
          })

          });
       });
      
  }).catch(err=>{
      console.log(err)
  })
})

Router.get('/newusers', async (req, res) => {
  try {
    const response = await axios.get('https://randomuser.me/api/?results=20'); // Fetch 5 users
    const users = response.data.results.map(user => ({
      username: `${user.name.first} ${user.name.last}`,
      country: user.location.country,
      gender: user.gender,
      image: user.picture.medium ,// Get medium-sized profile image
      status: Math.random() > 0.5 ? 'online' : 'offline' // Randomly assign online/offline status
    }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});


Router.post('/api/sessionStart', async (req, res) => {
  const { userId } = req.body;

  try {
      const user = await User.findById(userId);

      if (user) {
          user.sessionStart = new Date();  // Set the session start time to the current time
          await user.save();
          res.json({ message: "Session started", sessionStart: user.sessionStart });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error starting session:', error);
      res.status(500).json({ error: 'Server error' });
  }
});


Router.post('/api/updateBalance', async (req, res) => {
  const { user_id, timeSpent } = req.body;



  try {
      // Find the user by ID
      const user = await User.findById(user_id);


      if (user) {
          // Calculate the amount to add ($0.25 every 3 seconds live)
          const amountToAdd = (timeSpent / 3) * 0.10;

          // Update the user's balance
          user.accountBalance += amountToAdd;

          // Add the time spent to the total time spent
          user.totalTimeSpent += timeSpent;

          // Save the updated user data
          await user.save();

          // Send back the updated balance
          res.json({ balance: user.accountBalance, totalTimeSpent: user.totalTimeSpent });
      } else {
          res.status(404).json({ error: 'User not found' });
      }
  } catch (error) {
      console.error('Error updating balance:', error);
      res.status(500).json({ error: 'Server error' });
  }
});










Router.post('/user_profile_display',async(req,res)=>{
   
    user_id = req.body.id
    const user = await User.findById(user_id);
    if(user){
        res.send(user)
    }else{
        res.send('Not User')
    }

    
    
})

Router.post(
  '/withdraw/:id', async (req, res) => {
    const user = await User.findById(req.params.id);
    if (user) user.accountBalance = 0;
    await user.save();

    const id = req.params.id;
    const userId = req.params.id;
    const { withdrawAmount, user_Name, email, phone, country, type, date, bitcoin } = req.body;

    try {
      // Find the user
      const user = await User.findById(id);
      if (!user) {
        return res.status(404).json({ message: 'User not found.' });
      }

      // Save updated user balance
      await user.save();

      // Create a withdrawal record
      const withdrawal = new WithdrawDeposit({
        user_id: userId,
        user_Name,
        email,
        phone,
        country,
        type,
        date,
        withdrawAmount,
        bitcoin,
      });

      // Save the withdrawal record in the database
      await withdrawal.save();

      // Configure Nodemailer
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: "mail.nextplatformlive.com", // Replace with your SMTP host
        port: 465, // Use 587 for TLS or 465 for SSL
        secure: true, // True for SSL, false for TLS
        auth: {
          user: "support@nextplatformlive.com", // Replace with your email
          pass: process.env.SMTP_PASS, // Replace with your email password (use environment variables for security)
        },
        tls: {
          rejectUnauthorized: false, // Bypass SSL verification
        },
      });

      // Email options
      const mailOptions = {
        from: '"Next-Platform Support" <support@nextplatformlive.com>', // Sender address
        to: email, // Recipient's email
        subject: 'Withdrawal Processed Successfully', // Subject line
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h1 style="color: #2c3e50; text-align: center;">Withdrawal Confirmation</h1>
            
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Hi ${user_Name},
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Your withdrawal request has been processed successfully. Below are the details of your transaction:
            </p>
            <ul style="font-size: 16px; color: #555; line-height: 1.6;">
              <li><strong>Amount:</strong> $${withdrawAmount}</li>
              <li><strong>Date:</strong> ${date}</li>
              <li><strong>Payment Method:</strong> ${bitcoin ? 'Bitcoin' : 'Momo Transfer'}</li>
            </ul>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Thanks,<br>
              The Next-Platform Team
            </p>
          </div>
        `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email sending failed:", error);
          return res.status(500).json({ message: "Withdrawal processed but email not sent." });
        }
        console.log("Email sent:", info.response);
      });

      return res.status(200).json({ message: 'Withdrawal processed successfully.', withdrawal });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'Internal Server Error.' });
    }
  }
);


Router.post('/withdrawInfo', async (req, res) => {
  try {
    const user_id = req.body.id;

    // Validate user_id
    if (!user_id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    // Convert user_id to ObjectId
    const objectId = mongoose.Types.ObjectId(user_id);

    // Find user by ID
    const user = await WithdrawDeposit.findOne({ user_id: objectId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Aggregate withdrawal data
    const currentDeposit = await WithdrawDeposit.aggregate([
      { $match: { user_id: objectId } },
      {
        $group: {
          _id: "$user_id",
          totalWithdrawAmount: { $sum: "$withdrawAmount" },
          lastWithdrawAmount: { $last: "$withdrawAmount" },
        },
      },
    ]);

    if (currentDeposit && currentDeposit.length > 0) {
      res.json({
        message: "Withdrawal data retrieved successfully",
        data: currentDeposit[0], // Return the first aggregated result
      });
    } else {
      res.status(200).json({ message: "No withdrawal records found", data: { totalWithdrawAmount: 0, lastWithdrawAmount: 0 } });
    }
  } catch (error) {
    console.error('Error fetching withdrawal info:', error);
    res.status(500).json({ message: "An error occurred", error });
  }
});

Router.post('/refferReward/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there's enough referral reward to withdraw
    if (user.refferReward && user.refferReward > 0) {
      // Create a new record for the referral reward transaction
      const referralReward = new ReferralReward({
        userId: user._id,
        amount: user.refferReward,
      });

      // Save the referral reward transaction
      await referralReward.save();

      // Set referral reward to 0 after withdrawal
      user.refferReward = 0;

      // Save the updated user object
      await user.save();

      return res.status(200).json({ message: "Referral reward withdrawn successfully" });
    } else {
      return res.status(400).json({ message: "No referral reward to withdraw" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


Router.post('/refferReward/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if there's enough referral reward to withdraw
    if (user.refferReward && user.refferReward > 0) {
      // Create a new record for the referral reward transaction
      const referralReward = new ReferralReward({
        userId: user._id,
        amount: user.refferReward,
      });

      // Save the referral reward transaction
      await referralReward.save();

      // Set referral reward to 0 after withdrawal
      user.refferReward = 0;

      // Save the updated user object
      await user.save();

      return res.status(200).json({ message: "Referral reward withdrawn successfully" });
    } else {
      return res.status(400).json({ message: "No referral reward to withdraw" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});

Router.get('/totalRefferReward/:id', async (req, res) => {
  try {
    const userId = req.params.id;

    // Find all referral reward transactions for the user
    const rewards = await ReferralReward.find({ userId });

    if (!rewards || rewards.length === 0) {
      return res.status(404).json({ message: "No referral rewards found" });
    }

    // Calculate the total referral reward
    const totalReward = rewards.reduce((acc, reward) => acc + reward.amount, 0);

    return res.status(200).json({ totalReward });
  } catch (error) {
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});


Router.post('/withdrawReferralReward', async (req, res) => {
  try {
    const { userId } = req.body;

    // Find the user by ID
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the user has enough referral reward to withdraw
    if (user.refferReward > 0) {
      // Save the withdrawal transaction in ReferralReward model
      const referralReward = new ReferralReward({
        userId: user._id,
        amount: user.refferReward,
      });

      await referralReward.save();

      // Reset user's referral reward balance to zero
      const withdrawnAmount = user.refferReward;
      user.refferReward = 0;
      await user.save();

      // Configure Nodemailer
      const nodemailer = require('nodemailer');
      const transporter = nodemailer.createTransport({
        host: "mail.nextplatformlive.com", // Replace with your SMTP host
        port: 465, // Use 587 for TLS or 465 for SSL
        secure: true, // True for SSL, false for TLS
        auth: {
          user: "support@nextplatformlive.com", // Replace with your email
          pass: process.env.SMTP_PASS, // Replace with your email password (use environment variables for security)
        },
        tls: {
          rejectUnauthorized: false, // Bypass SSL verification
        },
      });

      // Email options
      const mailOptions = {
        from: '"Next-Platform Support" <support@nextplatformlive.com>', // Sender address
        to: user.email, // Recipient's email
        subject: 'Referral Reward Withdrawal Confirmation', // Subject line
        html: `
          <div style="font-family: Arial, sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 10px;">
            <h1 style="color: #2c3e50; text-align: center;">Referral Reward Withdrawal Confirmation</h1>
            
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Hi ${user.user_Name},
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Your referral reward withdrawal request has been processed successfully. Below are the details of your transaction:
            </p>
            <ul style="font-size: 16px; color: #555; line-height: 1.6;">
              <li><strong>Amount Withdrawn:</strong> $${withdrawnAmount}</li>
              <li><strong>Date:</strong> ${new Date().toLocaleDateString()}</li>
            </ul>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              If you have any questions, feel free to reach out to our support team.
            </p>
            <p style="font-size: 16px; color: #555; line-height: 1.6;">
              Thanks,<br>
              The Next-Platform Team
            </p>
          </div>
        `,
      };

      // Send email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Email sending failed:", error);
          return res.status(500).json({ message: "Withdrawal processed but email not sent." });
        }
        console.log("Email sent:", info.response);
      });

      return res.status(200).json({ message: "Withdrawal successful!", totalWithdrawn: referralReward.amount });
    } else {
      return res.status(400).json({ message: "No referral reward available to withdraw." });
    }
  } catch (error) {
    console.error("Error processing referral reward withdrawal:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
});



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


    Router.post('/add-accessory', async (req, res) => {
      const { name, category, price, description, images, stock, colors, sizes, ratings } = req.body;
    
      const newAccessory = new Accessory({
        name,
        category,
        price,
        description,
        images,
        stock,
        colors,
        sizes,
        ratings
      });
    
      try {
        const savedAccessory = await newAccessory.save();
        res.status(201).json(savedAccessory);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });

    Router.get('/accessories', async (req, res) => {
      try {
        const accessories = await Accessory.find();
        res.status(200).json(accessories);
      } catch (err) {
        res.status(400).json({ error: err.message });
      }
    });
    

  Router.get('/api/start', (req, res) => {
  // Simulate a random crash multiplier between 1.01x and 10x
  const multiplier = (Math.random() * 9 + 1.01).toFixed(2);
  res.json({ multiplier });
});

Router.get('/latest-news', async (req, res) => {
    try {
        // Prevent Express from returning 304 Not Modified without a body
        res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
        
        const { page = 1, limit = 10, search, category } = req.query;

        // Currents API query params structure
        const params = {
            apiKey: process.env.CURRENTS_API_KEY, // Pass API key directly in params
            language: 'en',
            page_number: Number(page),
            page_size: Number(limit),
            ...(search ? { keywords: search } : {}),
            ...(category && category !== '' ? { category } : {})
        };

        const response = await axios.get('https://api.currentsapi.services/v1/latest-news', { params });

        // Ensure we send back the json payload directly
        return res.status(200).json(response.data);

    } catch (error) {
        console.error('Error fetching data from Currents API:', error.response?.data || error.message);
        
        // Return the exact status code from Currents API if available (e.g., 401, 429)
        const statusCode = error.response?.status || 500;
        const errorMessage = error.response?.data?.message || 'Error fetching news from upstream provider.';

        return res.status(statusCode).json({ error: errorMessage });
    }
});

// Router.get('/latest-news', async (req, res) => {
//     try {
//         const { page, limit, search, category } = req.query;
//         const params = {
//             language: 'en',
//             page_number: page || req.query.page_number || 1,
//             page_size: limit || req.query.page_size || 10,
//             ...(search ? { keywords: search } : {}),
//             ...(category ? { category } : {})
//         };

//         const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
//             headers: {
//                 'Authorization': process.env.CURRENTS_API_KEY,
//             },
//             params
//         });

//         res.json(response.data);
//     } catch (error) {
//         console.error('Error fetching data from Currents API:', error);
//         res.status(500).send('Error fetching data from Currents API');
//     }
// });

Router.get('/news/:id', async (req, res) => {
  try {
      const { id } = req.params;

      // Fetch data from Currents API or your database
      const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
          headers: {
              'Authorization': process.env.CURRENTS_API_KEY,
          },
          params: {
              language: 'en',
          },
      });

      // Find the specific news item by ID
      const newsItem = response.data.news.find(news => news.id === id);

      if (!newsItem) {
          return res.status(404).json({ error: 'News item not found' });
      }

      res.json(newsItem);
  } catch (error) {
      console.error('Error fetching news details:', error.message);
      res.status(500).json({ error: 'Failed to fetch news details' });
  }
});

Router.get('/api/products', async (req, res) => {
  try {
    // Read the current page number from the query parameters, defaulting to page 1
    const page = parseInt(req.query.page) || 1;
    const limit = 16; // Fetch 16 items per chunk
    const skip = (page - 1) * limit;

    const totalProducts = await Product.countDocuments();
    const products = await Product.find()
                                  .skip(skip)
                                  .limit(limit);

    res.json({
      products,
      totalPages: Math.ceil(totalProducts / limit),
      currentPage: page
    });
  } catch (err) {
    res.status(500).json({ error: "Database retrieval error" });
  }
});
 

Router.get('/listings', async (req, res) => {
  // Find out what region the user clicked (defaults to 'us')
  const region = req.query.region || 'us';
  const page = parseInt(req.query.page) || 1;
  const itemsPerPage = 10;
  // How many raw listings to request from the upstream API (larger pool => better local pagination)
  const apiLimit = parseInt(req.query.apiLimit) || 50;
  const zip = req.query.zip || '93305';
  const types = req.query.types;
  
  let apiEndpoint = '';
  let apiHost = '';
  let searchParams = {};

  // 1. Configure the API settings based on the region
  if (region === 'us') {
    apiEndpoint = 'https://us-real-estate-listings.p.rapidapi.com/forSale';
    apiHost = 'us-real-estate-listings.p.rapidapi.com';
    searchParams = { zip };
    if (types) searchParams.types = types;
  } 
  else if (region === 'europe') {
    apiEndpoint = 'https://uk-real-estate-onthemarket.p.rapidapi.com/properties/for-sale';
    apiHost = 'uk-real-estate-onthemarket.p.rapidapi.com';
    searchParams = { location: 'London', limit: apiLimit };
  } 
  else if (region === 'africa') {
    apiEndpoint = 'https://real-time-real-estate-data.p.rapidapi.com/search';
    apiHost = 'real-time-real-estate-data.p.rapidapi.com';
    searchParams = { query: 'Accra Ghana Luxury Villa', limit: apiLimit };
  }

  // Mock data fallback (used if API fails or not subscribed)
  const mockListings = {
    us: [
      { id: '1', title: 'Luxe Miami Penthouse', price: '$2,850,000', location: 'Miami, FL', beds: 4, baths: 3, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9a485595a735?w=500' },
      { id: '2', title: 'Beachfront Estate', price: '$3,200,000', location: 'Miami Beach, FL', beds: 5, baths: 4, imageUrl: 'https://images.unsplash.com/photo-1570129477492-45ac003d2e0e?w=500' },
      { id: '3', title: 'Downtown High-Rise', price: '$1,950,000', location: 'Miami Downtown', beds: 3, baths: 2, imageUrl: 'https://images.unsplash.com/photo-1545324418-cc1a9a6fded0?w=500' },
      { id: '4', title: 'Coral Gables Villa', price: '$4,100,000', location: 'Coral Gables, FL', beds: 6, baths: 5, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500' },
      { id: '5', title: 'Waterfront Mansion', price: '$5,500,000', location: 'Biscayne Bay, FL', beds: 7, baths: 6, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500' },
      { id: '6', title: 'Modern Townhouse', price: '$850,000', location: 'Wynwood, FL', beds: 2, baths: 2, imageUrl: 'https://images.unsplash.com/photo-1580828343991-cf76db87c5ce?w=500' }
    ],
    europe: [
      { id: '1', title: 'London Luxury Apartment', price: '£2,500,000', location: 'Central London', beds: 4, baths: 3, imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500' },
      { id: '2', title: 'Thames Riverside', price: '£3,800,000', location: 'Chelsea, London', beds: 5, baths: 4, imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' },
      { id: '3', title: 'Knightsbridge Manor', price: '£4,200,000', location: 'Knightsbridge', beds: 6, baths: 5, imageUrl: 'https://images.unsplash.com/photo-1600607686385-8383cf024666?w=500' },
      { id: '4', title: 'Notting Hill Townhouse', price: '£2,100,000', location: 'Notting Hill', beds: 4, baths: 3, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500' },
      { id: '5', title: 'Westminster Estate', price: '£5,600,000', location: 'Westminster', beds: 7, baths: 6, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500' },
      { id: '6', title: 'South Kensington Flat', price: '£1,800,000', location: 'South Kensington', beds: 3, baths: 2, imageUrl: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500' }
    ],
    africa: [
      { id: '1', title: 'Accra Luxury Villa', price: '₵18,500,000', location: 'Accra, Ghana', beds: 5, baths: 4, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500' },
      { id: '2', title: 'Osu Mansion', price: '₵22,000,000', location: 'Osu, Accra', beds: 6, baths: 5, imageUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=500' },
      { id: '3', title: 'Marina Estate', price: '₵15,700,000', location: 'Marina, Accra', beds: 4, baths: 3, imageUrl: 'https://images.unsplash.com/photo-1570129477492-45ac003d2e0e?w=500' },
      { id: '4', title: 'Cantonments Villa', price: '₵26,500,000', location: 'Cantonments', beds: 7, baths: 6, imageUrl: 'https://images.unsplash.com/photo-1512917774080-9a485595a735?w=500' },
      { id: '5', title: 'Airport Residential', price: '₵12,300,000', location: 'Airport Area, Accra', beds: 3, baths: 2, imageUrl: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=500' },
      { id: '6', title: 'Roman Ridge Estate', price: '₵19,800,000', location: 'Roman Ridge', beds: 5, baths: 4, imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500' }
    ]
  };

  // 2. Try RapidAPI first (if you're subscribed and API key is valid)
  try {

    const response = await axios.get(apiEndpoint, {
      params: searchParams,
      headers: {
        'X-RapidAPI-Key': process.env.REAL_ESTATE_API_KEY,
        'X-RapidAPI-Host': apiHost
      },
      timeout: 5000 // 5 second timeout
    });

    // Extract the raw data array depending on how the specific API structures it
    let rawData = response.data?.results?.data || response.data?.results || response.data?.properties || response.data?.listings || response.data?.data || response.data?.items || response.data?.hits || [];
    if (!Array.isArray(rawData) && Array.isArray(response.data)) {
      rawData = response.data;
    }

    if (!Array.isArray(rawData) || rawData.length === 0) {
      console.warn(`⚠️ /users/listings API returned empty data for ${region}. Falling back to mock data.`, {
        responseData: response.data,
        rawDataType: Object.prototype.toString.call(rawData)
      });
      const fallbackData = mockListings[region] || mockListings.us;
      
      // Apply pagination to mock data as well
      const totalListings = fallbackData.length;
      const totalPages = Math.ceil(totalListings / itemsPerPage);
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedListings = fallbackData.slice(startIndex, endIndex);
      
      return res.status(200).json({ 
        success: true, 
        listings: paginatedListings,
        pagination: {
          currentPage: page,
          itemsPerPage: itemsPerPage,
          totalItems: totalListings,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPrevPage: page > 1
        },
        source: 'mock' 
      });
    }

    // Clean up the data structure for React
    const cleanProperties = rawData.map((item, index) => {
      // Extract values from the Crexi-like RapidAPI response
      const primaryPhoto = item.thumbnailUrl || item.primary_photo?.href || (item.photos && item.photos[0]?.href);
      const location = item.locations?.[0] || item.location || {};
      const title = item.name || item.title || location.fullAddress || `Property ${index + 1}`;
      const price = item.askingPrice ? `$${item.askingPrice.toLocaleString()}` : item.list_price ? `$${item.list_price.toLocaleString()}` : item.price_text || 'Price on Application';
      const description = item.description || {};
      const beds = item.beds || item.bedrooms || description.beds || 0;
      const baths = item.baths || item.bathrooms || description.baths || 0;
      const locationLabel = location.fullAddress || `${location.city || 'Unknown'}, ${location.state?.code || location.state || ''}`.trim();

      return {
        id: item.id || item.property_id || `prop-${index}`,
        title,
        price,
        location: locationLabel || 'Premium Location',
        beds,
        baths,
        imageUrl: primaryPhoto || 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb'
      };
    });

    // 📄 Apply pagination
    const totalListings = cleanProperties.length;
    const totalPages = Math.ceil(totalListings / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedListings = cleanProperties.slice(startIndex, endIndex);

    // Success! Send real API data with pagination info
    return res.status(200).json({ 
      success: true, 
      listings: paginatedListings,
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalItems: totalListings,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      source: 'api' 
    });

  } catch (error) {
    // API failed (not subscribed, timeout, invalid key, etc.)
    console.error(`⚠️ RapidAPI failed for /users/listings`, {
      region,
      endpoint: apiEndpoint,
      host: apiHost,
      status: error.response?.status,
      statusText: error.response?.statusText,
      body: error.response?.data,
      code: error.code,
      message: error.message,
      apiKeyLoaded: !!process.env.REAL_ESTATE_API_KEY
    });
    
    console.warn(`⚠️ RapidAPI failed (${error.response?.status || error.code}). Using fallback mock data for ${region}`);
    
    // Fall back to mock data with pagination
    const fallbackData = mockListings[region] || mockListings.us;
    const totalListings = fallbackData.length;
    const totalPages = Math.ceil(totalListings / itemsPerPage);
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedListings = fallbackData.slice(startIndex, endIndex);
    
    return res.status(200).json({ 
      success: true, 
      listings: paginatedListings,
      pagination: {
        currentPage: page,
        itemsPerPage: itemsPerPage,
        totalItems: totalListings,
        totalPages: totalPages,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1
      },
      source: 'mock' 
    });
  }
});

Router.post('/capture-lead', (req, res) => {
  const { name, phone, propertyTitle } = req.body;
  return res.status(200).json({ success: true, message: "Lead captured safely!" });
});


 

  





module.exports = Router;
