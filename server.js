// const express = require('express')
import express from 'express'
import cors from 'cors'
import dotEnv from 'dotenv'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
// import userRouter from './Router/userRouter.js'
import path  from 'path'
const fs = require('fs');
import ReactDOMServer from 'react-dom/server.js';
import { Helmet } from 'react-helmet';
import App from './client/src/App.js'
dotEnv.config()


mongoose.connect(process.env.DataBaseConnecting,{ useNewUrlParser: true,  useUnifiedTopology: true },()=>{
    console.log('DataBase Connented Successful')
})
const PORT = process.env.PORT || 8000

const app = express()


app.use(cors())
app.use(bodyParser.json())
app.use(express.Router())
app.get('/*', (req, res) => {
    const appString = ReactDOMServer.renderToString(App);
    const helmet = Helmet.renderStatic();

    const html = `<!DOCTYPE html>
      <html lang="en">
        <head>
          ${helmet.title.toString()}
          ${helmet.meta.toString()}
        </head>
        <body>
          <div id="root">
            ${ appString }
          </div>
        </body>
      </html>
    `

    res.send(html);
});

// app.use('/users',userRouter)

if(process.env.NODE_ENV === 'production'){
    app.use(express.static("client/build"))
    app.get('*',(req,res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}




 



app.listen(PORT,()=>{
    console.log(`server is runing on local Port Number ${PORT}`)
})