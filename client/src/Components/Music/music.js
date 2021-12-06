import React, { Component } from 'react';
import './style.css'
// import './getMe.js'
// import './script_function.js'
import axios from 'axios'
import { Helmet } from 'react-helmet';
import {TimelineLite, TimelineMax} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger'
const SpotifyWebApi = require('spotify-web-api-node');
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
             Spotify_CoolForNow_PlayList_title: [],
             searchResult: []
            //  Spotify_CoolForNow_PlayList_uri: '',
            //  Spotify_CoolForNow_PlayList_albumurl: '',
            //  spotify_access_token: [],
            //  setAccessToken: []
             


             

            }
            this.handleChange = this.handleChange.bind(this)
            // this.Spotify_CoolForNow_PlayList = this.Spotify_CoolForNow_PlayList.bind(this)
           
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

   

    componentDidMount(){
          
          
        const code = new URLSearchParams(window.location.search).get('code')
         this.setState({
             code
         })
         
        // axios.post(`http://localhost:8000/login_spotify` ).then(window.location = "/music")
        
        if(code){
            axios.post(`http://localhost:8000/users/spotify_login`,{code}).then((response) => {

                // If success then cut the code string from the URL and execute the other thing
                window.history.pushState({}, null, "/music");
        
                console.log(response.data);
                this.setState({
                    setAccessToken: response.data.accessToken
                })
                localStorage.setItem('spotify_access_token',this.state.setAccessToken)
                
        
              })
        
        }
        var credentials = {
            clientId: '7274681e5f564e29b6246893ed62f20a',
            clientSecret: '6c641ca17e444af4a111c84d7f83ddb9',
            redirectUri: 'http://localhost:3000/music',
            accessToken: token,
          };
        const spotifyApi = new SpotifyWebApi(credentials);
          spotifyApi.setAccessToken(token);

          spotifyApi.getArtistAlbums('43ZHCT0cAZBISjO8DG9PnE')
          .then((data)=>{
             console.log('Artist albums from music data', data.body.items.map(data => data));

              this.setState({Spotify_CoolForNow: data.body.items.map(data => data) })
             
          })
            // axios.get(`https://api.spotify.com/v1/me/playlists`,{
            //     headers: {Authorization: `Bearer ${token}`}
            // }).then(data => console.log(data))
            
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
      
        console.log('this state Spotify_CoolForNow data ', this.state.Spotify_CoolForNow)
        // console.log('this state searchResult '+ this.state.searchResult)

   

       const Auth_url = `https://accounts.spotify.com/authorize?client_id=${this.state.clientId}&response_type=code&redirect_uri=${this.state.redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
        return ( 
            <div className='music_main'>
                 <Helmet>
                    <base />
                    <title>NEXT-PLATFORM MUSIC</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <h1>MUSIC</h1>
                {this.state.Spotify_CoolForNow.map(data => {
                    return(
                        <div className='coolForNow'>
                            {data.name}
                            <img src={data.images}/>
                            {data.artists[0].name}
                            {data.uri}
                            
                        </div> 
                    )
                })}
                <input className='LoginInput' type='search' name='searchResult'  onChange={this.handleChange('searchResult')}/>
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