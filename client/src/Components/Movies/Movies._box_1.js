import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import './Movies._box_1.css'
import MoviesBoxChartShow from  './Movies_box_2.js'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'

export const MovieContext = React.createContext()

class MovieBoxMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TMDB_Discovery: [],
            loading_next_movie_qury: 2,
            loading_prev_movie_qury: 1,
            TMDB_id: '',
            TMDB_title: ''

         }

         this.handleChange = this.handleChange.bind(this)
         this.loading_next_movies_qury = this.loading_next_movies_qury.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    loading_next_movies_qury(e){
        e.preventDefault()
      
        this.setState({
            loading_next_movie_qury: this.state.loading_next_movie_qury + 1
        })

        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'

        axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${TMDB_api}&page=${this.state.loading_next_movie_qury}`).then(data => 
        this.setState({
            TMDB_Discovery: data.data.results
        }))
        window.scrollTo(0, 0)
       
    }
    loading_prev_movie_qury(e){
        e.preventDefault()
      
        this.setState({
            loading_prev_movie_qury:-this.state.loading_prev_movie_qury - 1
        })

        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'

        axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${TMDB_api}&page=${this.state.loading_next_movie_qury}`).then(data => 
        this.setState({
            TMDB_Discovery: data.data.results
        }))
        window.scrollTo(0, 0)
    }

   
   
    componentDidMount(){
        
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
      
        axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${TMDB_api}`).then(data => 
                this.setState({
                    TMDB_Discovery: data.data.results
          }))
        
    
  }
    render() { 
       console.log(this.state.TMDB_id)
       console.log(this.state.TMDB_title)

        return ( 
            <div className='movies_box_1'>
                <ToastContainer/>
               
              <Helmet>
                    <base />
                    <title>NEXT-PLATFORM MOVIES</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                <meta property="og:description" content='Join the bigest platform NextPlatform HoME Enterterment Music Box' />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section classNme='movieBox_1_section'>
                    <h1 >Movies</h1>
                </section>
                  <section className='section_inner_movies'>
                        <section className="movies_raw_js">
                            <h2>{this.state.TMDB_Discovery.map(data =>
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
                                        TMDB_title: data.title
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
                            <div className="btn btn-warning" onClick={this.loading_prev_movies_qury}>PREV</div>
                            <div className="btn btn-warning" onClick={this.loading_next_movies_qury}>NEXT</div>
                        </section>
                  </section >
            
            </div>
         );
    }
}
 
export default MovieBoxMain;