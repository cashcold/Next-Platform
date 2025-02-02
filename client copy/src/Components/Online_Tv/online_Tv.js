import React, { Component } from 'react';
import {online_TV_api} from '../Api/onlineTV_Api'
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
            online_TV_api: online_TV_api
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
        console.log(this.state.online_TV_api)
      

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
                    <h1>Online Tv..</h1>
                </section>
                <section className="onlineTV_main_section">
                    {this.state.online_TV_api.map(data => <React.Fragment>
                        <div>
                            {data.name}
                            <div dangerouslySetInnerHTML={{__html: data.embed}}></div>
                           
                        </div>
                    </React.Fragment>)}
                </section>
               
            
            </div>
         );
    }
}
 
export default OnlineTv;