import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import './moviesLanding.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/swiper-bundle.min.css'
import 'swiper/swiper.min.css'




import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';


class MoviesLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TMDB_Discovery_landing_main: [],
            searchResultMovies: [],
            TMDB_movies_genres: [],
            TMDB_genres_landing: [],
            TMDB_genres_landing_name: [],
            TMDB_Movies_now_playing_main: [],

         }

         this.handleChange = this.handleChange.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }



  

   
   
    componentDidMount(){
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'

        axios.get(`https://api.themoviedb.org/3/movie/now_playing?${TMDB_api}&language=en-US&page=1`).then(data => 
        this.setState({
           TMDB_Movies_now_playing_main: data.data.results,
       }))
       
        
      
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?${TMDB_api}&language=en-US`).then(data => 
            this.setState({
                TMDB_movies_genres: data.data.genres,
        }))

       
    
  }
    render() { 
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'


        let Movies_TMDB_movies_genres = this.state.TMDB_movies_genres.map(data =>  <React.Fragment className='movies_genres_click_div'>
        <div className="movies_box_main_in" onClick={()=>{
            console.log(data.name)
           axios.get(`https://api.themoviedb.org/3/discover/movie?${TMDB_api}&with_genres=${data.id}`).then(data_new => 
           this.setState({
            TMDB_genres_landing: data_new.data.results,
            
            TMDB_genres_landing_name: data.name
            
     }))

          
        }}>
            <div>
            {
                <h2 className='movie_position_name_head btn '>{data.name}</h2> 
            }
        
            </div>
        </div>
         
          
         </React.Fragment>)


         axios.get(`https://api.themoviedb.org/3/movie/now_playing?${TMDB_api}&language=en-US&page=1`).then(data => 
         this.setState({
            TMDB_Movies_now_playing_main: data.data.results,
        }))

       

        let HandleMoviesNowPlayingT = 
         <Swiper
            spaceBetween={10}
            slidesPerView={6}
            onSlideChange={() => console.log('slide change')}
            onSwiper={(swiper) => console.log(swiper)}
            >
            {this.state.TMDB_Movies_now_playing_main.map(data => 
            <SwiperSlide >
                <img src={`https://image.tmdb.org/t/p/original/${data.backdrop_path}`}/>
                {data.title}
            </SwiperSlide>)}
            ...
        </Swiper>

        // let MovieNowPlaying = this.state.TMDB_Movies_now_playing_main.map(data => <React.Fragment>
        //     <Swiper
        //     spaceBetween={50}
        //     slidesPerView={3}
        //     onSlideChange={() => console.log('slide change')}
        //     onSwiper={(swiper) => console.log(swiper)}
        //     >
        //     <SwiperSlide >
        //         <div className="nowPlay_swuiper">
        //             {data.title}
        //         </div>
        //     </SwiperSlide>
        //     ...
        //     </Swiper>
        // </React.Fragment>)

        return ( 
            <div className='Movie_landing_page'>
                <ToastContainer/>
               
              <Helmet>
                    <base />
                    <title>Next-Platform Movies</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                <meta property="og:description" content='Join the bigest platform NextPlatform HoME Enterterment Music Box' />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
               <section className='movie_landing_main_section'>
                   <div className="head_tag">
                        <h1>Welcome.</h1>
                        <h3>Millions of movies, TV shows and people to discover. Explore now.</h3>
                        
                        <div className="search_div">
                              <section className="movei_input_section_1">
                                  <div className="input_and_search_div search">
                                    <input className='SearcInput searchTerm' type='search' name='searchResult'  onChange={this.handleChange('searchResultMovies')} placeholder="Search Movies, TV shows and people"/>
                                     <button className='searchButton'>
                                     <i class="fa fa-search fa-2x" aria-hidden="true" onClick={()=>{
                                            
                                            axios.get(`https://api.themoviedb.org/3/search/movie?${TMDB_api}&query=${this.state.searchResultMovies}`).then(data => 
                                            this.setState({
                                                TMDB_Discovery_landing_main: data.data.results,
                                        }))
                                        }}></i>
                                     </button>
                                  </div>
                    
                         <section className="movies_raw_js">
                            <h2>{this.state.TMDB_Discovery_landing_main.map(data =>
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
                            <section className="display_geners_main_1">
                                {
                                    Movies_TMDB_movies_genres
                                }
                            </section>
                            <section className="title_name">
                                <h1>{this.state.TMDB_genres_landing_name} Movies</h1>
                            </section>
                            <section className="movies_raw_js">
                            <h2>{this.state.TMDB_genres_landing.map(data =>
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
                        </section>
                       
                  
                </section>
                        </div>
                   </div>
               </section>
               <section className="whats_popular">
                   <h1>POPULAR</h1>
                 
                  <div className="moviesNowSwuiper">
                      {HandleMoviesNowPlayingT}
                  </div>
               </section>
            </div>
         );
    }
}
 
export default MoviesLandingPage;

 