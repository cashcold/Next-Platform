import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './sportMain.css'
import './scorebatVideoApiEng.js'
import axios from 'axios'
import moment from 'moment'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


import {Card,Button} from 'react-bootstrap'
import ScoreBatVideoApi from './scorebatVideoApi.js';
class SportMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            news_api_main: [],
            skyGetNewsFootball: [],
            Espn_Basketball: [],
            SkyfootballNews: [],
            Hm_Inew_arriv_cloths: [],
         }
    }
    componentDidMount(){
        
        
        
      
       


        axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/news`)
        .then((data)=>{
            this.setState({
                news_api_main: data.data.articles
                // news_api_main: data.data.articles
            })
        })
        axios.get(`http://site.api.espn.com/apis/site/v2/sports/basketball/nba/news`)
        .then((data)=>{
            this.setState({
                Espn_Basketball: data.data.articles
                // news_api_main: data.data.articles
            })
        })
        axios.get(`https://skysportsapi.herokuapp.com/sky/getnews/football/v1.0/`)
        .then((data)=>{
            this.setState({
                SkyfootballNews: data.data
                // news_api_main: data.data.articles
            })
        })
       
      
    }
    render() { 
        return ( 
            <div className='all_time_main'>
                 <Helmet>
                    <base />
                    <title>Next-Platform Sport Main</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <ToastContainer/>
               
                <div className='sportMain'>
                    <section className="sport_main_section_1">

                        <div className="Check_olesport_tv">
                            <h1>Next Tv</h1>
                          
                        </div>
                        
                        <ScoreBatVideoApi/>

                        <div className="afflate_links">
                        <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/11de69ae-f7d8-4d53-9ad7-4ef1ffaf8fc2"><img src="https://kol.jumia.com/banners/4Obk5g3jVOhL2ot24iMXbbAqbbCMQAeVvWEHxjUz.jpeg" alt="Men's Shoes Category"/></a>
                        <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/4a1b695e-04dc-4cc0-be29-b9ef46aaef39"><img src="https://kol.jumia.com/banners/eBnvpZVoKg09JH0rLtsxvSlp3S9ZHtb7i8ccRtFF.jpeg" alt="Sport & Fitness Category"/></a>
                        </div>
                        
                    </section>


                    <section className="sport_main_section_2">         
                        <div className="scoreAxis_main">  
                        
                        </div>
                        <div className="main_batstream">
                            <h3>Watch Live Sports, Shows,<br/> and Events Here On Next-Platform</h3>
                            <div className="bt_widget live_streams"><iframe src="https://live.batstream.live/?d=1&s=1" width="100%" height="900" scrolling="auto" align="top" frameborder="0">Your browser does not support frames, so you will not be able to view this page.</iframe></div>
                        </div>
                        
                        <div className="otherTopLine">
                            <h1>NCAAF News</h1>
                        </div>
                        <div className="infor_other_top">
                        {this.state.news_api_main.map(data => {
                                return(
                                    <div>
                                        <Card classMame='card_sport' style={{backgroundColor: "red", color: 'white', margin: '2em 0em'}}>
                                                <h5><i class="fa fa-clock-o fa-3x" aria-hidden="true"></i> <span>{moment(data.published).format('LLLL')}</span></h5>
                                            <Card.Img src={data.images[0].url} />
                                            <Card.Body>
                                                <Card.Text>
                                                {/* <h3>{data.title}</h3> */}
                                                <h2>{data.images[0].name}</h2>
                                                <h4>{data.images[0].caption}</h4>
                                                </Card.Text>
                                                <a target="_blank" href={data.links.web.href} className='btn btn-warning'> Find More <i class="fas fa-arrow-circle-right"></i></a>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                        <div className="basketballMain">
                            
                            <h1 className='basket_H1'>Basketball News</h1>
                            <div className="basketNewsFlow">
                            {this.state.Espn_Basketball.map(data => {
                                return(
                                    <div className='basketMain'>
                                        <Card classMame='card_sport' style={{backgroundColor: "red", color: 'white', margin: '2em 0em'}}>
                                                <h5><i class="fa fa-clock-o fa-3x" aria-hidden="true"></i> <span>{moment(data.published).format('LLLL')}</span></h5>
                                            <Card.Img src={data.images[0].url} />
                                            <Card.Body>
                                                <Card.Text>
                                                <h2>{data.images[0].name}</h2>
                                                <h4>{data.images[0].caption}</h4>
                                                </Card.Text>
                                                <a target="_blank" href={data.links.web.href} className='btn btn-warning'> Find More <i class="fas fa-arrow-circle-right"></i></a>
                                            </Card.Body>
                                        </Card>
                                    </div>
                                )
                            })}
                            </div>
                        </div>
                    
                            
                        </div>
                    </section>

                </div>
                
            </div>
         );
    }
}


 
export default SportMain;