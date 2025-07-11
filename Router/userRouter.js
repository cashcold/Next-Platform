const express = require('express')
const mongoose = require('mongoose'); 
const User = require('../UserModel/userModel')
const Accessory = require('../UserModel/accessory')
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

    

 


 

  





module.exports = Router;
