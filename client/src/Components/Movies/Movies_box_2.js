import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import './Movies_box_2.css'
import MoviesBoxMain from  './Movies._box_1.js'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'

import moment from 'moment'

class MoviesBoxChartShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TMDB_id: '',
            TMDB_Info_Discovery_videos: [],
            TMDB_Trailer: [],
            TMDB_video_name: '',
            TMDB_video_key: ''

         }

         this.handleChange = this.handleChange.bind(this)
         this. CheckHandle_req = this. CheckHandle_req.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

 

   CheckHandle_req = ()=>{
   
   }
   
    componentDidMount(){

       
        let parsed = queryString.parse(window.location.search);
        let TMDB_id = parsed.TMDB_id
        // let TMDB_title = parsed.TMDB_title
    
    
       
        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
    
        axios.get(`http://api.themoviedb.org/3/movie/${TMDB_id}?${TMDB_api}&append_to_response=videos`).then(data => 
        this.setState({
            TMDB_Info_Discovery_videos: data.data,
            TMDB_Trailer: data.data.videos.results,
        }))

       
    
      
    //     document.querySelector('.show_movies_now').innerHTML = `
    //     <iframe width="640" height="360" src="https://www.youtube.com/embed/DtQycgMD4HQ" title="Trailer 2" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
    // `
      
  }
    render() { 

        let TMDB_video_filter = this.state.TMDB_Trailer.filter(data => data.type === 'Trailer')

        let TMDB_video_key = TMDB_video_filter.map(data => data.key)
        let TMDB_video_name = TMDB_video_filter.map(data => data.name)
        
      

  

   

 
   

      
        return ( 

           
            <div className='movies_box_2_maain'>
                
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
                    <iframe width="100%" height="560" src={`https://www.youtube.com/embed/${TMDB_video_key[0]}`} title={TMDB_video_name[0]} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
               </section>
            </div>
         );
    }
}
 
export default MoviesBoxChartShow;