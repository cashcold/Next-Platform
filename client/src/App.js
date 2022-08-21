import React, { Component } from 'react';
import {HelmetProvider} from "react-helmet-async";  
import './App.css'
// import './client'
// import './worker'
import 'animate.css'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Navbar from './Components/Navbar/navbar.js';
import Selected from './Components/Selected/Selected.js';
import ContactMain from './Components/Contact-us/Contact-us.js';
import BecomeAgent from './Components/Agent/Agent.js';
import Footer from './Components/Footer/Footer.js';
import Poster from './Components/Poster/poster.js';
import Call_Api from './Components/Call_Api/call_api.js';
import ReceivedApi from './Components/Received_Api/received_api.js';
import { Helmet } from 'react-helmet';
import MusicMain from './Components/Music/music.js';
import FoodMain from './Components/Food/food.js';
import GetDrinksMain from './Components/Drinks/getDrinks.js';
import ReceiveGetdFood from './Components/Food/ReceivedGetFood.js';
import SportMain from './Components/SportMain/sportMain.js';
import ScoreBatReceivedApi from './Components/SportMain/scorebatReceivedApi.js';
import ProductMain from './Components/Product/productMain.js';
import WatchNextMain from './Components/Watch_Next/watch_next.js';
import LinkBoxMain from './Components/Link_Box/link_box.js';
import MusicLinkBox from './Components/Music_Box/MusicLinkBox/music_link_box.js';
import LinkBoxInfo from './Components/LinkoxInfo/linkBoxInfo.js';
import LinkBoxMainBox from './Components/LinkBoxMain/linkBoxMain';
import MusicCenterFlowMain from './Components/MusicCenterFlow/MusicCenterFlowMain';
import SportDropInfo from './Components/SportMain/sportDropInfo';
import RAWG_Video_Games_Main from './Components/Watch_Next/RAWG_Video_Games';
import MovieBoxMain from './Components/Movies/Movies._box_1';
import MoviesBoxChartShow from './Components/Movies/Movies_box_2';


class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            title: 'NEXT-PLATFORM-HOME',
            description: 'Join the bigest platform NextPlatform HoME Enterterment Music Box',
            on_image: 'https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg',
            msg_title:  '',
            msg_body: ''

         }
    }
    componentDidMount(){
        

     
    const music_type = localStorage.getItem('mp3_api_music_type')
    this.setState({
        music_type
    })
      

    }
    render() { 
        const scoreBat_matchviewUrl = localStorage.getItem('scoreBat_matchviewUrl')
        return ( 
          
            <Router>
               <Helmet>
                    <base />
                    <title>NEXT-PLATFORM HOME</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                <meta property="og:description" content='Join the bigest platform NextPlatform HoME Enterterment Music Box' />
                <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
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
                                <Route path={`/music/:id`} exact component={MusicLinkBox}/> 
                                <Route path='/product-main' exact component={ProductMain}/>
                                <Route path='/sport-main-home' exact component={SportMain}/>
                                <Route path='/sport-main-home/:id' exact component={SportDropInfo}/>
                                <Route path={`/sport-main-home/${scoreBat_matchviewUrl}`} exact component={ScoreBatReceivedApi}/>
                                <Route path='/food-main-home/Receive-food-order/:id'  exact component={ReceiveGetdFood}/> 
                                <Route path='/food-main-home' exact component={FoodMain}/>
                                <Route path='/drinks-main' exact component={GetDrinksMain}/>
                                <Route path='/watch_next' exact component={WatchNextMain}/>
                                <Route path='/movie_box_main' exact component={MovieBoxMain}/>
                                <Route path='/watch_movies' exact component={MoviesBoxChartShow}/>
                                <Route path='/link_box' exact component={LinkBoxMain}/>
                                <Route path='/link_box/:id' exact component={LinkBoxMainBox}/>
                                <Route path='/call_api' exact component={Call_Api}/>
                                <Route path='/reveived_api/:id' exact component={ReceivedApi}/>
                                <Route path='/music_still_trending' exact component={MusicCenterFlowMain}/>
                                <Route path='/next-platform_RAWG_Video_Games_Main' exact component={RAWG_Video_Games_Main}/>



                                
                                {/* <Route path='/gospel/:id' exact component={MusicLinkBox}/>  */}
                                {/* <Route path='/call_api' exact component={Call_Api}/> */}

                                
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



// Public Key:
// BHagVjlaZA_blIpvC3ab6bpU4DtzCy0tmw1emF1Sb2_8hnO5VWX6TsgztctkekwwR6xuaAhwKyuLdVtf8pCRFeE

// Private Key:
// feTDgRbjCFdT7qLLclsz3BinF9o-GeaePSLrXJVT5F4
