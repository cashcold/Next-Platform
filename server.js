const express = require('express');
const cors = require('cors');
const dotEnv = require('dotenv');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./Router/userRouter');
const path = require('path');
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
const axios = require('axios');
const webpush = require('web-push');
const base64url = require('base64url');
const lyricsFinder = require('lyrics-finder');

dotEnv.config();


// MongoDB connection strings from environment variables
const db1URI = process.env.MONGODB_URI;
const db2URI = process.env.MONGODB_URI_GodSpeedComputersGH;

// Connect to the first MongoDB database
mongoose.connect(db2URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the first MongoDB database (Gain)'))
    .catch(err => console.error('Could not connect to the first MongoDB database (Gain)', err));

// Create a second connection
// const db2 = mongoose.createConnection(db2URI, { useNewUrlParser: true, useUnifiedTopology: true });

// db2.on('connected', () => {
//     console.log('Connected to the second MongoDB database (GodSpeedComputersGH)');
// });

// db2.on('error', (err) => {
//     console.error('Could not connect to the second MongoDB database (GodSpeedComputersGH)', err);
// });

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static(path.join(__dirname, "client")));

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);


const Subscription = require('./UserModel/Subscription')


// Public and private VAPID keys
const publicVapidKey = base64url.toBase64("BMVoVa091u1HIO9tr5ksdHaJleTqt4lFjkg7N_emTP1IzAwt6-B9NmmelAQP4beoxSpshJ0Kage490LVd8d-VZU");
const privateVapidKey = "l8UN9HvyjNC6mHwsnpPxt-ACbPPF59p2vj7srEn4XTs";

// Set VAPID details
webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);


app.post('/subscribe', async (req, res) => {
  const subscription = req.body;

  try {
    // Save subscription to the database
    await Subscription.create({
      endpoint: subscription.endpoint,
      keys: subscription.keys
    });

    res.status(201).json({});

    // Send a test notification (optional)
    const payload = JSON.stringify({ title: 'The Christ Miracles Church Intl.' });
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
  } catch (error) {
    res.status(500).json({ error: 'Failed to save subscription' });
  }
});


app.post('/sendNotification', async (req, res) => {
  const { title, message } = req.body;

  try {
    const subscriptions = await Subscription.find();

    const payload = JSON.stringify({ title, message });

    const notificationPromises = subscriptions.map(subscription =>
      webpush.sendNotification(subscription, payload)
    );

    await Promise.all(notificationPromises);

    res.status(200).json({ message: 'Notifications sent' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to send notifications' });
  }
});

  
const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
});

app.post('/refreshSpotify', (req, res) => {
    const refreshToken = req.body.refreshToken;
    spotifyApi.setRefreshToken(refreshToken);

    spotifyApi.refreshAccessToken()
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            console.log(err);
            res.sendStatus(400);
        });
});

app.post('/loginSpotify', (req, res) => {
    const code = req.body.code;

   

    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            });
        })
        .catch((err) => {
            res.sendStatus(400);
        });
});

app.get('/Next-Platform-song/:id', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        const { Song_overview, Song_title, Song_img } = req.query;
        data = data.replace(/\$OG_TITLE/g, Song_title)
                   .replace(/\$OG_DESCRIPTION/g, Song_overview)
                   .replace(/\$OG_IMAGE/g, Song_img);
        res.send(data);
    });
});

const GENIUS_API_KEY = 'AT33Xg7-gVaX9EfXQjJX4nHKHLeJaOSvByMjj0XjaF_SYR-wWVBlsY6oThoNbk3K';

app.get('/lyrics', async (req, res) => {
    const { artist, track } = req.query;

    if (!artist || !track) {
        return res.status(400).json({ error: 'Artist and track are required' });
    }

    try {
        const apiUrl = `https://api.genius.com/search?q=${encodeURIComponent(track + ' ' + artist)}`;
        const config = {
            headers: {
                Authorization: `Bearer ${GENIUS_API_KEY}`,
            },
        };

        const response = await axios.get(apiUrl, config);
        const hits = response.data.response.hits;

        if (hits.length > 0) {
            const songUrl = hits[0].result.url;
            
            // Fetch the lyrics from the song URL
            const lyricsPage = await axios.get(songUrl);
            const $ = cheerio.load(lyricsPage.data);
            const lyrics = $('.lyrics').text().trim();

            res.json({ lyrics });
        } else {
            res.status(404).json({ error: 'No lyrics found for this song' });
        }
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        res.status(500).json({ error: 'Failed to fetch lyrics, please try again' });
    }
});


// app.get('/lyrics', async (req, res) => {
//     const { artist, track } = req.query;

//     try {
//         const lyrics = await lyricsFinder(artist, track);
//         res.json({ lyrics });
//     } catch (error) {
//         console.error('Error fetching lyrics:', error);
//         res.status(500).json({ error: 'Failed to fetch lyrics, refresh the page again' });
//     }
// });

app.get('/', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_TITLE/g, 'NEXT-PLATFORM-HOME')
                   .replace(/\$OG_DESCRIPTION/g, "Join The Growing Platform. NextPlatform Home Enterterment Music Box, Sport & Online Links More")
                   .replace(/\$OG_IMAGE/g, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
        res.send(data);
    });
});

// Additional routes for /music, /movie_box_main, /watch_movies/:id, etc.

app.get('/latest-news', async (req, res) => {
    try {
        const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
            headers: {
                'Authorization': process.env.CURRENTS_API_KEY,
            },
            params: {
                ...req.query,
                language: 'en'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Currents API:', error);
        res.status(500).send('Error fetching data from Currents API');
    }
});

app.get('/Next-Platform-News', (req, res) => {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return console.log(err);
        }

        data = data.replace(/\$OG_TITLE/g, 'Next Platform News')
                   .replace(/\$OG_DESCRIPTION/g, "NextPlatform Home Enterterment Music Box, Sport & Online Links More")
                   .replace(/\$OG_IMAGE/g, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
        res.send(data);
    });
});

// Additional routes for /news/:id, /currencies, etc.

app.use(express.static("client/build"));
if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server is running on local Port Number ${PORT}`);
});
