import React, { Component } from 'react';
import './online_Tv.css'
import { Helmet } from 'react-helmet';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'


class OnlineTv extends Component {
    constructor(props) {
        super(props);
        this.state = { 

         }

         this.handleChange = this.handleChange.bind(this)
         
         
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }


  

   
   
    componentDidMount(){
        
      
        // axios.get(`https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&${TMDB_api}`).then(data => 
        //         this.setState({
        //             TMDB_Discovery: data.data.results,
        //   }))
        
    
  }
    render() { 
      

        return ( 
            <div className='movies_box_1'>
                <ToastContainer/>
               
              <Helmet>
                    <base />
                    <title>Online TV</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                <meta property="og:description" content='Join the bigest platform NextPlatform HoME Enterterment Music Box' />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section className="head_tv">
                    <h1>Online Tv</h1>
                </section>
                <section className="online_tv_section_1">
                   <div className="onlineTv_box_1">
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/-2Sld99HAaA" title="Ten Sports Live Streaming | Ten Sports HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/9Auq9mYxFEE" title="Watch Sky News live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                   <iframe width="640" height="360" src="https://www.youtube.com/embed/F-POY4Q0QSI" title="🔴 Al Jazeera English | Live" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                   <iframe width="640" height="360" src="https://www.youtube.com/embed/ammKkVgtIHw" title="DW News livestream | Headline news from around the world" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                   <iframe width="640" height="360" src="https://www.youtube.com/embed/A3WUC6cPd04" title="Happy Birthday Song + More Toddler Videos & Nursery Rhymes for Babies by ChuChu TV LIVE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/-2Sld99HAaA" title="Ten Sports Live Streaming | Ten Sports HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/-2Sld99HAaA" title="Ten Sports Live Streaming | Ten Sports HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                   <div className="onlineTv_box_1">
                        <iframe width="640" height="360" src="https://www.youtube.com/embed/-2Sld99HAaA" title="Ten Sports Live Streaming | Ten Sports HD" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                </section>
            
            </div>
         );
    }
}
 
export default OnlineTv;