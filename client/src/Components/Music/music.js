import React, { Component } from 'react';
import './style.css'
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios'
import { Helmet } from 'react-helmet';
import {gsap} from 'gsap'
import {Button,Card} from 'react-bootstrap'
import{ScrollTrigger} from 'gsap/ScrollTrigger.js'
import MusicReceivedMain from '../Music_Received/music_receivedMain.js';
import SportifyMusicMain from '../SportifyMusic/sportifyMusic';
// const SpotifyWebApi = require('spotify-web-api-node');
let token_main = localStorage.getItem('spotify_access_token')
const token = token_main;




class MusicMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
             music_data: [] ,
             music_login:  [],
             authEndpoint: 'https://accounts.spotify.com/authorize',
             clientId: '7274681e5f564e29b6246893ed62f20a',
             redirectUri: 'http://localhost:3000/music',
             code: '',
             Spotify_CoolForNow: [],
             Spotify_PlayList_1: [],
             searchResult: [],
             setAccessToken: [],
             spotify_new_release_focus: [],
             


             

            }
            this.handleChange = this.handleChange.bind(this)
            // this.Spotify_CoolForNow_PlayList = this.Spotify_CoolForNow_PlayList.bind(this)
           
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

   

    componentDidMount(){
          
      


         
          

            // fetch("https://api.spotify.com/v1/me/player/devices", {
            //     method: "GET",
            //     headers: {
            //       Authorization: `Bearer ${this.state.setAccessToken}`
            //     }
            //   })
            //   .then(response =>console.log(response))


               
             
          
                // axios.get(`https://open.spotify.com/genre/section0JQ5DAob0JCuWaGLU6ntFY`, config).then((data)=>{
                //     this.setState({
                //         spotify_new_release_focus: data
                //     })
                // })
         
            
            gsap.registerPlugin(ScrollTrigger)
             const RegisterMusicMainTrigger = ()=>{
            const T_L = gsap.timeline()
            
            T_L
            .from('.music_prara_box_1',{xPercent: -100})
            .from('.music_prara_box_2',{xPercent: 100})
            .from('.music_prara_box_3',{xPercent: -100})
            .from('.music_prara_box_4',{yPercent: -100})

            ScrollTrigger.create({ 
                animation: T_L,
                trigger: '.music_para',
                start: '5px 0%',
                end: '+=1000',
                scrub: true,
                pin: true,
                anticipatePin: 1,
                // pinSpacing: false
            })
        }
          
        RegisterMusicMainTrigger()

       
    }
    render() { 
      
        // console.log(this.state.Spotify_CoolForNow)

        // console.log('this state searchResult '+ this.state.searchResult)
       

     

        return ( 
            <div className='music_main'>
                 <Helmet>
                    <base />
                    <title>NEXT-PLATFORM MUSIC</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section className="sectionMianLayOut">
                    <SportifyMusicMain/>
                    <MusicReceivedMain/>
                </section>
                <section className="spotify_CoolForNow_section_1">
                    <div className="Spotify_PlayList_CoolForNow">
                        {this.state.Spotify_CoolForNow.map(data => { 
                            return(
                                <div className='coolForNow'>
                                    <Card  style={{backgroundColor: 'black', color: "white", padding: "0.5em" }}>
                             
                                       <Card.Img src={data.track.album.images[0].url} />
                                        <Card.Body>
                                            <Card.Title style={{ color: 'rgb(236, 78, 78)' }}><h1>{data.track.name}</h1></Card.Title>
                                            <Card.Title style={{ color: 'white' }}><h1>{data.track.artists[0].name}</h1></Card.Title>
                                        </Card.Body>
                                        </Card>
                                </div> 
                            )
                        })}
                    </div>
                </section>
            </div>
         );
    }
}
 
export default MusicMain;