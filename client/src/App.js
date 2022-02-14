import React, { Component } from 'react';
import './App.css'
import 'animate.css'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar';
import Selected from './Components/Selected/Selected';
import ContactMain from './Components/Contact-us/Contact-us';
import BecomeAgent from './Components/Agent/Agent';
import Footer from './Components/Footer/Footer';
import Poster from './Components/Poster/poster';
import Call_Api from './Components/Call_Api/call_api';
import ReceivedApi from './Components/Received_Api/received_api';
import { Helmet } from 'react-helmet';
import MusicMain from './Components/Music/music';
import FoodMain from './Components/Food/food';
import GetDrinksMain from './Components/Drinks/getDrinks';
import ReceiveGetdFood from './Components/Food/ReceivedGetFood';
import SportMain from './Components/SportMain/sportMain';
import ScoreBatReceivedApi from './Components/SportMain/scorebatReceivedApi';
import ProductMain from './Components/Product/productMain';
import WatchNextMain from './Components/Watch_Next/watch_next';
class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
           
         }
    }
    componentDidMount(){
      

    }
    render() { 
        const scoreBat_matchviewUrl = localStorage.getItem('scoreBat_matchviewUrl')
        return ( 
            // animate__animated animate__zoomIn 
            <Router>
               <Helmet>
                    <base />
                    <title>NEXT-PLATFORM HOME</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <div className=' mainApp '>
                {/* <div  className='google__id' id="google_translate_element"></div> */}
                        <div className='wrapper'>
                            <Navbar/>
                            <div className='switch'> 
                             <Switch> 
                                <Route path='/' exact component={Selected}/> 
                                <Route path='/contact-us' exact component={ContactMain}/>
                                <Route path='/agent-form' exact component={BecomeAgent}/>
                                <Route path='/poster' exact component={Poster}/>
                                <Route path='/music' exact component={MusicMain}/>
                                <Route path='/product-main' exact component={ProductMain}/>
                                <Route path='/sport-main-home' exact component={SportMain}/>
                                <Route path={`/sport-main-home/${scoreBat_matchviewUrl}`} exact component={ScoreBatReceivedApi}/>
                                <Route path='/food-main-home/Receive-food-order/:id'  exact component={ReceiveGetdFood}/> 
                                <Route path='/food-main-home' exact component={FoodMain}/>
                                <Route path='/drinks-main' exact component={GetDrinksMain}/>
                                <Route path='/watch_next' exact component={WatchNextMain}/>
                                {/* <Route path='/watch_next' exact component={Call_Api}/> */}
                                {/* <Route path='/call_api' exact component={Call_Api}/> */}
                                <Route path='/reveived_api/:id' exact component={ReceivedApi}/>
                                
                            </Switch>
                            </div>
                            <Footer/>
                        </div>
                </div>
            </Router>
         );
    }
}
 
export default MainApp;