import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion'; // Import framer-motion for smooth effects
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
import axios from 'axios';
import SignUpPage from './Components/SignUpPage/SignUpPage.js';
import LoginPage from './Components/LoginPage/LoginPage.js';
import ResetPasswordPage from './Components/ResetPasswordPage/ResetPasswordPage.js';
import ActivitPassword from './Components/ActivitPassword/ActivitPassword.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import AccessoryList from './Components/AccessoryList/AccessoryList.js';
import moment from 'moment'



class MainApp extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            username: "", 
            balance: "", // Balance state here
            user_id: '', // You can also fetch user details here
            user_Name: '',
            greeting: '',
            currentTime: '',
            title: 'NEXT-PLATFORM-HOME',
            description: 'Join the bigest platform NextPlatform HoME Enterterment Music Box',
            on_image: 'https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg',
            msg_title:  '',
            msg_body: ''

         }
    }

    componentDidMount() {
        const token = sessionStorage.getItem('x-access-token');
        
        if (!token) {
            console.error("No token found. Redirecting to login...");
            // Redirect to login or handle as needed
            return;
        }
    
        try {
            const decoded = jwt_decode(token);
            const user_id = decoded.user_id;
    
            this.setState({ user_id });
    
            // Fetch the initial balance only if user_id is available
            this.fetchInitialBalance(user_id);
            
            // Start balance update interval if user_id exists
            this.interval = setInterval(() => {
                this.updateBalance(user_id);
            }, 3000);
    
        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle token decoding error, maybe redirect to login
        }

        const decoded = jwt_decode(token);
        const id = decoded.user_id;

        axios.post('http://localhost:8000/users/user_profile_display',{id}).then(data => this.setState(
            {
            username: data.data.user_Name,
      
             
          }))
      

        
    this.updateGreeting();
    // Update time every seconds
    this.timerID = setInterval(() => this.updateGreeting(), 1000);
    }
    
    componentWillUnmount() {
        // Clear the interval when the component unmounts
        if (this.interval) {
            clearInterval(this.interval);
        }

        clearInterval(this.timerID);
    }
    
    fetchInitialBalance(user_id) {
        axios.post('http://localhost:8000/users/user_profile_display', { user_id: user_id })
        .then(response => {
            this.setState({
                balance: response.data.accountBalance,
                user_Name: response.data.user_Name
            });
        })
        .catch(error => {
            console.error('Error fetching balance:', error);
        });
    }
    
    updateBalance(user_id) {
        axios.post('http://localhost:8000/users/api/updateBalance', {
            user_id: user_id,
            timeSpent: 3, // Assuming 3 seconds spent per update
        })
        .then(response => {
            this.setState({ balance: response.data.balance });
        })
        .catch(error => {
            console.error('Error updating balance:', error);
        });
    }

    updateGreeting = () => {
        const now = new Date();
        const hours = now.getHours();
        let greeting = '';
    
        if (hours < 12) {
            greeting = 'Good morning';
        } else if (hours < 17) {
            greeting = 'Good afternoon';
        } else {
            greeting = 'Good evening';
        }
    
        this.setState({
            greeting,
            currentTime: moment(now).format('MMMM Do YYYY, h:mm:ss a'), // Using moment to format date
        });
    };
    

   
   

  

        render() { 

            const { balance, user_Name, user_id, greeting, currentTime, username } = this.state; // Destructure the balance from state
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
                         {/* Conditionally render the account-buttons-container if user_id exists */}
                            {user_id && (
                            <div className="account-buttons-container">
                                                        <motion.h1
                                className="dashboard-title"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1 }}
                                >
                               <h1 className="current-greet"> {greeting}, {username}! <span className="emoji-wave">👋</span></h1>
                                </motion.h1>
                                
                                <p className="current-time">{currentTime}</p>

                                <h3 className="balance-heading">Balance: ${balance}</h3>
                                <button className="btn btn-warning"  onClick={()=>{
                                     window.location = '/dashboard';
                                }}>Dashboard</button>
                                <button className="btn btn-danger">Logout</button>
                            </div>
                        )}
                            
                            <div className='switch'> 
                             <Switch> 
                                <Route path='/' exact component={Selected}/> 
                                <Route path='/contact-us' exact component={ContactMain}/>
                                <Route path='/signup' exact component={SignUpPage}/> 
                                <Route path='/login' exact component={LoginPage}/> 
                                <Route path='/reset-password' exact component={ResetPasswordPage}/> 
                                <Route path='/activitPassword/:token' exact component={ActivitPassword}/> 
                                <Route path="/dashboard" exact render={(props) => (
                                    <Dashboard {...props} balance={balance} user_Name={user_Name} />
                                )} />
                                <Route path='/AccessoryList' exact component={AccessoryList}/> 
                                <Route path='/agent-form' exact component={BecomeAgent}/>
                                <Route path='/poster' exact component={Poster}/>
                                <Route path='/music_me' exact component={MusicBox_1}/>
                                <Route path='/music' exact component={MusicMain}/>
                                <Route path='/loginSpotify' exact component={LoginSpotify}/>
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

