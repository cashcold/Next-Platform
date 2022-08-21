import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './Movies_box_2.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'

import moment from 'moment'

class MoviesBoxChartShow extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            TMDB_id: '',
            TMDB_Info_Discovery_videos: []

         }

         this.handleChange = this.handleChange.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

 

   
   
    componentDidMount(){
        const TMDB_id = localStorage.getItem('TMDB_pd_id')

        this.setState({
            TMDB_id
        })

        const TMDB_api = 'api_key=f820d8f2d83e87602797b2b0760a4f17'
      
       

        axios.get(`https://api.themoviedb.org/3/movie/${TMDB_id}/videos?api_key=f820d8f2d83e87602797b2b0760a4f17&language=en-US`).then(data => 
                this.setState({
                    TMDB_Info_Discovery_videos: data.data.results
          })).then(data => console.log(data.data.results))

      
  }
    render() { 
      
  
    // console.log(this.state.TMDB_Info_Discovery)
    console.log(this.state.TMDB_Info_Discovery_videos)

    let name = this.state.TMDB_Info_Discovery_videos.map(data => data.name)
    let key = this.state.TMDB_Info_Discovery_videos.map(data => data.key)

   let name_embed = name[1]
   let key_embed = key[1]

   console.log(`this is name ${name_embed}`)
   console.log(`this is key ${key_embed}`)
   console.log(`this is TMDB_id ${this.state.TMDB_id}`)

      
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
                    <h1 >WATCH MOVIES</h1>
                  
                </section>
                <section className="youtube_embed">
                    <iframe width="100%" height="360" src={`https://www.youtube.com/embed/${key_embed}`} title={name_embed} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </section>
                
             
            </div>
         );
    }
}
 
export default MoviesBoxChartShow;