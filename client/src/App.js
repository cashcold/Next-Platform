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
import MoviesLandingPage from './Components/Movies/moviesLanding';
import MoviesTvShow from './Components/Movies/Movies_box__3';
import OnlineTv from './Components/Online_Tv/online_Tv';
import DisplayOnlineTv from './Components/Online_Tv/onlineTV_Display';
import SportifyMusicMain from './Components/SportifyMusic/sportifyMusic';
import SpotifyAuth from './Components/Music Spotify/musicSpotify';
import LoginSpotify from './Components/SportifyMusic/loginSpotify';
import SpotifyDisplayMusic from './Components/SportifyMusic/spotifyDisplayMusic';
import SpotifyReleases from './Components/SportifyMusic/spotifyRelease';
import LandingPageDrinks from './Components/Drinks/LandingPageDrinks.js';
import LandingPageDrinksInfo from './Components/Drinks/DisplayDrinksInfor.js';
import MusicBox_1 from './Components/Music_Box/Box_Music_1/Music_box_1.js';
import NewsMain from './Components/News/news.js';
import NewsInfo from './Components/News/newsInfo.js';
import BooksMainBox from './Components/Books/books.js';
import BooksInfoBox from './Components/Books/bookInfo.js';


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
                <section className='AppMainApp'>
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
                                <Route path='/music' exact component={MusicBox_1}/>
                                {/* <Route path='/music' exact component={MusicMain}/> */}
                                <Route path='/LoginSpotify' exact component={LoginSpotify}/>
                                <Route path={`/music/:id`} exact component={MusicLinkBox}/> 
                                <Route path='/product-main' exact component={ProductMain}/>
                                <Route path='/sport-main-home' exact component={SportMain}/>
                                <Route path='/sport-main-home/:id' exact component={SportDropInfo}/>
                                <Route path={`/sport-main-home/${scoreBat_matchviewUrl}`} exact component={ScoreBatReceivedApi}/>
                                <Route path='/food-main-home/Receive-food-order/:id'  exact component={ReceiveGetdFood}/> 
                                <Route path='/food-main-home' exact component={FoodMain}/>
                                {/* <Route path='/drinks-main' exact component={GetDrinksMain}/> */}
                                <Route path='/drinks-main' exact component={LandingPageDrinks}/>
                                <Route path='/drinks_info/:id' exact component={LandingPageDrinksInfo}/>
                                <Route path='/watch_next' exact component={WatchNextMain}/>
                                <Route path='/movies_home_box' exact component={MoviesLandingPage}/>
                                <Route path='/movie_box_main' exact component={MovieBoxMain}/>
                                <Route path='/watch_movies/:id' exact component={MoviesBoxChartShow}/>
                                <Route path='/next-platform_Tv_Show/:id' exact component={MoviesTvShow}/>
                                <Route path='/link_box' exact component={LinkBoxMain}/>
                                <Route path='/link_box/:id' exact component={LinkBoxMainBox}/>
                                <Route path='/call_api' exact component={Call_Api}/>
                                <Route path='/reveived_api/:id' exact component={ReceivedApi}/>
                                <Route path='/11356' exact component={MusicCenterFlowMain}/>
                                <Route path='/next-platform_RAWG_Video_Games_Main' exact component={RAWG_Video_Games_Main}/>
                                <Route path='/online_Tv' exact component={OnlineTv}/>
                                <Route path='/watch_online_Tv' exact component={DisplayOnlineTv}/>
                                <Route path='/Next-Platform-with-Sportify' exact component={SportifyMusicMain}/>
                                <Route path='/Next-Platform-song/:id' exact component={SpotifyDisplayMusic}/>
                                <Route path='/Next-Platform-release/:id' exact component={SpotifyReleases}/>
                                <Route path='/Next-Platform-News' exact component={NewsMain}/>
                                <Route path='/Next-Platform-News-info/:id' exact component={NewsInfo}/>
                                <Route path='/Next-Platform-Books' exact component={BooksMainBox}/>
                                <Route path='/Next-Platform-Book-info/:id' exact component={BooksInfoBox}/>



                                
                                {/* <Route path='/gospel/:id' exact component={MusicLinkBox}/>  */}
                                {/* <Route path='/call_api' exact component={Call_Api}/> */}

                                
                            </Switch>
                            </div>
                            
                            <Footer/>
                        </div>
                </div>
                </section>
            </Router>
 
         );
    }
}
 
export default MainApp;



