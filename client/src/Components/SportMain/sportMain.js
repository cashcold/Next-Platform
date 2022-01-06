import React, { Component } from 'react';
import './sportMain.css'
import axios from 'axios'

import {Card,Button} from 'react-bootstrap'
class SportMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            news_api_main: []
         }
    }
    componentDidMount(){
        axios.get(`https://newsapi.org/v2/everything?q=sport&apiKey=2e98525723394a6bbe973d45e9af7afa`)
        .then((data)=>{
            this.setState({
                news_api_main: data.data.articles
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
                        <h1>Other Top Lines</h1>
                    </div>
                    <div className="infor_other_top">
                    {this.state.news_api_main.map(data => {
                            return(
                                <div>
                                     <Card classMame='card_sport' style={{backgroundColor: "red", color: 'white', margin: '2em 0em'}}>
                                        <Card.Img src={data.urlToImage} />
                                        <Card.Body>
                                            {/* <Card.Title>Must Read</Card.Title> */}
                                            <Card.Text>
                                            <h3>{data.title}</h3>
                                            </Card.Text>
                                            {/* <Button variant="primary">Make Order</Button> */}
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