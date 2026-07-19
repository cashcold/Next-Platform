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
const {google} = require('googleapis');
const cheerio = require('cheerio');
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

  
const PORT = process.env.PORT || 8000;

const app = express();
app.use(express.static(path.join(__dirname, "client")));

app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);

app.use(cors({
  origin: 'https://next-platform-ioi5z254a-the-christs-projects.vercel.app',
  credentials: true
}));



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
app.get('/music', function(request, response) {
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
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "Listen to the Latest Music & Discover New Artists | YourMusicHub");
    data = data.replace(/\$OG_DESCRIPTION/g, "Explore trending tracks, discover new artists, and stream your favorite hits. Join the ultimate online music experience.");
    result = data.replace(/\$OG_IMAGE/g, "https://plus.unsplash.com/premium_photo-1682125853703-896a05629709?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D");
    response.send(result);
    

  });
});

app.get('/music/:id', function(request, response) {
 
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

app.get('/link_box', function(request, response) {
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
  // replace the special strings with server generated strings
data = data.replace(/\$OG_TITLE/g, "Discover Smart Products & Passive Income Tools | FutureLiving Hub");
data = data.replace(/\$OG_DESCRIPTION/g, "Explore the latest tools, gadgets, and financial strategies designed to improve your lifestyle and help you earn passive income effortlessly.");
result = data.replace(/\$OG_IMAGE/g, "https://yourdomain.com/assets/og-passive-income.jpg");
response.send(result);

    

  });
});


app.get('/link_box/:id', function(request, response) {
 
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

app.get('/godspeedcomputers', function(request, response) {
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
    // replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g, "GOD'S SPEED COMPUTERS");
    data = data.replace(/\$OG_DESCRIPTION/g, "🖤 Upgrade Your Tech with Premium Accessories! 💥 Discover the best in tech accessories! From wireless controllers to high-speed Wi-Fi, we have everything you need to level up your devices. 🌐 #TechAccessories #GamingGear #UpgradeYourTech");
    result = data.replace(/\$OG_IMAGE/g, "https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FUntitled%20design%20(2).jpg?alt=media&token=07c36ecf-860c-4759-b3a7-718e3a71a361");
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
      
     
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
  
  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,'movies');
      data = data.replace(/\$OG_DESCRIPTION/g,'best movies');
      result = data.replace(/\$OG_IMAGE/g,'image');
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
      
   
  
  
        // Add headers to disable caching
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
   

  // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,'Sport Main Home');
      data = data.replace(/\$OG_DESCRIPTION/g,'NextPlatform Home Enterterment Music Box, Sport & Online Links More');
      result = data.replace(/\$OG_IMAGE/g,'image');
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

// backend/server.js or routes file
app.get('/Product-Info/:id', function(request, response) {
    const filePath = path.resolve(__dirname, './client/build', 'index.html');
  
    fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) {
            return console.log(err);
        }
      
        const parsed = request.url;
        const url = require('url');
        const q = url.parse(parsed, true);
        const qdata = q.query;        
                     
        // Grab product specifics from query parameters (No price indicators)
        const { Prod_title, Prod_img } = qdata;
        const defaultDesc = "Check out this trending product deal available right now!";
  
        // Disable browser caching so previews switch cleanly between products
        response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
        response.setHeader('Pragma', 'no-cache');
        response.setHeader('Expires', '0');
  
        // Replace the placeholders in your build's index.html file
        data = data.replace(/\$OG_TITLE/g, Prod_title);
        data = data.replace(/\$OG_DESCRIPTION/g, defaultDesc);
        
        const result = data.replace(/\$OG_IMAGE/g, Prod_img);
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

// Initialize YouTube Data API client (uses API key from env)
const rawYoutubeApiKey = process.env.GOOGLE_API_KEY || process.env.YOUTUBE_API_KEY || '';
const youtubeApiKey = rawYoutubeApiKey.trim();
if (!youtubeApiKey) {
  console.warn('Warning: GOOGLE_API_KEY / YOUTUBE_API_KEY not set — YouTube API calls may fail');
} else {
  console.log('YouTube API key loaded:', youtubeApiKey.slice(0, 10) + '...');
}
const youtube = google.youtube({ version: 'v3', auth: youtubeApiKey });

// Fallback helper that uses the REST endpoint via axios to avoid environments
// where the googleapis client tries to use `Headers`/fetch globals not present.
async function safeYoutubeSearch(params) {
  const key = youtubeApiKey;
  if (!key) throw new Error('YouTube API key not configured');
  const url = 'https://www.googleapis.com/youtube/v3/search';
  try {
    const response = await axios.get(url, { params: { key, part: 'snippet', ...params } });
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status, data } = error.response;
      console.error('YouTube API response error:', status, data);
      throw new Error(`YouTube API error ${status}: ${data.error?.message || JSON.stringify(data)}`);
    }
    console.error('YouTube API request failed:', error.message);
    throw error;
  }
}

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

// Returns the query string used when searching YouTube for high-influence videos.
// Can be overridden by the INFLUENTIAL_QUERY environment variable.
function getInfluentialQuery() {
  if (process.env.INFLUENTIAL_QUERY && process.env.INFLUENTIAL_QUERY.trim()) {
    return process.env.INFLUENTIAL_QUERY.trim();
  }
  // sensible default for the football/video hub
  return 'football highlights interview news trending match review';
}






app.get('/get-daily-video', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const finalQuery = getInfluentialQuery();
    console.log(`Querying YouTube with Engine: "${finalQuery}" - Page: ${page}`);

    const youtubeData = await safeYoutubeSearch({
      q: finalQuery,
      maxResults: limit,
      type: 'video',
      videoDuration: 'medium',
      videoEmbeddable: true
    });

    if (!youtubeData.items || youtubeData.items.length === 0) {
      return res.status(404).json({ message: "No premium assets matching active matrices found." });
    }

    const videos = youtubeData.items.map(videoItem => {
      const videoTitle = videoItem.snippet.title.toLowerCase();
      let contentType = 'Match Highlight';

      // Content Type Classification Matrix
      if (videoTitle.includes('interview') || videoTitle.includes('talks') || videoTitle.includes('press')) {
        contentType = 'Exclusive Interview';
      } else if (videoTitle.includes('news') || videoTitle.includes('transfer') || videoTitle.includes('breaking')) {
        contentType = 'Trending News';
      }

      return {
        videoId: videoItem.id.videoId,
        videoUrl: `https://www.youtube.com/watch?v=${videoItem.id.videoId}`,
        youtubeTitle: videoItem.snippet.title,
        contentType: contentType,
        thumbnailUrl: videoItem.snippet.thumbnails.high.url
      };
    });

    res.status(200).json({
      dashboardTitle: "Elite Football Stream Center",
      videos: videos,
      pagination: {
        page: page,
        limit: limit,
        total: youtubeData.items.length,
        hasNextPage: youtubeData.items.length === limit
      }
    });

  } catch (error) {
    console.error("YouTube Search Error:", error.message);
    res.status(500).json({ error: "Failed to gather YouTube content streams." });
  }
});

app.get('*', async (req, res, next) => {
  const userAgent = req.headers['user-agent'] || '';
  const isBot = /facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot/i.test(userAgent);

  if (isBot) {
    try {
      console.log("🕵️‍♂️ Bot detected! Pre-rendering headers...");
      const youtubeData = await safeYoutubeSearch({ q: getInfluentialQuery(), maxResults: 1, type: 'video', videoEmbeddable: true });
      const videoData = youtubeData.items[0]?.snippet;
      if (!videoData) return res.send("Football Video Hub");

      return res.send(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${videoData.title}</title>
          <meta name="description" content="Watch high-influence premium sports media content." />
          <meta property="og:title" content="${videoData.title}" />
          <meta property="og:image" content="${videoData.thumbnails.high.url}" />
          <meta name="twitter:card" content="summary_large_image" />
        </head>
        <body><h1>${videoData.title}</h1></body>
        </html>
      `);
    } catch (e) { 
      return res.send("Football Video Hub"); 
    }
  }
  
  // If it's a real human web user, pass control to the static index fallback below
  next();
});

// backend/server.js

// 🚀 DYNAMIC SITEMAP ENGINE FOR GOOGLE SEARCH CONSOLE
app.get('/sitemap.xml', function(req, response) {
  // Tell browsers and Google bots that this is an XML file, not HTML
  response.header('Content-Type', 'application/xml');
  
  // Base website link
  const baseUrl = "https://nextplatformlive.com";
  
  // Capture current date for Google's freshness indicator
  const currentDate = new Date().toISOString().split('T')[0];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    
    <!-- Homepage -->
    <url>
      <loc>${baseUrl}/</loc>
      <lastmod>${currentDate}</lastmod>
      <changefreq>daily</changefreq>
      <priority>1.0</priority>
    </url>

  </urlset>`;
  
  response.send(xml);
});



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
