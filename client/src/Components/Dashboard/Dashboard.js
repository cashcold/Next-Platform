import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import './Dashboard.css'; // Import the CSS file for styling and animations
import { motion } from 'framer-motion'; // Import framer-motion for smooth effects

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_profile_display: '',
      user_id: '',
      withdrawTotal: '',
      lastWithdrawAmount: '',
      totalReferralReward: 0,
      refferReward: 0,
      username: '', // Replace with the actual username from your authentication logic
      balance: "", // Example balance value
      rewards: [], // Initialize rewards as an empty array
      giftCards: ['Amazon GHC9810', 'Netflix GHC87915'], // Example gift cards
      offers: ['10% off next purchase', 'GHC5 bonus for referrals'], // Example offers
      greeting: '',
      currentTime: '',
      ipAddress: '',
    };
  }

  componentDidMount() {
    console.log(this.state.withdrawTotal);

    // Set an interval to track time and update balance every 3 seconds
    this.interval = setInterval(() => {
      this.setState(
        (prevState) => ({ timeSpent: prevState.timeSpent + 3 }),
        () => {
          // Send the timeSpent (3 seconds) to the backend to update balance
          axios.post(`http://localhost:8000/users/api/updateBalance`, {
            user_id: this.state.user_id,
            timeSpent: 3
          })
            .then((response) => {
              // Update the balance and total time spent from the response
              this.setState({
                balance: response.data.balance,
              });
            })
            .catch((error) => console.error('Error updating balance:', error));
        }
      );
    }, 3000);  // Update every 3 seconds

    axios.get('https://api.ipify.org?format=json')
      .then(response => {
        this.setState({ ipAddress: response.data.ip });
      })
      .catch(error => {
        console.error('Error fetching the IP address:', error);
      });

    const token = sessionStorage.getItem('x-access-token');
    const decoded = jwt_decode(token);
    JSON.stringify(sessionStorage.setItem('user_id', decoded.user_id));
    this.setState({
      user_id: decoded.user_id,
    });

    const id = decoded.user_id;

    axios
      .post('http://localhost:8000/users/withdrawInfo', { id })
      .then((response) => {
        const { totalWithdrawAmount, lastWithdrawAmount } = response.data.data; // Destructure the data
        this.setState({
          withdrawTotal: totalWithdrawAmount, // Set totalWithdrawAmount
          lastWithdrawAmount, // Set lastWithdrawAmount
        });
      })
      .catch((error) => console.error('Error fetching withdrawal info:', error));

    axios.post('http://localhost:8000/users/user_profile_display', { id }).then(data => {
      const userProfile = data.data;
      this.setState({
        user_profile_display: userProfile,
        username: userProfile.user_Name,
        balance: userProfile.accountBalance,
        rewards: [
          `Referrer: ${userProfile.refferReward}`,
          `Last Withdrawal GHC530`,
          'Time spend GHC5830',
          'Share Links GHC6973'
        ] // Update rewards with dynamic value
      });
    });

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

    return (
      <div className="dashboard_main">
        <div className="dashboard-container">
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
            <p>GHC{balance}</p>
            <button className="btn btn-warning" onClick={() => {
              window.location = '/withdraw';
            }}>Withdraw</button>
          </motion.div>

          <motion.div
            className="withdraw-section"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <p>Last Withdraw Amount: GHC{this.state.lastWithdrawAmount}</p>
          </motion.div>
          <motion.div
            className="withdraw-section"
            initial={{ x: -100 }}
            animate={{ x: 0 }}
            transition={{ duration: 0.7 }}
          >
            <p>Total Withdraw: GHC{this.state.withdrawTotal}</p>
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
            <p className='reffLink'>http://nextplatformlive.com/?referrer={username}</p>
          </div>
          <div className="with__inner__box_1">
            <h4>Referral Reward:</h4>
            <h4>${this.state.user_profile_display.refferReward || '0'}.00</h4>
            {this.state.user_profile_display.refferReward > 2 ? (
              <button className="btn-referral-cashout" onClick={() => {
                window.location = `/withdraw-refferReward`
              }} >Cashout</button>
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}

export default Dashboard;