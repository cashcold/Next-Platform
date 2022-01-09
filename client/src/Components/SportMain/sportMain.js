import React, { Component } from 'react';
import './sportMain.css'
import axios from 'axios'
import moment from 'moment'

import {Card,Button} from 'react-bootstrap'
class SportMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            news_api_main: []
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
    }
    render() { 
        console.log(this.state.news_api_main)
        return ( 
            <div className='sportMain'>
                <section className="sport_main_section_1"></section>
                <section className="sport_main_section_2">
                    <div className="otherTopLine">
                        <h1>NCAAF News</h1>
                    </div>
                    <div className="infor_other_top">
                    {this.state.news_api_main.map(data => {
                            return(
                                <div>
                                     <Card classMame='card_sport' style={{backgroundColor: "red", color: 'white', margin: '2em 0em'}}>
                                        <Card.Img src={data.images[0].url} />
                                        <Card.Body>
                                            <Card.Text>
                                            {/* <h3>{data.title}</h3> */}
                                            <h2>{data.images[0].name}</h2>
                                            <h3>{data.images[0].caption}</h3>
                                            {/* <h5>Post: <span>{data.published}</span></h5> */}
                                            <h5>Post: <span>{moment(data.published).format('LLLL')}</span></h5>
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