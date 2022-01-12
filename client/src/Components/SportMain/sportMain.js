import React, { Component } from 'react';
import './sportMain.css'
import axios from 'axios'
import moment from 'moment'

import {Card,Button} from 'react-bootstrap'
class SportMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            news_api_main: [],
            scorebat: [],
            skyGetNewsFootball: []
         }
    }
    componentDidMount(){

          axios.get(`https://skysportsapi.herokuapp.com/sky/getnews/football/v1.0/`)
        .then((data)=>{
            this.setState({
                skyGetNewsFootball: data.data
            })
        })
          axios.get(`https://www.scorebat.com/video-api/v3/`)
        .then((data)=>{
            this.setState({
                scorebat: data.data.response
            })
        })


        axios.get(`http://site.api.espn.com/apis/site/v2/sports/football/college-football/news`)
        .then((data)=>{
            this.setState({
                news_api_main: data.data.articles
                // news_api_main: data.data.articles
            })
        })
      
    }
    render() { 
        console.log(this.state.skyGetNewsFootball)
        console.log(this.state.scorebat)
        return ( 
            <div className='sportMain'>
                <section className="sport_main_section_1">
                    <div className='Scorebat_main'>
                    
                      <h1>Sport Highlights</h1>
                    {this.state.scorebat.map(data => {
                        return(
                            <div classMame='score_bat_css'>
                                 <Card classMame='card_sport' style={{backgroundColor: "black", color: 'white', padding: '2em 0em'}}>
                                            
                                        <Card.Img src={data.thumbnail} />
                                        <h5><i class="fa fa-clock-o fa-3x" aria-hidden="true"></i> <span>{moment(data.date).format('LLLL')}</span></h5>
                                        <Card.Body>
                                            <Card.Text>
                                            {/* <h3>{data.title}</h3> */}
                                            <h2>{data.title}</h2>
                                            </Card.Text>
                                            <a href='#' className='btn btn-warning'> Watch <i class="fas fa-arrow-circle-right"></i></a>
                                        </Card.Body>
                                    </Card>
                            </div>
                        )
                    })}
                    {/* <img src={this.state.scorebat.map(data => data.thumbnail)}/> */}
                    </div>
                </section>


                <section className="sport_main_section_2">
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
                                            <a href='#' className='btn btn-warning'> Find More <i class="fas fa-arrow-circle-right"></i></a>
                                        </Card.Body>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </section>
            </div>
         );
    }
}
 
export default SportMain;