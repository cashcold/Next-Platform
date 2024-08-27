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
const lyricsFinder = require('lyrics-finder');

dotEnv.config();

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('Database Connected Successfully');
});

const PORT = process.env.PORT || 8000;

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);

const publicVapidKey = "BHl7N0MHnESNNyl-kbrSHkI1KW2ge9ux2isIf_jHQa0-zn7e0-s9Z_5QCy_30y6lQsjPcLuRqLgD9-yVJsctZco";
const privateVapidKey = "7ZZKiZMYbCaAR6n4W3ZF9FXL82PUhpSSBGvohBJR3XU";

webpush.setVapidDetails("mailto:test@test.com", publicVapidKey, privateVapidKey);

app.post("/subscribe", (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "Push Test" });
    webpush.sendNotification(subscription, payload).catch(err => console.error(err));
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

app.get('/lyrics', async (req, res) => {
    const { artist, track } = req.query;

    try {
        const lyrics = await lyricsFinder(artist, track);
        res.json({ lyrics });
    } catch (error) {
        console.error('Error fetching lyrics:', error);
        res.status(500).json({ error: 'Failed to fetch lyrics, refresh the page again' });
    }
});

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
