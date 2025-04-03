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
 mongoose.connect(db1URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to the first MongoDB database (Gain)'))
    .catch(err => console.error('Could not connect to the first MongoDB database (Gain)', err));

    // Create a second connection
    const db2 = mongoose.createConnection(db2URI, { useNewUrlParser: true, useUnifiedTopology: true });

    db2.on('connected', () => {
        console.log('Connected to the second MongoDB database (GodSpeedComputersGH)');
    });

    db2.on('error', (err) => {
        console.error('Could not connect to the second MongoDB database (GodSpeedComputersGH)', err);
    });

const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static(path.join(__dirname, "client")));

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);


const Subscription = require('./UserModel/Subscription')

app.get('/', function(request, response) {
  const filePath = path.resolve(__dirname, './client/build' ,'index.html');

  // read in the index.html file
  fs.readFile(filePath, 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }

      // Add headers to disable caching
      response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      response.setHeader('Pragma', 'no-cache');
      response.setHeader('Expires', '0');
    
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "💰⏳ Get Paid for Your Time – Earn While You Explore!");
    data = data.replace(/\$OG_DESCRIPTION/g, "💸 Spend time, earn rewards! Get paid for every moment you engage with our platform. Your time is valuable—start earning today! 🚀💰 #EarnOnline #GetPaid #TimeIsMoney");
    result = data.replace(/\$OG_IMAGE/g, "https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBlack%20Purple%20Creative%20Get%20Paid%20From%20Home%20Facebook%20Ad.jpg?alt=media&token=f3ccf62f-410d-47ad-84ea-b4c78afda1f9");
    response.send(result);
  });
});



app.get('/movie_box_main', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {TMDB_overview, TMDB_title, TMDB_img} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
  
  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,TMDB_title);
      data = data.replace(/\$OG_DESCRIPTION/g,TMDB_overview);
      result = data.replace(/\$OG_IMAGE/g,TMDB_img);
      response.send(result);
    });
  
});
app.get('/watch_movies/:id', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {TMDB_overview, TMDB_title, TMDB_img} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
  
  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,TMDB_title);
      data = data.replace(/\$OG_DESCRIPTION/g,TMDB_overview);
      result = data.replace(/\$OG_IMAGE/g,TMDB_img);
      response.send(result);
    });
  
});
  
app.get('/sport-main-home', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {TMDB_overview, TMDB_title, TMDB_img} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,'Sport Main Home');
      data = data.replace(/\$OG_DESCRIPTION/g,'NextPlatform Home Enterterment Music Box, Sport & Online Links More');
      result = data.replace(/\$OG_IMAGE/g,TMDB_img);
      response.send(result);
    });
  
});
  
app.get('/sport-main-home/:id', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {info, name, on_image} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
      response.send(result);
    });
  
});
  
app.get('/Next-Platform-News', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {info, name, on_image} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,'Next Platform News');
      data = data.replace(/\$OG_DESCRIPTION/g,'News information about Next Platform Home Enterterment Music Box, Sport & Online Links More');
      result = data.replace(/\$OG_IMAGE/g,'on_image');
      response.send(result);
    });
  
});

app.get('/Next-Platform-News-info/:id', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {News_overview, News_title, News_img} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,News_title);
      data = data.replace(/\$OG_DESCRIPTION/g,News_overview);
      result = data.replace(/\$OG_IMAGE/g,News_img);
      response.send(result);
    });
  
});
app.get('/Next-Platform-Books', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {News_overview, News_title, News_img} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,'Books Information');
      data = data.replace(/\$OG_DESCRIPTION/g,'get all your books here');
      result = data.replace(/\$OG_IMAGE/g,'on_image');
      response.send(result);
    });
  
});
app.get('/Next-Platform-Book-info/:id', function(request, response) {
 
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      const parsed = (request.url)
      var url = require('url');
  
      var q = url.parse(parsed, true);
  
      var qdata = q.query        
                     
      const {book_overview, book_title, book_img} = qdata
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,book_title);
      data = data.replace(/\$OG_DESCRIPTION/g,book_overview);
      result = data.replace(/\$OG_IMAGE/g,book_img);
      response.send(result);
    });
  
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

// app.get('/Next-Platform-News', (req, res) => {
//     const filePath = path.resolve(__dirname, './client/build', 'index.html');
//     fs.readFile(filePath, 'utf8', (err, data) => {
//         if (err) {
//             return console.log(err);
//         }

//         data = data.replace(/\$OG_TITLE/g, 'Next Platform News')
//                    .replace(/\$OG_DESCRIPTION/g, "NextPlatform Home Enterterment Music Box, Sport & Online Links More")
//                    .replace(/\$OG_IMAGE/g, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
//         res.send(data);
//     });
// });

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
