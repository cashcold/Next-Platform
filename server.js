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
const webpush = require("web-push");

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