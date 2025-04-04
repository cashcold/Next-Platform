import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
import { Helmet } from 'react-helmet';
import loading_io_2 from '../../AllInOne/img2/Ellipsis-1.3s-214px.svg'
import './sportDropInfo.css'
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

class SportDropInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            scoreBat_pd_thumbnail: '',
            scoreBat_pd_competition: '',
            scoreBat_pd_title: '',
            sscoreBat_pd_date: '',
            scoreBat_pd_embed: '',
            scoreBat_pd_embed: ''
         }
    }

    componentDidMount(){

        setTimeout(()=>{
            toast.dark(
                <div className='logoImg animate__animated animate__slower animate__heartBeat welcome_trans_h4'>
                   
                    <Card >
                        
                        <Card.Body>
                            <Card.Text>
                            <div className="btc_shark_img">
                                <a target='_blank' href='tel:+233203808479'>
                                <img className="d-block w-100"  src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBUY%20BITCOIN.jpg?alt=media&token=95e601b7-808f-412f-8360-e8b7eb025798"
                            alt="First slide" />
                                </a>
                                
                                </div>
                            </Card.Text>
                        </Card.Body>
                        </Card>
                </div>, {
                position: "top-right",
                autoClose: false,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
           },20000)
       
         const scoreBat_pd_thumbnail = localStorage.getItem('scoreBat_pd_thumbnail')
         const scoreBat_pd_competition = localStorage.getItem('scoreBat_pd_competition')
         const scoreBat_pd_title = localStorage.getItem('scoreBat_pd_title')
         const scoreBat_pd_date = localStorage.getItem('scoreBat_pd_date')
         const scoreBat_pd_embed = localStorage.getItem('scoreBat_pd_embed')

         this.setState({
            scoreBat_pd_thumbnail,
            scoreBat_pd_competition,
            scoreBat_pd_title,
            scoreBat_pd_date,
            scoreBat_pd_embed
         })


        document.querySelector('.scoreBat_embeded').innerHTML = ` 
        ${scoreBat_pd_embed}
    `


      
    }
    render() { 
     
        return ( 
            <div className='sport_info_drop_main'>
                   <ToastContainer/>
                  <Helmet>
                <base />
                <title> {this.state.scoreBat_pd_title}</title>
                <meta name="desscription" content={this.state.scoreBat_pd_competition} />
                <meta property="og:title" content={this.state.scoreBat_pd_title} />
                <meta property="og:description" content={this.state.scoreBat_pd_competition} />
                <meta property="og:image" content={this.state.scoreBat_pd_thumbnail} />
            </Helmet>
                <div className="sport_drop_table">
                    <section className="sport_table_1">
                    <h1 className='competition'>{this.state.scoreBat_pd_competition}</h1>
                    <h2>{this.state.scoreBat_pd_title}</h2>
                    <img className='loading_io_2' src={loading_io_2} alt='pic'/>
                    <div className="scoreBat_embeded"></div>
                    <div className="all_icons">
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
                    <section className="sport_table_2">

                    </section>
                </div>  
            </div>
         );
    }
}
 
export default SportDropInfo;