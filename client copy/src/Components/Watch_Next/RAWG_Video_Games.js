import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './RAWG_Video_Games.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'

import moment from 'moment'

class RAWG_Video_Games_Main extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             scorebat: [],
             offset: 0,
             data: [],
             perPage: 12,
             currentPage: 0,
             loading_next_game_qury: 2,
             loading_prev_game_qury: 1,
             dataMatch: [],
             dataMatch_check: [],
             data_next: [],
         }
         this.handleChange = this.handleChange.bind(this)
         this.loading_next_game_qury = this.loading_next_game_qury.bind(this);
         this.loading_prev_game_qury = this.loading_prev_game_qury.bind(this);
    }
  
   
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    loading_next_game_qury(){
                this.setState({
                    loading_next_game_qury: this.state.loading_next_game_qury + 1
                })

                axios.get(`https://api.rawg.io/api/games?key=e1fbdfe6840f485282801980ab3f63de&page=${this.state.loading_next_game_qury}`).then(data => 
                this.setState({
                    dataMatch_check: data.data.results
                }))
                window.scrollTo(0, 0)
               
    }
    loading_prev_game_qury(){
                this.setState({
                    loading_next_game_qury: this.state.loading_next_game_qury - 1
                })

                axios.get(`https://api.rawg.io/api/games?key=e1fbdfe6840f485282801980ab3f63de&page=${this.state.loading_prev_game_qury}`).then(data => 
                this.setState({
                    dataMatch_check: data.data.results
                }))
                window.scrollTo(0, 0)
    }
    componentDidMount(){
        axios.get(`https://api.rawg.io/api/games?key=e1fbdfe6840f485282801980ab3f63de`).then(data => 
        this.setState({
            dataMatch_check: data.data.results
        }))

    
      
 
      

      

  }
    render() { 
       console.log(this.state.loading_next_game_qury)

      
        return ( 
          
            <div className='RAWG_main_folder'>
                  <Helmet>
                    <base />
                    <title>NEXT-PLATFORM VIDEO GAMES</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                <meta property="og:description" content='Join the bigest platform NextPlatform HoME Enterterment Music Box' />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section className='bat_score'>
                    <h1 >Play Free Games Online<br/>And Save Your Progress </h1>
                    <h3>NEXT-PLATFORM Offer <br/>You More than 350,000 Video Games.</h3>
                </section>
                 <section className="RAWG_Video_Games_data"> 
                     {/* {this.state.postData} */}
                  </section>
                  <section className='section_inner_raw_js'>
                        <section className="raw_js">
                            <h2>{this.state.dataMatch_check.map(data => <ul><li>
                                <img src={data.background_image}/>
                                <div className="api_namme">
                                {data.name}
                                </div>
                                <a href='#' className='btn btn-warning'>Play Now</a>
                                </li></ul>)}</h2>
                        </section>
                  </section >
                  <section className="for_next_prev_tab">
                      <div className="raw_Pre" onClick={this.loading_prev_game_qury}>Preview</div>
                      <div className="raw_next" onClick={this.loading_next_game_qury}>Next</div>
                  </section>
                
                  
            </div>
         );
    }
}
 
export default RAWG_Video_Games_Main;