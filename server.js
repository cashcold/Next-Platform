const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
const SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
var Ebay = require('ebay-node-api')
const axios = require('axios')
const queryString = require('query-string');
const { parse } = require('querystring')
const webpush = require("web-push");
const lyricsFinder = require("lyrics-finder")

dotEnv.config()




mongoose.connect(process.env.MONGODB_URI,{ useNewUrlParser: true,  useUnifiedTopology: true },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/users',userRouter)

const publicVapidKey =
  "BHl7N0MHnESNNyl-kbrSHkI1KW2ge9ux2isIf_jHQa0-zn7e0-s9Z_5QCy_30y6lQsjPcLuRqLgD9-yVJsctZco";
const privateVapidKey = "7ZZKiZMYbCaAR6n4W3ZF9FXL82PUhpSSBGvohBJR3XU";

webpush.setVapidDetails(
  "mailto:test@test.com",
  publicVapidKey,
  privateVapidKey
);

// Subscribe Route
app.post("/subscribe", (req, res) => {
  // Get pushSubscription object
  const subscription = req.body;

  // Send 201 - resource created
  res.status(201).json({});

  // Create payload
  const payload = JSON.stringify({ title: "Push Test" });

  // Pass object into sendNotification 
  webpush
    .sendNotification(subscription, payload)
    .catch(err => console.error(err));
});

app.post('/refreshSpotify', (req, res) => {
  const refreshToken = req.body.refreshToken;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi.setRefreshToken(refreshToken); // Set the refresh token

  spotifyApi
    .refreshAccessToken()
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


app.post('/loginSpotify', async (req, res) => {
  const code = req.body.code;

  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });

  spotifyApi
    .authorizationCodeGrant(code)
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

app.get('/Next-Platform-song/:id', function(request, response) {
 
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
    
    const {Song_overview,Song_title, Song_img} = qdata

    console.log(qdata)


// replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g,Song_title);
    data = data.replace(/\$OG_DESCRIPTION/g,Song_overview);
    result = data.replace(/\$OG_IMAGE/g,Song_img);
    response.send(result);
  });
});

app.get('/lyrics', async (req, res) => {
  const artist = req.query.artist;
  const track = req.query.track;

  try {
    const lyrics = await lyricsFinder(artist, track);
    res.json({ lyrics });
  } catch (error) {
    console.error('Error fetching lyrics:', error);
    res.status(500).json({ error: 'Failed to fetch lyrics, refresh the page again' });
  }
});







app.get('/', function(request, response) {
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'NEXT-PLATFORM-HOME');
      data = data.replace(/\$OG_DESCRIPTION/g, "Join The Growing Platform. NextPlatform Home Enterterment Music Box, Sport & Online Links More");
      result = data.replace(/\$OG_IMAGE/g, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
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
      
      
      const parsed = (request.url)
      var url = require('url');

      var q = url.parse(parsed, true);

      var qdata = q.query
      
      const {info, name, on_image} = qdata
 
 
// replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
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
      
      const {info, name, on_image} = qdata
 
 
// replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
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
      
      const {TMDB_overview,TMDB_title, TMDB_img} = qdata

      console.log(qdata)
 
 
// replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,TMDB_title);
      data = data.replace(/\$OG_DESCRIPTION/g,TMDB_overview);
      result = data.replace(/\$OG_IMAGE/g,TMDB_img);
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
      
      const parsed = (request.url)
      var url = require('url');

      var q = url.parse(parsed, true);

      var qdata = q.query
      
      const {info, name, on_image} = qdata
 
 
// replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
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
      
      const {name, info, on_image} = qdata

      console.log(qdata)
 
 
// replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
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
      
      const {name, info, on_image} = qdata

      console.log(qdata)
 
 
// replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
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
      
      const {name, info, on_image} = qdata

      // console.log(qdata)
 
 
      data = data.replace(/\$OG_TITLE/g,name);
      data = data.replace(/\$OG_DESCRIPTION/g,info);
      result = data.replace(/\$OG_IMAGE/g,on_image);
      response.send(result);
    });

  });

  app.get('/latest-news', async (req, res) => {
    try {
        const response = await axios.get('https://api.currentsapi.services/v1/latest-news', {
            headers: {
                'Authorization': process.env.CURRENTS_API_KEY, // Use environment variable for security
            },
            params: {
                ...req.query, // Spread the original query parameters
                language: 'en' // Override or set the language parameter to 'en'
            }
        });

        // Log the API response
        console.log('Currents API response:', response.data);

        // Send the response data to the frontend
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching data from Currents API:', error);
        res.status(500).send('Error fetching data from Currents API');
    }
});

 app.get('/Next-Platform-News', function(request, response) {
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');

    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'Next Platform News');
      data = data.replace(/\$OG_DESCRIPTION/g, " NextPlatform Home Enterterment Music Box, Sport & Online Links More");
      result = data.replace(/\$OG_IMAGE/g, 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80');
      response.send(result);
    });
  });

  app.get('/news/:id', async (req, res) => {
    try {
        const response = await axios.get(`https://api.currentsapi.services/v1/latest-news`, {
            headers: {
                'Authorization': process.env.CURRENTS_API_KEY
            },
            params: {
                id: req.params.id
            }
        });
        const newsItem = response.data.news.find(item => item.id === req.params.id);
        if (newsItem) {
            res.json(newsItem);
        } else {
            res.status(404).send('News item not found');
        }
    } catch (error) {
        console.error('Error fetching news item:', error);
        res.status(500).send('Error fetching news item');
    }
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
    
    const {News_overview,News_title, News_img} = qdata

    console.log(qdata)


// replace the special strings with server generated strings
    data = data.replace(/\$OG_TITLE/g,News_title);
    data = data.replace(/\$OG_DESCRIPTION/g,News_overview);
    result = data.replace(/\$OG_IMAGE/g,News_img);
    response.send(result);
  });
});


app.get('/currencies', async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default values: page 1, limit 10

  try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
          params: {
              vs_currency: 'usd',
              order: 'market_cap_desc',
              per_page: limit,
              page: page
          }
      });

      const total = parseInt(response.headers['total-count'] || 100); // Total count of items

      res.json({
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          data: response.data
      });
  } catch (error) {
      console.error('Error fetching data from CoinGecko API:', error);
      res.status(500).send('Error fetching data from CoinGecko API');
  }
});


  app.use(express.static("client/build"))
  if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })

}


 



app.listen(PORT,()=>{
    console.log(`server is runing on local Port Number ${PORT}`)
})