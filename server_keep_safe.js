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

dotEnv.config()


mongoose.connect(process.env.DataBaseConnecting,{ useNewUrlParser: true,  useUnifiedTopology: true },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000

const JungleServer = express()


JungleServer.use(cors())
JungleServer.use(bodyParser.json())

JungleServer.use('/users',userRouter)

if(process.env.NODE_ENV === 'production'){
    JungleServer.use(express.static("client/build"))
    JungleServer.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}




 



JungleServer.listen(PORT,()=>{
    console.log(`server is runing on local Port Number ${PORT}`)
})



// Router.get('/', function(request, response) {
//     console.log('Home page visited!');
//     const filePath = path.resolve(__dirname, 'client', 'build', 'index.html');
  
//     // read in the index.html file
//     fs.readFile(filePath, 'utf8', function (err,data) {
//       if (err) {
//         return console.log(err);
//       }
      
//       // replace the special strings with server generated strings
//       data = data.replace(/\$OG_TITLE/g, 'Home Page');
//       data = data.replace(/\$OG_DESCRIPTION/g, "Home page description");
//       result = data.replace(/\$OG_IMAGE/g, 'https://i.imgur.com/V7irMl8.png');
//       response.send(result);
//     });
//   });


// const path = require('path')
// const webpackNodeExternals = require('webpack-node-externals')


// module.exports = {
//   target: 'node',
//   entry: './server.js',
//   output: {
//     filename: 'bundle.js',
//     path: path.resolve(__dirname,'build'),
//     publicPath: '/build'
//   },
//   module: {
//      rules: [
//        {
//          test: /\.js$/,
//          loader: 'babel-loader',
//          exclude: '/node_modules/',
//          options: {
//             presets: [
//               'react',
//               'stage-0',
//               ['env',{
//                 target: {browsers: ['last 2 versions']}
//               }]
//             ]
//          }
//        }
//      ]
//   },
//   externals: [webpackNodeExternals()]
// };