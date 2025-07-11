import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import { motion } from 'framer-motion'; // Import framer-motion for smooth effects
import { HelmetProvider } from "react-helmet-async";
import './App.css'
import 'animate.css'
import 'react-toastify/dist/ReactToastify.css';

import {Card,Button} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
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
import TimedPopup from './Components/TimedPopup/TimedPopup.js';
import ResetPasswordPage from './Components/ResetPasswordPage/ResetPasswordPage.js';
import ActivitPassword from './Components/ActivitPassword/ActivitPassword.js';
import Dashboard from './Components/Dashboard/Dashboard.js';
import AccessoryList from './Components/AccessoryList/AccessoryList.js';
import moment from 'moment'
import WithdrawPage from './Components/WithdrawPage/WithdrawPage.js';
import WithdrawRefferReward from './Components/WithdrawRefferReward/WithdrawRefferReward.js';
import Game from './Components/Game/Game.js';
import Modal from 'react-modal';
import GameDetails from './Components/Watch_Next/GameDetails.js';

Modal.setAppElement('#root'); // Set the app element for accessibility

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
            description: 'Join the biggest platform NextPlatform HoME Entertainment Music Box',
            on_image: 'https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg',
            msg_title: '',
            msg_body: '',
            isDateValid: true, // Add a state to track date validity
            loading: true, // Add a loading state to control rendering
            lastActiveTime: Date.now(), // Track the last active time
            showModal: false // State to control the modal visibility
        }
    }

    async componentDidMount() {

        // setTimeout(() => {
        //     toast.dark(
        //       <div
        //         className='logoImg animate__animated animate__slower animate__heartBeat welcome_trans_h4'
        //         onClick={() => {
        //           window.location.href = 'https://capgainco.com/';
        //         }}
        //       >
        //         <Card>
        //           <Card.Body>
        //             <Card.Text>
        //               <img
        //                 src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBUY%20BITCOIN.jpg?alt=media&token=95e601b7-808f-412f-8360-e8b7eb025798"
        //                 alt="Grocery Category"
        //                 style={{ width: '100%' }}
        //               />
        //             </Card.Text>
        //           </Card.Body>
        //         </Card>
        //       </div>,
        //       {
        //         position: "top-right",
        //         autoClose: false,
        //         hideProgressBar: false,
        //         closeOnClick: true,
        //         pauseOnHover: true,
        //         draggable: true,
        //         progress: undefined,
        //       }
        //     );
        //   }, 20000); 

        const RefreshToken = sessionStorage.getItem('RefreshToken');
        if (RefreshToken) {
            sessionStorage.removeItem('x-access-token');
            sessionStorage.setItem('x-access-token', RefreshToken);
        }

        try {
            const response = await axios.get('https://api.timezonedb.com/v2.1/get-time-zone', {
                params: {
                    key: 'AV9V19IQBEX1',
                    format: 'json',
                    by: 'zone',
                    zone: 'Africa/Accra', // Use the correct timezone for Accra, Ghana
                },
            });

            if (response.data.status === 'FAILED') {
                throw new Error(response.data.message || 'Failed to fetch time data');
            }

            const liveTime = new Date(response.data.formatted);
            this.compareTime(liveTime);
        } catch (error) {
            console.error('Error fetching live time:', error.message);
            this.compareTime(new Date()); // Fallback to local system time
        }

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
            this.startBalanceUpdateInterval(user_id);

        } catch (error) {
            console.error("Error decoding token:", error);
            // Handle token decoding error, maybe redirect to login
        }

        const decoded = jwt_decode(token);
        const id = decoded.user_id;

        axios.post('/users/user_profile_display', { id }).then(data => this.setState(
            {
                username: data.data.user_Name,
            }));

        this.updateGreeting();
        // Update time every second
        this.timerID = setInterval(() => this.updateGreeting(), 1000);

        // Add event listeners for visibility change and user activity
        document.addEventListener('visibilitychange', this.handleVisibilityChange);
        document.addEventListener('mousemove', this.handleUserActivity);
        document.addEventListener('keydown', this.handleUserActivity);
    }

    componentWillUnmount() {
        // Clear the interval when the component unmounts
        this.clearBalanceUpdateInterval();
        clearInterval(this.timerID);

        // Remove event listeners for visibility change and user activity
        document.removeEventListener('visibilitychange', this.handleVisibilityChange);
        document.removeEventListener('mousemove', this.handleUserActivity);
        document.removeEventListener('keydown', this.handleUserActivity);
    }

    handleVisibilityChange = () => {
        if (document.hidden) {
            // User is inactive
            this.clearBalanceUpdateInterval();
        } else {
            // User is active
            this.startBalanceUpdateInterval(this.state.user_id);
        }
    };

    handleUserActivity = () => {
        this.setState({ lastActiveTime: Date.now(), showModal: false });
    };

    startBalanceUpdateInterval(user_id) {
        this.clearBalanceUpdateInterval(); // Clear any existing interval
        this.interval = setInterval(() => {
            const currentTime = Date.now();
            const timeSinceLastActive = currentTime - this.state.lastActiveTime;

            if (timeSinceLastActive < 2 * 60 * 1000) { // 2 minutes
                this.updateBalance(user_id);
            } else {
                this.clearBalanceUpdateInterval();
                this.setState({ showModal: true }); // Show the modal when user is inactive
            }
        }, 3000);
    }

    clearBalanceUpdateInterval() {
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }
    }

    compareTime(liveTime) {
        // Convert both times to UTC for accurate comparison
        const userTime = moment.utc(); // Use moment.utc() directly for current time
        const liveMoment = moment.utc(liveTime); // Use moment.utc() to parse the liveTime

        // Calculate the time difference in minutes
        const timeDifference = Math.abs(liveMoment.diff(userTime, 'minutes'));

        // Update the state and clear session if there's a time mismatch
        this.setState({
            isDateValid: timeDifference <= 5,
            loading: false,
        });

        if (timeDifference > 5) {
            sessionStorage.clear();
        }
    }

    fetchInitialBalance(user_id) {
        axios.post('/users/user_profile_display', { user_id: user_id })
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
        axios.post('/users/api/updateBalance', {
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
        const { balance, user_Name, user_id, greeting, currentTime, username, isDateValid, loading, showModal } = this.state; // Destructure the balance from state
        const scoreBat_matchviewUrl = localStorage.getItem('scoreBat_matchviewUrl')

        // Show a loading screen while checking time
        if (loading) {
            return (
                <div className="loading-screen">
                    <h2>Loading Page...</h2>
                </div>
            );
        }

        // Block access if time mismatch
        if (!isDateValid) {
            return (
                <div className="time-error">
                    <h2>Time Error</h2>
                    <p>Your device time is more than 5 minutes off. Please adjust your system time to access this website.</p>
                </div>
            );
        }

        return (
            <Router>
                <Helmet>
                    <base />
                    <title>NEXT-PLATFORM HOME</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content='NextPlatForm Home Main' />
                    <meta property="og:description" content='Join the biggest platform NextPlatform HoME Entertainment Music Box' />
                    <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section className='AppMainApp'>
                    <div className=' mainApp '>
                        <div className='wrapper'>
                            {/* <TimedPopup/> */}
                              <ToastContainer 
                                            position="top-center"
                                            autoClose={5000}
                                            hideProgressBar={false}
                                            newestOnTop
                                            closeOnClick
                                            rtl={false}
                                            pauseOnFocusLoss
                                            draggable
                                            pauseOnHover/>
                            <Navbar />
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

                                    <h3 className="balance-heading">Balance: GHC {balance}</h3>
                                    <button className="btn btn-warning" onClick={() => {
                                        window.location = '/dashboard';
                                    }}>Dashboard</button>
                                    <button className="btn btn-danger">Logout</button>
                                </div>
                            )}

                            <div className='switch'>
                                <Switch>
                                    <Route path='/' exact component={Selected} />
                                    <Route path='/contact-us' exact component={ContactMain} />
                                    <Route path='/signup' exact component={SignUpPage} />
                                    <Route path='/login' exact component={LoginPage} />
                                    <Route path='/reset-password' exact component={ResetPasswordPage} />
                                    <Route path='/activitPassword/:token' exact component={ActivitPassword} />
                                    <Route path="/dashboard" exact render={(props) => (
                                        <Dashboard {...props} balance={balance} user_Name={user_Name} />
                                    )} />
                                    <Route path="/withdraw" component={WithdrawPage} />
                                    <Route path="/withdraw-refferReward" component={WithdrawRefferReward} />
                                    <Route path='/godspeedcomputers' exact component={AccessoryList} />
                                    <Route path='/agent-form' exact component={BecomeAgent} />
                                    <Route path='/poster' exact component={Poster} />
                                    <Route path='/music' exact component={MusicBox_1} />
                                    <Route path={`/music/:id`} exact component={MusicLinkBox} />
                                    <Route path='/music_me' exact component={MusicMain} />
                                    <Route path='/loginSpotify' exact component={LoginSpotify} />
                                    <Route path='/product-main' exact component={ProductMain} />
                                    <Route path='/sport-main-home' exact component={SportMain} />
                                    <Route path='/sport-main-home/:id' exact component={SportDropInfo} />
                                    <Route path={`/sport-main-home/${scoreBat_matchviewUrl}`} exact component={ScoreBatReceivedApi} />
                                    <Route path='/food-main-home/Receive-food-order/:id' exact component={ReceiveGetdFood} />
                                    <Route path='/food-main-home' exact component={FoodMain} />
                                    <Route path='/drinks-main' exact component={LandingPageDrinks} />
                                    <Route path='/drinks_info/:id' exact component={LandingPageDrinksInfo} />
                                    <Route path='/watch_next' exact component={WatchNextMain} />
                                    <Route path='/movies_home_box' exact component={MoviesLandingPage} />
                                    <Route path='/movie_box_main' exact component={MovieBoxMain} />
                                    <Route path='/watch_movies/:id' exact component={MoviesBoxChartShow} />
                                    <Route path='/next-platform_Tv_Show/:id' exact component={MoviesTvShow} />
                                    <Route path='/link_box' exact component={LinkBoxMain} />
                                    <Route path='/link_box/:id' exact component={LinkBoxMainBox} />
                                    <Route path='/call_api' exact component={Call_Api} />
                                    <Route path='/reveived_api/:id' exact component={ReceivedApi} />
                                    <Route path='/11356' exact component={MusicCenterFlowMain} />
                                    <Route path='/next-platform_RAWG_Video_Games_Main' exact component={RAWG_Video_Games_Main} />
                                    <Route path='/next-platform_GameDetails/:id' exact component={GameDetails} />
                                    <Route path='/online_Tv' exact component={OnlineTv} />
                                    <Route path='/watch_online_Tv' exact component={DisplayOnlineTv} />
                                    <Route path='/Next-Platform-with-Sportify' exact component={SportifyMusicMain} />
                                    <Route path='/Next-Platform-song/:id' exact component={SpotifyDisplayMusic} />
                                    <Route path='/Next-Platform-release/:id' exact component={SpotifyReleases} />
                                    <Route path='/Next-Platform-News' exact component={NewsMain} />
                                    <Route path='/Next-Platform-News-info/:id' exact component={NewsInfo} />
                                    <Route path='/Next-Platform-Books' exact component={BooksMainBox} />
                                    <Route path='/Next-Platform-Book-info/:id' exact component={BooksInfoBox} />
                                    <Route path='/avaitor' exact component={Game} />
                                </Switch>
                            </div>

                            <Footer />
                        </div>
                    </div>
                </section>

                {/* Modal for inactivity */}
                <Modal
                    isOpen={showModal}
                    onRequestClose={() => this.setState({ showModal: false })}
                    contentLabel="Inactive Alert"
                    className="modal"
                    overlayClassName="overlay"
                >
                    <h2>Inactive Alert</h2>
                    <p>You have been inactive for more than 2 minutes. Please interact with the page to continue updating your balance.</p>
                    <button onClick={() => this.setState({ showModal: false })}>Close</button>
                </Modal>
            </Router>
        );
    }
}

export default MainApp;