import React, { Component } from 'react';
import axios from 'axios'
import'./style.css'
import { Helmet } from 'react-helmet';

class MusicLinkBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           mp3_api_id: '',
           mp3_api_name: '',
           mp3_api_title: '',
           mp3_api_head_Text: '',
           mp3_api_text: '',
           mp3_api_img: '',
            home_url: '',
           mp3_api_date: '',
           mp3_api_eye_seen: '',
           mp3_api_music_type: '',
           mp3_api_song_href: '',
           mp3_api_about_Main: '',
           home_url_location: '',
           social_img: ''
         }
         this.handleChange = this.handleChange.bind(this)
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
   

    componentDidMount(){
        const home_url_location =  window.location.href
        localStorage.setItem('home_url_location',home_url_location)

        const mp3_api_id = localStorage.getItem('mp3_api_id')
        const mp3_api_name = localStorage.getItem('mp3_api_name')
        const mp3_api_title = localStorage.getItem('mp3_api_title')
        const mp3_api_head_Text = localStorage.getItem('mp3_api_head_Text')
        const mp3_api_text = localStorage.getItem('mp3_api_text')
        const mp3_api_img = localStorage.getItem('mp3_api_img')
        const mp3_api_date = localStorage.getItem('mp3_api_date')
        const mp3_api_eye_seen = localStorage.getItem('mp3_api_eye_seen')
        const mp3_api_music_type = localStorage.getItem('mp3_api_music_type')
        const mp3_api_song_href = localStorage.getItem('mp3_api_song_href')
        const mp3_api_about_Main = localStorage.getItem('mp3_api_about_Main')
        const home_url = localStorage.getItem('home_url')

        this.setState({
            mp3_api_id,
            mp3_api_name,
            mp3_api_title,
            mp3_api_head_Text,
            mp3_api_text,
            mp3_api_img,
            mp3_api_date,
            mp3_api_eye_seen,
            mp3_api_music_type,
            mp3_api_song_href,
            mp3_api_about_Main,
            home_url_location,
            home_url
            
        })

       
       

        document.querySelector('.fa-facebook').addEventListener('click',()=>{
          
        })
       

       

    }
    render() {
    //    console.log(this.state)

        return ( 
            <div className='music_link_box'>
            <Helmet>
                <base />
                <title> {this.state.mp3_api_head_Text}</title>
                <meta name="desscription" content={this.state.mp3_api_about_Main} />
                <meta property="og:title" content={this.state.mp3_api_head_Text} />
                <meta property="og:description" content={this.state.mp3_api_about_Main} />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                <link rel="canonical" href={this.state.home_url} />
            </Helmet>
                <section className="link_view_1">
                    <div className='both_view'>
                        <h1>DOWNLOAD: {this.state.mp3_api_head_Text} Mp3</h1>
                        <div className='view_1_tab'>
                          <h5><i class="fa-solid fa-calendar-check fa-1x"></i> {this.state.mp3_api_date}</h5>
                          <div className='all_eye'>
                              <h5>View 
                            <i class="fa-solid fa-eye fa-1x"></i></h5>
                            <h5>{this.state.mp3_api_eye_seen}</h5>
                          </div>
                        </div>
                        <div className='socail_icon'>
                            <i class="fa-brands fa-facebook fa-3x "></i>
                            <i class="fa-brands fa-twitter fa-3x"></i>
                            <i class="fa-brands fa-pinterest fa-3x"></i>
                            <i class="fa-brands fa-whatsapp fa-3x"></i>
                        </div>
                
                    </div>
                <img src={`${this.state.home_url}${this.state.mp3_api_img}`} alt='pic'/>
                
                <div className='download_link'>
                    <a className='btn btn-danger' href={`${this.state.mp3_api_song_href}`} download>DOWNLOAD</a>
                </div>
                <div className='about_main'>
                    <h3>{this.state.mp3_api_about_Main}</h3>
                </div>
                <div className="other_mp3_info">
                    <h2>Stream and Download {this.state.mp3_api_music_type} musician {this.state.mp3_api_name} new song <br/>
                    captioned {this.state.mp3_api_title} Mp3 By {this.state.mp3_api_name}  –{this.state.mp3_api_title}
                    </h2>
                </div>
                <div className='steam_song'>
                    <audio
                        controls
                        src={`${this.state.mp3_api_song_href}`}>
                            Your browser does not support the
                            <code>audio</code> element.
                    </audio>
                </div>
                </section>
                <section className='link_view_2'>
                    <h1>Hello</h1>
                </section>
            </div>
         );
    }
}
 
export default MusicLinkBox;