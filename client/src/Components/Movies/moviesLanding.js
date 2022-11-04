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
import { Navigation, Pagination, Scrollbar, A11y ,EffectCube} from 'swiper';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import "swiper/css/effect-cube";







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
            TMDB_Movies_Tv_show_main: [],
            TMDB_Movies_now_playing_main_flash: [],

         }

         this.handleChange = this.handleChange.bind(this)
         this.hanndleStreaming = this.hanndleStreaming.bind(this)
         this.hanndleRenting = this.hanndleRenting.bind(this)
         this.hanndleTheaters = this.hanndleTheaters.bind(this)
         this.HandleUpComingMovies = this.HandleUpComingMovies.bind(this)
         this.hanndlePopularTvShow = this.hanndlePopularTvShow.bind(this)
         this.hanndleTvShowToday = this.hanndleTvShowToday.bind(this)
         this.hanndleTvShowOnAir = this.hanndleTvShowOnAir.bind(this)
         this.hanndleTvShowRated = this.hanndleTvShowRated.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
    

    

   
    hanndleStreaming(){
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f820d8f2d83e87602797b2b0760a4f17&watch_region=US&with_watch_monetization_types=flatrate`).then(data => 
        this.setState({
            TMDB_Movies_now_playing_main: data.data.results,
        }))
        
    }
  
    HandleUpComingMovies(){
        axios.get(`https://api.themoviedb.org/3/movie/upcoming?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_Movies_now_playing_main: data.data.results,
        }))
    }
    hanndleRenting(){
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f820d8f2d83e87602797b2b0760a4f17&watch_region=US&with_watch_monetization_types=rent`).then(data => 
        this.setState({
            TMDB_Movies_now_playing_main: data.data.results,
        }))
        
    }
    hanndleTheaters(){
        axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=f820d8f2d83e87602797b2b0760a4f17&region=US&with_release_type=3|2`).then(data => 
        this.setState({
            TMDB_Movies_now_playing_main: data.data.results,
        }))
        
    }

    hanndlePopularTvShow(){
        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_Movies_Tv_show_main: data.data.results,
        }))
        
    }
    hanndleTvShowToday(){
        axios.get(`https://api.themoviedb.org/3/tv/airing_today?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_Movies_Tv_show_main: data.data.results,
        }))
        
    }
    hanndleTvShowOnAir(){
        axios.get(`https://api.themoviedb.org/3/tv/on_the_air?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_Movies_Tv_show_main: data.data.results,
        }))
        
    }
    hanndleTvShowRated(){
        axios.get(`https://api.themoviedb.org/3/tv/top_rated?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_Movies_Tv_show_main: data.data.results,
        }))
        
    }

  

    



  

   
   
    componentDidMount(){

        const listOfThings = document.getElementById('list')

            // Add event listener 
            listOfThings.addEventListener("click", function(event) {
            // Grab all the li elements
            let list = document.querySelectorAll('li')
            for (let i = 0; i < list.length; i++) {
                if (event.target.dataset.id === list[i].dataset.id) {
                if (event.target.className === 'inactive') {
                    event.target.className = 'active'
                } else {
                    event.target.className = 'inactive'
                }
                } else {
                list[i].className = 'inactive'
                }
            }
            })


        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'

        axios.get(`https://api.themoviedb.org/3/movie/now_playing?${TMDB_api}&language=en-US&page=1`).then(data => 
        this.setState({
           TMDB_Movies_now_playing_main: data.data.results,
       }))
       
        
      
        axios.get(`https://api.themoviedb.org/3/genre/movie/list?${TMDB_api}&language=en-US`).then(data => 
            this.setState({
                TMDB_movies_genres: data.data.genres,
        }))

        axios.get(`https://api.themoviedb.org/3/tv/popular?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US&page=1`).then(data => 
        this.setState({
            TMDB_Movies_Tv_show_main: data.data.results,
        }))

       
    
  }
    render() { 

        console.log(this.state.TMDB_Movies_Tv_show_main)


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


        

       

        let HandleMoviesNowPlayingT = 
         <Swiper 
         pagination={{
            type: "fraction",
          }}
         modules={[Navigation,Pagination, Scrollbar, A11y]} 
        className="mySwiper"
         spaceBetween={10}
         slidesPerView={6}
         navigation

            >
            {this.state.TMDB_Movies_now_playing_main.map(data => 
            <SwiperSlide  
                onClick={()=>{
                    const TMDB_api_ParamsUrl = { 
                        TMDB_id: data.id,
                        TMDB_title: data.title,
                        TMDB_overview: data.overview,
                        TMDB_img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                    }
                    const queryMoviesParams = require('query-string')
        
                    const passTMDB_api_Params = queryMoviesParams.stringify(TMDB_api_ParamsUrl)
                    
                    window.location =`/watch_movies/${data.title}?${passTMDB_api_Params}`
                }}>
                <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}/>
                <div className='landing_api_title'>
                     {data.title}
                </div>
               
            </SwiperSlide>)}
            ...
        </Swiper>
      
        let HandleMoviesNowPlaying_mobile = 
         <Swiper 
         pagination={{
            type: "fraction",
          }}
         modules={[Navigation,Pagination, Scrollbar, A11y]} 
        className="mySwiper"
         spaceBetween={3}
         slidesPerView={2}
         navigation
            >
            {this.state.TMDB_Movies_now_playing_main.map(data => 
            <SwiperSlide  
                onClick={()=>{
                    const TMDB_api_ParamsUrl = { 
                        TMDB_id: data.id,
                        TMDB_title: data.title,
                        TMDB_overview: data.overview,
                        TMDB_img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                    }
                    const queryMoviesParams = require('query-string')
        
                    const passTMDB_api_Params = queryMoviesParams.stringify(TMDB_api_ParamsUrl)
                    
                    window.location =`/watch_movies/${data.title}?${passTMDB_api_Params}`
                }}>
               <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}/>
{/*                
                {data.title} */}
            </SwiperSlide>)}
            ...
        </Swiper>

          let HandleMoviesNowPlayingT_TvShow = 
         <Swiper 
         pagination={{
            type: "fraction",
          }}
         modules={[Navigation,Pagination, Scrollbar, A11y]} 
        className="mySwiper"
         spaceBetween={10}
         slidesPerView={6}
         navigation

            >
            {this.state.TMDB_Movies_Tv_show_main.map(data => 
            <SwiperSlide  
                onClick={()=>{
                    const TMDB_api_ParamsUrl = { 
                        TMDB_id: data.id,
                        TMDB_title: data.name,
                        TMDB_overview: data.overview,
                        TMDB_img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                    }
                    const queryMoviesParams = require('query-string')
        
                    const passTMDB_api_Params = queryMoviesParams.stringify(TMDB_api_ParamsUrl)
                    
                    window.location =`/next-platform_Tv_Show/${data.name}?${passTMDB_api_Params}`
                }}>
                <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}/>
                <div className='landing_api_title'>
                     {data.name}
                </div>
               
            </SwiperSlide>)}
            ...
        </Swiper>
          let HandleMoviesNowPlayingT_TvShow_mobile = 
         <Swiper 
         pagination={{
            type: "fraction",
          }}
         modules={[Navigation,Pagination, Scrollbar, A11y]} 
        className="mySwiper"
         spaceBetween={3}
         slidesPerView={2}
         navigation

            >
            {this.state.TMDB_Movies_Tv_show_main.map(data => 
            <SwiperSlide  
                onClick={()=>{
                    const TMDB_api_ParamsUrl = { 
                        TMDB_id: data.id,
                        TMDB_title: data.name,
                        TMDB_overview: data.overview,
                        TMDB_img: `https://image.tmdb.org/t/p/original${data.backdrop_path}`
                    }
                    const queryMoviesParams = require('query-string')
        
                    const passTMDB_api_Params = queryMoviesParams.stringify(TMDB_api_ParamsUrl)
                    
                    window.location =`/next-platform_Tv_Show/${data.name}?${passTMDB_api_Params}`
                }}>
                <img src={`https://image.tmdb.org/t/p/original/${data.poster_path}`}/>
                <div className='landing_api_title'>
                     {data.name}
                </div>
               
            </SwiperSlide>)}
            ...
        </Swiper>

      

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
                                    const queryMoviesParams = require('query-string')
        
                                    const passTMDB_api_Params = queryMoviesParams.stringify(TMDB_api_ParamsUrl)
                                    
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
                                    const queryMoviesParams = require('query-string')
        
                                    const passTMDB_api_Params = queryMoviesParams.stringify(TMDB_api_ParamsUrl)
                                    
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
                       
                   <div className="toogle_list_main">
                        <ul id="list">
                            <p class="title title_style"> Now Playing...</p>
                            <li class="inactive " data-id="0" onClick={this.hanndleStreaming} >Streaming</li>
                            <li class="inactive " data-id="1" onClick={this.HandleUpComingMovies}>Up Coming Movies</li>
                            <li class="inactive " data-id="2" onClick={this.hanndleRenting}>For Rent</li>
                            <li class="inactive " data-id="3" onClick={this.hanndleTheaters}>In Theaters</li>
                        </ul>
                   </div>
                 
                  <div className="moviesNowSwuiper">
                      {HandleMoviesNowPlayingT}
                  </div>
                  <div className="moviesNowSwuiper_HandleMoviesNowPlaying_mobile">
                      {HandleMoviesNowPlaying_mobile}
                  </div>
                 
               </section>
               <section className="whats_popular whats_popular_next_1">
                       
                   <div className="toogle_list_main">
                        <ul id="list">
                            <p class="title title_style"> Steaming On Tv...</p>
                            <li class="inactive " data-id="1" onClick={this.hanndleTvShowToday}>TV Shows Today</li>
                            <li class="inactive " data-id="2" onClick={this.hanndleTvShowOnAir}>Tv Shows On Air</li>
                            <li class="inactive " data-id="3" onClick={this.hanndleTvShowRated}>Top Rated Tv Shows</li>
                            <li class="inactive " data-id="0" onClick={this.hanndlePopularTvShow} >Popular Tv Shows</li>
                        </ul>
                   </div>
                 
                  <div className="moviesNowSwuiper">
                      {HandleMoviesNowPlayingT_TvShow}
                  </div>
                  <div className="moviesNowSwuiper_HandleMoviesNowPlaying_mobile">
                      {HandleMoviesNowPlayingT_TvShow_mobile}
                  </div>
                 
               </section>
              
            </div>
         );
    }
}
 
export default MoviesLandingPage;

 