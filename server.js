const express = require('express')
const cors = require('cors')
const dotEnv = require('dotenv')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const userRouter = require('./Router/userRouter')
const path = require('path')
var SpotifyWebApi = require('spotify-web-api-node');
const fs = require('fs');
var Ebay = require('ebay-node-api')
const axios = require('axios')
const queryString = require('query-string');
const { parse } = require('querystring')

dotEnv.config()




mongoose.connect(process.env.DataBaseConnecting,{ useNewUrlParser: true,  useUnifiedTopology: true },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use('/users',userRouter)



app.get('/', function(request, response) {
    const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
    // read in the index.html file
    fs.readFile(filePath, 'utf8', function (err,data) {
      if (err) {
        return console.log(err);
      }
      
      // replace the special strings with server generated strings
      data = data.replace(/\$OG_TITLE/g, 'NEXT-PLATFORM-HOME');
      data = data.replace(/\$OG_DESCRIPTION/g, "Join the bigest platform NextPlatform HoME Enterterment Music Box");
      result = data.replace(/\$OG_IMAGE/g, 'http://nest-platform.herokuapp.com/static/media/Amb-Lawrence-I-Still-Believe.0ad92c107bc5a518840e.jpg');
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






// axios.post(`http://localhost:8000/`)







// app.get(`/music/${}}/id`, function(request, response) {
 
//     const filePath = path.resolve(__dirname, './client/build' ,'index.html');
  
//     // read in the index.html file
//     fs.readFile(filePath, 'utf8', function (err,data) {
//       if (err) {
//         return console.log(err);
//       }
      
//       // replace the special strings with server generated strings
//       data = data.replace(/\$OG_TITLE/g, 'Check Your Music ');
//       data = data.replace(/\$OG_DESCRIPTION/g, "bigest platform NextPlatform HoME Enterterment Music Box");
//       result = data.replace(/\$OG_IMAGE/g, 'http://nest-platform.herokuapp.com/static/media/Rosam-Im-free.96157f170e836c264ab6.jpeg');
//       response.send(result);
//     });
//   });





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