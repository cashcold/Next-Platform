import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import queryString from 'query-string';
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import './Movies_box_2.css'
import MoviesBoxMain from  './Movies._box_1.js'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
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


class MoviesBoxChartShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            offset: 0,
            data: [],
            perPage: 12,
            currentPage: 0,
            loading: [],
            TMDB_id: '',
            TMDB_Info_Discovery_videos: [],
            TMDB_Trailer: [],
            TMDB_video_name: '',
            TMDB_video_key: '',
            TMDB_poster_path: [],
            TMDB_backdrop_path: [],
            TMDB_release_date: [],
            TMDB_title: [],
            TMDB_genres: [],
            TMDB_tagline: [],
            TMDB_overview: [],
            TMDB_credit_main_crew: [],
            TMDB_credit_main_cast: [],
            TMDB_credit_main_check: [],
            TMDB_review_main_check: [],
            TMDB_review_main_content: [],
            TMDB_review_main_avatar_path: [],
            TMDB_review_main_name: [],
            TMDB_review_main_updated_at: [],
            TMDB_similar_main_check: [],
            loading_next_movie_qury: 2,
            TMDB_movie_id: []

         }

         this.handleChange = this.handleChange.bind(this)
         this.ShareHandle = this.ShareHandle.bind(this)
         this.handlePageClick = this.handlePageClick.bind(this);
         
         this.loading_next_movies_qury = this.loading_next_movies_qury.bind(this)
         this.loading_prev_movie_qury = this.loading_prev_movie_qury.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    handlePageClick = (e) => { 
       const selectedPage = e.selected;
       const offset = selectedPage * this.state.perPage;

       this.setState({
           currentPage: selectedPage,
           offset: offset
       }, () => {
           this.receivedData()
       });

   };
   
   handleChange = input => (event)=>{
       this.setState({[input]: event.target.value})
   }
   receivedData() {
    let parsed = queryString.parse(window.location.search);
    let TMDB_id = parsed.TMDB_id


   
    const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
       axios
           .get(`https://api.themoviedb.org/3/movie/${TMDB_id}/credits?${TMDB_api}`)
           .then(data => {
               data = data.data.cast
               const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
               const postData = slice.map(data => <React.Fragment>
                   <div className="movies_box_main_in_credit">
                        <div>
                            <img src={`https://image.tmdb.org/t/p/original${data.profile_path}`}/>
                        <h4 className='movie_position_name'>{data.name}</h4>
                        <p className='movie_position_job'>{data.character}</p>
                        </div>
                   </div>
                 
               </React.Fragment>)
             
               this.setState({
                   pageCount: Math.ceil(data.length / this.state.perPage),
                  
                   postData
               })
           });
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

   loading_next_movies_qury(e){
    e.preventDefault()
  
    this.setState({
        loading_next_movie_qury: this.state.loading_next_movie_qury + 1
    })

    let parsed = queryString.parse(window.location.search);
    let TMDB_id = parsed.TMDB_id

    const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'

    axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}/similar?${TMDB_api}&language=en-US&page=${this.state.loading_next_movie_qury}`).then(data => 
    this.setState({
        TMDB_similar_main_check: data.data.results,
    }))
    window.scrollTo(0, 0)

    console.log(this.state.TMDB_similar_main_check)
}
loading_prev_movie_qury(e){
    e.preventDefault()
  
    this.setState({
        loading_next_movie_qury: this.state.loading_next_movie_qury - 1
    })

    let parsed = queryString.parse(window.location.search);
    let TMDB_id = parsed.TMDB_id

    const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'

    axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}/similar?${TMDB_api}&language=en-US&page=${this.state.loading_next_movie_qury}`).then(data => 
    this.setState({
        TMDB_similar_main_check: data.data.results,
    }))
    window.scrollTo(0, 0)

    console.log(this.state.TMDB_similar_main_check)
}
   
    componentDidMount(){

        setTimeout(()=>{
            <React.Fragment>
        
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-lg">Large modal</button>
            
            <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-lg">
                <div class="modal-content">
                  ...
                </div>
              </div>
            </div>
            
         
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target=".bd-example-modal-sm">Small modal</button>
            
            <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog" aria-labelledby="mySmallModalLabel" aria-hidden="true">
              <div class="modal-dialog modal-sm">
                <div class="modal-content">
                  ...
                </div>
              </div>
            </div>
            </React.Fragment>
        },50000)
        
        

        setTimeout(()=>{
        toast.dark(
            <div className='logoImg animate__animated animate__slower animate__heartBeat welcome_trans_h4'>
               
                <Card >
                    
                    <Card.Body>
                        <Card.Text>
                        <div className="btc_shark_img">
                            <a target='_blank' href='tel:+233203808479'>
                            <img className="d-block w-100"  src={require('../../AllInOne/BTC_SHARK/A2 STICKER-01 (1).jpg')}
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
        this.receivedData()
       
        let parsed = queryString.parse(window.location.search);
        let TMDB_id = parsed.TMDB_id
    
    
       
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
    
        axios.get(`http://api.themoviedb.org/3/movie/${TMDB_id}?${TMDB_api}&append_to_response=videos`).then(data => 
        this.setState({
            TMDB_Info_Discovery_videos: data.data,
            TMDB_title: data.data.title,
            TMDB_poster_path: data.data.poster_path,
            TMDB_backdrop_path: data.data.backdrop_path,
            TMDB_release_date: data.data.release_date,
            TMDB_genres: data.data.genres,
            TMDB_tagline: data.data.tagline,
            TMDB_overview: data.data.overview,
            TMDB_Trailer: data.data.videos.results,
        }))
        axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}/credits?${TMDB_api}`).then(data => 
        this.setState({
            TMDB_credit_main_check: data.data,
            TMDB_credit_main_crew: data.data.crew,
            TMDB_credit_main_cast: data.data.cast,
        }))
        axios.get(`https://api.themoviedb.org/3/movie//${TMDB_id}/reviews?${TMDB_api}&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_review_main_check: data.data.results,
            TMDB_review_main_content: data.data.results[0].content,
            TMDB_review_main_avatar_path: data.data.results[0].author_details.avatar_path,
            TMDB_review_main_name: data.data.results[0].author_details.name,
            TMDB_review_main_updated_at: data.data.results[0].updated_at,
        }))

        
        axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}/similar?${TMDB_api}&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_similar_main_check: data.data.results,
            
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
        let Similar_Main_Movies = this.state.TMDB_similar_main_check.map(data =>  <React.Fragment className='movies_swiper_frag'>
        <div className="movies_box_main_in" onClick={()=>{
            const TMDB_api_ParamsUrl = { 
                TMDB_id: data.id,
                TMDB_title: data.title,
                TMDB_overview: data.overview,
                TMDB_img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
            }
            const queryMusicParams = require('query-string')

            const passTMDB_api_Params = queryMusicParams.stringify(TMDB_api_ParamsUrl)
            
            window.location =`/watch_movies/${data.title}?${passTMDB_api_Params}`
          }}>
            <div>
            <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}/>
            <h4 className='movie_position_name'>{data.title}</h4>
            {
                
            }
        
            </div>
        </div>
         
          
         </React.Fragment>)
     
     
    

        
        
      
    //   console.log(this.state.TMDB_Info_Discovery_videos)
 
   

      
        return ( 

           
            <div className='movies_box_2_maain'>
                <ToastContainer/>
              <Helmet>
                    <base />
                    <title>{this.state.TMDB_title}</title>
                    <meta name="description" content={this.state.TMDB_overview} />
                    <meta property="og:title" content={this.state.TMDB_title} />
                <meta property="og:description" content={this.state.TMDB_overview}  />
                <meta property="og:image" content={`https://image.tmdb.org/t/p/original${this.state.TMDB_poster_path}`}/>
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section className='movieBox_1_back_tab' onClick={()=>{
                     window.location =`/movies_home_box`
                }}>
                    <img  src={require('../../AllInOne/icons/icons8-go-back.gif')}/>
                        <p className="">Back</p>
                </section>
               
               <section className='show_movies_now_boot'>
                   <div class="embed-responsive embed-responsive-16by9">
                   <iframe class="embed-responsive-item" src={`https://www.youtube.com/embed/${TMDB_video_key[0]}?rel=0`} title={TMDB_video_name[0]} allowfullscreen></iframe>
                    </div>
               </section>
               <section className="display_movie_info_main">
                        <section className="movie_box_info movie_box_1_info">
                           <img src={`https://image.tmdb.org/t/p/original${this.state.TMDB_poster_path}`}/>
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
                                    <p>Date Release: </p><h5>({moment(this.state.TMDB_release_date).format('LLLL')})</h5>
                                    {/* <p>Date Release: </p><h5>({this.state.TMDB_release_date})</h5> */}
                                 </div><br/>
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
                          
                        </section>
             </section>
             <section className="display_crew_members">
                
                 <div className="crew_members_inner">
                    <h1>Top Billed Cast</h1>
                    <div className="profile_movie">
                    {this.state.postData}
                    </div>
                    <section className='check_pagination'>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}/>
                </section>
                 </div>
             </section>
             <section className="review_client">
                 <h1>Featured Review</h1>
                 <div className="flow_review_box">
                    <img src={`https://image.tmdb.org/t/p/original${this.state.TMDB_backdrop_path}`}/>
                    <div className="review_text_overLay">
                    <h2>A review by {this.state.TMDB_review_main_name}</h2>
                    <p>Written by {this.state.TMDB_review_main_name} on ({moment(this.state.TMDB_review_main_updated_at).format('LLLL')})</p>
                     </div>
                   
                    <h3>{this.state.TMDB_review_main_content}</h3>
                 </div>
             </section>
             <section className="Recommendations_main_section">
                 <h1>Similar Movies</h1>
                    
                 <section className="movies_raw_js">
                            <h2>{this.state.TMDB_similar_main_check.map(data =>
                                 <ul><li>
                                    <div className="movies_inner" onClick={()=>{
                                       localStorage.setItem('TMDB_pd_id',data.id)
                                       localStorage.setItem('TMDB_pd_title',data.title)
                                       this.setState({
                                        TMDB_id: data.id,
                                        TMDB_title: data.title
                                       })

                                       const TMDB_api_ParamsUrl = { 
                                        TMDB_id: data.id,
                                        TMDB_title: data.title,
                                        TMDB_overview: data.overview,
                                        TMDB_img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                                    }
                                    const queryMusicParams = require('query-string')
        
                                    const passTMDB_api_Params = queryMusicParams.stringify(TMDB_api_ParamsUrl)
                                    
                                    window.location =`/watch_movies/${data.title}?${passTMDB_api_Params}`
                                        
                                    //    window.location =`/watch_movies`
                                    }}>
                                        <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}/>
                                        <div className="api_namme">
                                        {data.title}
                                        </div>
                                    </div>
                                    </li>
                                </ul>)}
                            </h2>
                        </section>
                        <section className="for_next_prev_tab">
                            <div className="btn btn-warning" onClick={this.loading_prev_movie_qury}>PREV</div>
                            <h1>Page {this.state.loading_next_movie_qury}</h1>
                            <div className="btn btn-warning" onClick={this.loading_next_movies_qury}>NEXT</div>
                        </section>
             </section>
          
            </div>
         );
    }
}
 
export default MoviesBoxChartShow;