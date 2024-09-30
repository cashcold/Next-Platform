import React, { Component } from 'react';
import axios from 'axios'
import jwt_decode from 'jwt-decode'
import './Dashboard.css'; // Import the CSS file for styling and animations
import { motion } from 'framer-motion'; // Import framer-motion for smooth effects

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_profile_display: '',
      user_id: '',
      username: '', // Replace with the actual username from your authentication logic
      balance: "", // Example balance value
      rewards: ['Referrer  $1871', 'Time spend $230', 'Share Links $653'], // Example rewards
      giftCards: ['Amazon $10', 'Netflix $15'], // Example gift cards
      offers: ['10% off next purchase', '$5 bonus for referrals'], // Example offers
      greeting: '',
      currentTime: '',
      ipAddress: '',
    };
  }

  componentDidMount() {

    axios.get('https://api.ipify.org?format=json')
    .then(response => {
      this.setState({ ipAddress: response.data.ip });
    })
    .catch(error => {
      console.error('Error fetching the IP address:', error);
    });

    const token = sessionStorage.getItem('x-access-token')
    const decoded = jwt_decode(token)
     JSON.stringify( sessionStorage.setItem('user_id',decoded.user_id))
    this.setState({
        user_id: decoded.user_id,
     })

     const id = decoded.user_id
     const userId = decoded.user_id
     

  

      
     axios.post('http://localhost:8000/users/user_profile_display',{id}).then(data => this.setState(
      {
      user_profile_display: data.data,
      username: data.data.user_Name,
      balance: data.data.accountBalance,

       
    }))


    // console.log(this.state.user_profile_display)





    this.updateGreeting();
    // Update time every minute
    this.timerID = setInterval(() => this.updateGreeting(), 60000);
  }

  componentWillUnmount() {

     clearInterval(this.timerID);


    
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
      currentTime: now.toLocaleString(),
    });
  };

  render() {
    const {
      username,
      balance,
      rewards,
      giftCards,
      offers,
      greeting,
      currentTime,
    } = this.state;

    // console.log(this.state.user_profile_display)

    return (
      <div className="dashboard_main">
      <div className="dashboard-container">
        <motion.h1
          className="dashboard-title"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {greeting}, {username}! <span className="emoji-wave">👋</span>
        </motion.h1>
        <p className="current-time">{currentTime}</p>

        <div className="container_ip_address"> 
        <h1 className="heading">Your IP Address is:</h1>
        <p className="ip-address">{this.state.ipAddress}</p>
      </div>
        

        {/* Balance Section */}
        <motion.div
          className="balance-section"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Your Balance</h2>
          <p>${isNaN(parseFloat(balance)) ? "0.00" : parseFloat(balance).toFixed(2)}</p>
        </motion.div>

        {/* Rewards Section */}
        <motion.div
          className="rewards-section"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Rewards Earned</h2>
          <ul>
            {rewards.map((reward, index) => (
              <li key={index}>{reward}</li>
            ))}
          </ul>
        </motion.div>

        {/* Gift Cards Section */}
        <motion.div
          className="giftcards-section"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Available Gift Cards</h2>
          <ul>
            {giftCards.map((giftCard, index) => (
              <li key={index}>{giftCard}</li>
            ))}
          </ul>
        </motion.div>

        {/* Offers Section */}
        <motion.div
          className="offers-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Current Offers</h2>
          <ul>
            {offers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </motion.div>

         <div className="reff__box_2">
              <h2>Personal <span>Referral</span> Link:</h2>
              <p className='reffLink'>http://localhost:3000/?referrer={username}</p>
          </div>
      </div>
      </div>
    );
  }
}

export default Dashboard;
