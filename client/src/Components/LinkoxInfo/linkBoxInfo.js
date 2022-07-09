import React, { Component } from 'react';
import './style.css'
import { Helmet } from 'react-helmet';
import axios from 'axios'
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

class LinkBoxInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            on_image: '',
            img: '',
            home_url: '',
        }
    }

    
    componentDidMount(){

        const title = localStorage.getItem('linkBox_api_title')
        const description = localStorage.getItem('linkBox_api_description')
        const on_image = localStorage.getItem('linkBox_api_social_on_image')
        const img = localStorage.getItem('linkBox_api_img')
        const home_url = localStorage.getItem('home_url')
        
        
        this.setState({
            title,description,on_image,img,home_url
        })
       
    }
    render() { 
        return ( 
            <div className='watch_next_main'>
                 <Helmet>
                    <base />
                    <title>{this.state.title}</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>

              <section className='linkBox_info_main'>
               
                  <div>
                    <img src={`${this.state.img}`} alt='pic'/>
                    {/* <img src={`${this.state.home_url}${this.state.img}`} alt='pic'/> */}
                    <h1>{this.state.title}</h1>
                    <h4>{this.state.description}</h4>
                  </div>
                  <div className="info_social">
                    <div className='socail_icon'>
                    <FacebookShareButton  url={window.location.href}>
                        <FacebookIcon size={40} round={true}/>
                    </FacebookShareButton>
                    <PinterestShareButton  url={window.location.href}>
                        <PinterestIcon size={40} round={true}/>
                    </PinterestShareButton>
                    <WhatsappShareButton  url={window.location.href}>
                        <WhatsappIcon size={40} round={true}/>
                    </WhatsappShareButton>
                    <TwitterShareButton  url={window.location.href}>
                    <VKShareButton  url={window.location.href}>
                        <VKIcon size={40} round={true}/>
                    </VKShareButton>
                        <TwitterIcon size={40} round={true}/>
                    </TwitterShareButton>
                    <LineShareButton  url={window.location.href}>
                        <LineIcon size={40} round={true}/>
                    </LineShareButton>
                    <RedditShareButton  url={window.location.href}>
                        <RedditIcon size={40} round={true}/>
                    </RedditShareButton>
                    <ViberShareButton  url={window.location.href}>
                        <ViberIcon size={40} round={true}/>
                    </ViberShareButton>
                    <LinkedinShareButton  url={window.location.href}>
                        <LinkedinIcon size={40} round={true}/>
                    </LinkedinShareButton>
                    <TelegramShareButton  url={window.location.href}>
                        <TelegramIcon size={40} round={true}/>
                    </TelegramShareButton>
                    <OKShareButton  url={window.location.href}>
                        <OKIcon size={40} round={true}/>
                    </OKShareButton>
                    <InstapaperShareButton  url={window.location.href}>
                        <InstapaperIcon size={40} round={true}/>
                    </InstapaperShareButton>
                    <MailruShareButton  url={window.location.href}>
                        <MailruIcon size={40} round={true}/>
                    </MailruShareButton>
                    <TumblrShareButton  url={window.location.href}>
                        <TumblrIcon size={40} round={true}/>
                    </TumblrShareButton>
                    <PocketShareButton  url={window.location.href}>
                        <PocketIcon size={40} round={true}/>
                    </PocketShareButton>
                    < WorkplaceShareButton  url={window.location.href}>
                        <WorkplaceIcon size={40} round={true}/>
                    </ WorkplaceShareButton>
                    <EmailShareButton  url={window.location.href}>
                        <EmailIcon size={40} round={true}/>
                    </EmailShareButton>
                    </div>
                </div>
              </section>
            </div>
         );
    }
}
 
export default LinkBoxInfo;