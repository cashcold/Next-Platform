import React, { Component } from 'react';
import './style.css'
import './getMe.js'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import {TimelineLite, TimelineMax} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger'


class MusicMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
             music_data: [] ,
             music_login:  [],
             clientId: '7274681e5f564e29b6246893ed62f20a',
             redirectUri: 'http://localhost:3000/music',
             code: '',
            //  access_token: 'BQDx64wp42MwJiS_7ymfcfDrNc9dpCMOfGSI_AieSyCdXby-S9eZ7UbIHZ4ozcsdu4W4mHJCwagnTAmcZ6KU3txer2reoiWz2Ch4PCvW99qRSA3K8ZmxTvWtXOJ2nz_GJFGRZ2MeXxEYaYOPD9Z_arQZ2xWR4nF3rmXBo46NUvCvLz8XGf_brljksX8GIJO2gIus7i9fn4rsxmNImXY1Ab7l_iLD2OdWH01rpz5_3y_qpZwxPDSEENnq7OD6sWGD5arD3CNy8zmDyDNdaABO0zisi_mwI7YRqkV5Iugh5p5vv07Nn6B9'
             

            }
            this.handleChange = this.handleChange.bind(this)
           
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    componentDidMount(){
        const code = new URLSearchParams(window.location.search).get('code')
         this.setState({
             code
         })
        //  alert(code)


        
        // axios.post(`http://localhost:8000/login_spotify` )
        axios.post(`http://localhost:8000/music`,{code}).then(data => this.setState({
            music_data: data
           
         }))
         .then(data => console.log(data))


         
        
         console.log(this.state.music_data)
        gsap.registerPlugin(ScrollTrigger)
       

          
        const RegisterMusicMainTrigger = ()=>{
            const T_L = gsap.timeline()
            
            T_L
            .from('.music_prara_box_1',{xPercent: -100})
            .from('.music_prara_box_2',{xPercent: 100})
            .from('.music_prara_box_3',{xPercent: -100})
            .from('.music_prara_box_4',{xPercent: -100})

            ScrollTrigger.create({ 
                animation: T_L,
                trigger: '.music_para',
                start: '5px 0%',
                end: '+=1000',
                scrub: true,
                pin: true,
                anticipatePin: 1
            })
        }
          
        RegisterMusicMainTrigger()

       
    }
    render() { 
        console.log(this.state.music_data)

    const scopes = [
    'ugc-image-upload',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'streaming',
    'app-remote-control',
    'user-read-email',
    'user-read-private',
    'playlist-read-collaborative',
    'playlist-modify-public',
    'playlist-read-private',
    'playlist-modify-private',
    'user-library-modify',
    'user-library-read',
    'user-top-read',
    'user-read-playback-position',
    'user-read-recently-played',
    'user-follow-read',
    'user-follow-modify'
  ];

       const Auth_url = `https://accounts.spotify.com/authorize?client_id=${this.state.clientId}&response_type=code&redirect_uri=http://localhost:3000/music&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
        return ( 
            <div className='music_main'>
                 <Helmet>
                    <base />
                    <title>NEXT-PLATFORM MUSIC</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <h1>MUSIC</h1>
                <a href={`${Auth_url}`}><h3>Check Spotify Login</h3></a>
                <div className="music_para">
                    <section className="music_prara_box_1">
                    <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/ab67616d0000b2736a1f5bea27488489a5c6d604.jpg')}
                                    alt="First slide"
                                />
                    </section>
                    <section className="music_prara_box_2">
                    <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/7988ab7e47764d3e861de705f1bd4605.640x640x1.jpg')}
                                    alt="First slide"
                                />
                    </section>
                    <section className="music_prara_box_3">
                    <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/d6900db9766fbea444d9709c16e664c99843e236c4989a62440786cf51f0851b.jpeg')}
                                    alt="First slide"
                                />
                    </section>
                    <section className="music_prara_box_4">
                    <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/big_shaq.jpeg')}
                                    alt="First slide"
                                />
                    </section>
                </div>
            </div>
         );
    }
}
 
export default MusicMain;