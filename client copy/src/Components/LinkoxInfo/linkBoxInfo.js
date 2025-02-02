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
            id: '',
            title: '',
            title_url: '',
            description: '',
            description_main_1: '',
            description_main_2: '',
            description_main_3: '',
            facebook: '',
            whatsapp: '',
            call: '',
            email: '',
            twitter: '',
            site_Address: '',
            on_image: '',
            img: '',
            home_url: '',
        }
    }

    
    componentDidMount(){

        const id = localStorage.getItem('linkBox_api_id')
        const title = localStorage.getItem('linkBox_api_title')
        const title_url = localStorage.getItem('linkBox_api_title_url')
        const description = localStorage.getItem('linkBox_api_description')
        const description_main_1 = localStorage.getItem('linkBox_api_description_main_1')
        const description_main_2 = localStorage.getItem('linkBox_api_description_main_1')
        const description_main_3 = localStorage.getItem('linkBox_api_description_main_1')
        const facebook = localStorage.getItem('linkBox_api_contact_facebook')
        const whatsapp = localStorage.getItem('linkBox_api_contact_whatsapp')
        const call = localStorage.getItem('linkBox_api_contact_call')
        const email = localStorage.getItem('linkBox_api_contact_email')
        const twitter = localStorage.getItem('linkBox_api_contact_twitter')
        const site_Address = localStorage.getItem('linkBox_api_contact_site_Address')
        const img = localStorage.getItem('linkBox_api_img')
        const home_url = localStorage.getItem('home_url')
        
        
        this.setState({
            id,title,description,img,home_url,title_url,description_main_1,description_main_2,description_main_3,facebook,whatsapp,call,email,twitter,site_Address
        })
       
    }
    render() { 
        return ( 
            <div className='watch_next_main'>
                 <Helmet>
                    <base />
                    <title>{this.state.title}</title>
                    <meta name="description" content="NEXT-PLATFORM" />
                    <link rel="canonical" href="somelink" />
                </Helmet>

              <section className='linkBox_info_main'>
               
                  <div className='flow_LinkBox_Main_box_1'>
                    <img src={`${this.state.img}`} alt='pic'/>
                    <h1>{this.state.title}</h1>
                    <h5>{this.state.description}</h5>
                    <h5>{this.state.description_main_1}</h5>
                    <h5>{this.state.description_main_2}</h5>
                    <h5>{this.state.description_main_3}</h5>
                  </div>
                 
              </section>
              <section className='contactMeLink'>
                <h2 className='contact_h2'>CONTACT US
                <hr className='breake_contact_hr'/></h2>
                <div className='flow_contact_linkMe'>
                       <div className='socialDropLinkBox'>
                       <div className='socialDropLinkBox_box_now'>
                                <h3>WHATSAPP US</h3>
                                <h4>{this.state.whatsapp}</h4>
                            </div>
                            <div className='socialDropLinkBox_box_now'>
                                <h3>EMAIL US</h3>
                                <h4>{this.state.email}</h4>
                            </div>
                            <div className='socialDropLinkBox_box_now'>
                                <h3>FACEBOOK </h3>
                                <h4>{this.state.facebook}</h4>         
                            </div>
                            <div className='socialDropLinkBox_box_now'>
                                <h3>CALL US</h3>
                                <h4>{this.state.call}</h4>
                            </div>
                            <div className='socialDropLinkBox_box_now'>
                                <h3>TWITTER</h3>
                                <h4>{this.state.twitter}</h4>
                            </div>
                            <div className='socialDropLinkBox_box_now'>
                                <h3>WEBSITE</h3>
                                <h4>{this.state.site_Address}</h4>
                            </div>
                        </div>
                    </div>
              </section>
              <section className='socialFlowIcons'>
                    <h1>SHARE</h1>
                    <div className="info_social">
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
              </section>
            </div>
         );
    }
}
 
export default LinkBoxInfo;