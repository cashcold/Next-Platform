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


class MoviesLandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TMDB_Discovery_landing_main: [],

         }

         this.handleChange = this.handleChange.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

   
   
    componentDidMount(){
        
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
      
        axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${TMDB_api}`).then(data => 
                this.setState({
                    TMDB_Discovery: data.data.results,
          }))
        
    
  }
    render() { 
    //    console.log(this.state.TMDB_Discovery)

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

               </section>
            </div>
         );
    }
}
 
export default MoviesLandingPage;