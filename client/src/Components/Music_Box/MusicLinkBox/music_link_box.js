import React, { Component } from 'react';
import axios from 'axios'
import'./style.css'
import { Helmet } from 'react-helmet';
import {
    EmailShareButton,
    FacebookShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton
  } from "react-share";
  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";


class MusicLinkBox extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           mp3_api_id: '',
           mp3_api_name: '',
           mp3_api_title: '',
           mp3_api_head_Text_url: '',
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
           social_img: '',
           social_url: ''
         }
         this.handleChange = this.handleChange.bind(this)
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
   

    componentDidMount(){
        var url= document.location.href;
        this.setState({
            social_url: url
        })
        // window.history.pushState({}, "", url.split("?")[0]);

        
        const home_url_location =  window.location.href
        localStorage.setItem('home_url_location',home_url_location)

        const mp3_api_id = localStorage.getItem('mp3_api_id')
        const mp3_api_name = localStorage.getItem('mp3_api_name')
        const mp3_api_title = localStorage.getItem('mp3_api_title')
        const mp3_api_head_Text = localStorage.getItem('mp3_api_head_Text')
        const mp3_api_head_Text_url = localStorage.getItem('mp3_api_head_Text_url')
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
            mp3_api_head_Text_url,
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

        const social_url_location = window.location.href;
       
        const facebook_api = `
        https://www.facebook.com/sharer.php?u=${social_url_location}
        `
        // document.querySelector('.fa-facebook').addEventListener('click',()=>{
        //    window.open(url = facebook_api, )
        // })
       
    }
    render() {
      
      
    //   const sendSocial_link = {
    //     title: this.state.mp3_api_title,
    //     description: this.state.mp3_api_about_Main,
    //     music_type: this.state.mp3_api_music_type,
    //     head_Text_url: this.state.mp3_api_head_Text_url,
    //     on_image: 'https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg'

    //   }
    

      


        return ( 
            <div className='music_link_box'>
            <Helmet>
                <base />
                <title> {this.state.mp3_api_head_Text}</title>
                <meta name="desscription" content={this.state.mp3_api_about_Main} />
                <meta property="og:title" content={this.state.mp3_api_head_Text_url} />
                <meta property="og:description" content={this.state.mp3_api_about_Main} />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                <link rel="canonical" href={this.state.home_url} />
            </Helmet>
                <section className="link_view_1">
                    <div className='both_view'>
                        <h1><span>DOWNLOAD:</span><br/> {this.state.mp3_api_head_Text} Mp3</h1>
                        <div className='view_1_tab'>
                          <h5><i class="fa-solid fa-calendar-check fa-1x"></i> {this.state.mp3_api_date}</h5>
                          <div className='all_eye'>
                              <h5>Viewed 
                            <i class="fa-solid fa-eye fa-1x"></i></h5>
                            <h5>{this.state.mp3_api_eye_seen}</h5>
                          </div>
                        </div>
                        <div className='socail_icon'>
                                <FacebookShareButton  url={window.location.href}>
                                <FacebookIcon size={40}  round={true} />
                            </FacebookShareButton>
                            <PinterestShareButton  url={window.location.href}>
                                <PinterestIcon size={40}  round={true} />
                            </PinterestShareButton>
                            <WhatsappShareButton  url={window.location.href}>
                                <WhatsappIcon size={40}  round={true} />
                            </WhatsappShareButton>
                            <TwitterShareButton  url={window.location.href}>
                            <VKShareButton  url={window.location.href}>
                                <VKIcon size={40}  round={true} />
                            </VKShareButton>
                                <TwitterIcon size={40}  round={true} />
                            </TwitterShareButton>
                            <LineShareButton  url={window.location.href}>
                                <LineIcon size={40}  round={true} />
                            </LineShareButton>
                            <RedditShareButton  url={window.location.href}>
                                <RedditIcon size={40}  round={true} />
                            </RedditShareButton><br/><br/>
                            
                        </div>
                        <div className='socail_icon'>
                              <br/><br/>
                            <ViberShareButton  url={window.location.href}>
                                <ViberIcon size={40}  round={true} />
                            </ViberShareButton>
                            <LinkedinShareButton  url={window.location.href}>
                                <LinkedinIcon size={40}  round={true} />
                            </LinkedinShareButton>
                            <TelegramShareButton  url={window.location.href}>
                                <TelegramIcon size={40}  round={true} />
                            </TelegramShareButton>
                            <OKShareButton  url={window.location.href}>
                                <OKIcon size={40}  round={true} />
                            </OKShareButton>
                            <InstapaperShareButton  url={window.location.href}>
                                <InstapaperIcon size={40}  round={true} />
                            </InstapaperShareButton>
                           
                        </div>
                        <div className='socail_icon'>
                              <br/><br/>
                           
                            <MailruShareButton  url={window.location.href}>
                                <MailruIcon size={40}  round={true} />
                            </MailruShareButton>
                            <TumblrShareButton  url={window.location.href}>
                                <TumblrIcon size={40}  round={true} />
                            </TumblrShareButton>
                            <PocketShareButton  url={window.location.href}>
                                <PocketIcon size={40}  round={true} />
                            </PocketShareButton>
                            < WorkplaceShareButton  url={window.location.href}>
                                <WorkplaceIcon size={40}  round={true} />
                            </ WorkplaceShareButton>
                            <EmailShareButton  url={window.location.href}>
                                <EmailIcon size={40}  round={true} />
                            </EmailShareButton>
                            
                        </div>
                
                    </div>
                <img src={`${this.state.mp3_api_img}`} alt='pic'/>
                
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
                <div className="reffer">
                    <img src={require('../../../AllInOne/advert/7f96701a-987b-412c-b320-d4b307476737.jpg')} alt='pic'/>
                    <img src={require('../../../AllInOne/advert/photo5841186347996525631.jpg')} alt='pic'/>
                </div>
                <div className="reffer">
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/30b5299f-ac96-42b8-973b-46d1fa73d8e1"><img src="https://kol.jumia.com/banners/tpGd5bXW49b01TkUq1IGkx4rYhSIj3QQrLpEXhVS.jpeg" alt="Grocery Category"/></a>
                </div>
               
                </section>
            </div>
         );
    }
}
 
export default MusicLinkBox;