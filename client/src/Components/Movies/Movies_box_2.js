import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import queryString from 'query-string';
import './Movies_box_2.css'
import MoviesBoxMain from  './Movies._box_1.js'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
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

import moment from 'moment'

class MoviesBoxChartShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TMDB_id: '',
            TMDB_Info_Discovery_videos: [],
            TMDB_Trailer: [],
            TMDB_video_name: '',
            TMDB_video_key: '',
            TMDB_poster_path: [],
            TMDB_release_date: [],
            TMDB_title: [],
            TMDB_genres: [],
            TMDB_tagline: [],
            TMDB_overview: [],
            TMDB_production_companies: [],
            TMDB_credit_main_crew: [],

         }

         this.handleChange = this.handleChange.bind(this)
         this.ShareHandle = this.ShareHandle.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

 

   ShareHandle = ()=>{
    toast.dark(
        <div className='logoImg animate__animated animate__slower animate__zoomInLeft welcome_trans_h4'>
           
            <Card >
                
                <Card.Body style={{backgroundColor: 'black'}}>
                    <Card.Text>
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
                    </Card.Text>
                </Card.Body>
                </Card>
        </div>, {
        position: "",
        autoClose: false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
   }
   
    componentDidMount(){

       
        let parsed = queryString.parse(window.location.search);
        let TMDB_id = parsed.TMDB_id
    
    
       
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
    
        axios.get(`http://api.themoviedb.org/3/movie/${TMDB_id}?${TMDB_api}&append_to_response=videos`).then(data => 
        this.setState({
            TMDB_Info_Discovery_videos: data.data,
            TMDB_title: data.data.title,
            TMDB_poster_path: data.data.poster_path,
            TMDB_release_date: data.data.release_date,
            TMDB_genres: data.data.genres,
            TMDB_tagline: data.data.tagline,
            TMDB_overview: data.data.overview,
            TMDB_production_companies: data.data.production_companies,
            TMDB_Trailer: data.data.videos.results,
        }))
        axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}/credits?${TMDB_api}`).then(data => 
        this.setState({
            TMDB_credit_main_crew: data.data.crew,
        }))

       
    
  
      
  }
    render() { 

        let TMDB_video_filter = this.state.TMDB_Trailer.filter(data => data.type === 'Trailer')
        let TMDB_video_key = TMDB_video_filter.map(data => data.key)
        let TMDB_video_name = TMDB_video_filter.map(data => data.name)

        
        let TMDB_TMDB_credit_maincrew_Producer = this.state.TMDB_credit_main_crew.filter(data => data.job === 'Producer' )
        let TMDB_TMDB_credit_maincrew_Screenplay = this.state.TMDB_credit_main_crew.filter(data => data.job === 'Screenplay')
        let TMDB_TMDB_credit_maincrew_Director = this.state.TMDB_credit_main_crew.filter(data => data.job === 'Director')
        let TMDB_TMDB_credit_maincrew_Editor = this.state.TMDB_credit_main_crew.filter(data => data.job === 'Editor')
        let TMDB_TMDB_credit_maincrew_Story = this.state.TMDB_credit_main_crew.filter(data => data.job === 'Story')

        let TMDB_Producer = TMDB_TMDB_credit_maincrew_Producer.map(data => <ul>
            <li>
                <div>
                   <h4>{data.name}</h4>
                   <p className='movie_position_job'>{data.job}</p>
                </div>
            </li>
        </ul>)

        let TMDB_Director = TMDB_TMDB_credit_maincrew_Director.map(data => <ul>
            <li>
                <div>
                   <h4>{data.name}</h4>
                   <p className='movie_position_job'>{data.job}</p>
                </div>
            </li>
        </ul>)

        let TMDB_Screenplay = TMDB_TMDB_credit_maincrew_Screenplay.map(data => <ul>
            <li>
                <div>
                   <h4>{data.name}</h4>
                   <p className='movie_position_job'>{data.job}</p>
                </div>
            </li>
        </ul>)
        let TMDB_Editor = TMDB_TMDB_credit_maincrew_Editor.map(data => <ul>
            <li>
                <div>
                   <h4>{data.name}</h4>
                   <p className='movie_position_job'>{data.job}</p>
                </div>
            </li>
        </ul>)
        let TMDB_Story = TMDB_TMDB_credit_maincrew_Story.map(data => <ul>
            <li>
                <div>
                   <h4>{data.name}</h4>
                   <p className='movie_position_job'>{data.job}</p>
                </div>
            </li>
        </ul>)
        let TMDB_production_companies = this.state.TMDB_production_companies.map(data => <ul>
            <li className='prod_company_list_view'>
                <div  className='prod_company'>
                    <img src={`https://image.tmdb.org/t/p/original/${data.logo_path}`}/>
                    <p className='movie_position_job'>{data.name}</p>
                </div>
            </li>
        </ul>)

        
        
      console.log(this.state.TMDB_Info_Discovery_videos)
      console.log(this.state.TMDB_production_companies)
 
   

      
        return ( 

           
            <div className='movies_box_2_maain'>
                <ToastContainer/>
              <Helmet>
                    <base />
                    <title>NEXT-PLATFORM WATCH MOVIES</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                <meta property="og:description" content='Join the bigest platform NextPlatform HoME Enterterment Music Box' />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section classNme='movieBox_1_section'>
                  
                </section>
               
               <section className='show_movies_now'>
                   <div className="feature_vides_row iframe-container">
                        <iframe width="560" height="315" src={`https://www.youtube.com/embed/${TMDB_video_key[0]}`} title={TMDB_video_name[0]} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
               </section>
               <section className="display_movie_info_main">
                        <section className="movie_box_info movie_box_1_info">
                           <img src={`https://image.tmdb.org/t/p/original/${this.state.TMDB_poster_path}`}/>
                        </section>
                        <section className="movie_box_info movie_box_2_info">
                            <div className="first_div_box_1">
                                <div className="first_div_box_1_tab">
                                   <p className="first_div_box_1_tab_styleColor">Ttitle: </p><h3>{this.state.TMDB_title}</h3><br/>
                                </div>
                                <div onClick={this.ShareHandle} className="share_div">
                                    <p className="first_div_box_1_tab_styleColor">SHARE</p>
                                <img  src={require('../../AllInOne/icons/icons8-share.gif')}/>
                                </div>
                            </div>
                            <div className="other_movie_info_flow">
                                <p>{this.state.TMDB_tagline}</p>
                                 <div className="info_date">
                                    <p>Date Release: </p><h5>({this.state.TMDB_release_date})</h5>
                                 </div>
                                <h5 className="other_movie_info_genres">{this.state.TMDB_genres.map(data => <ul><li>{data.name}</li></ul>)}</h5>
                            </div>
                            <div className="overview_main">
                                <h2>Overview</h2>
                                <p>{this.state.TMDB_overview}</p>
                            </div>
                            <div className="about_head_role">
                                {TMDB_Producer[0]}
                                {TMDB_Director}
                                {TMDB_Story[0]}
                                {TMDB_Editor}
                                {TMDB_Screenplay[0]}
                            </div>
                            <div className="prod_company_list_view">
                                {TMDB_production_companies}
                            </div>
                        </section>
             </section>
            </div>
         );
    }
}
 
export default MoviesBoxChartShow;