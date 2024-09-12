import React, { Component } from 'react';
import './Dashboard.css'; // Import the CSS file for styling and animations
import { motion } from 'framer-motion'; // Import framer-motion for smooth effects

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: 'John', // Replace with the actual username from your authentication logic
      balance: 100, // Example balance value
      rewards: ['Badge 1', 'Badge 2', 'Badge 3'], // Example rewards
      giftCards: ['Amazon $10', 'Netflix $15'], // Example gift cards
      offers: ['10% off next purchase', '$5 bonus for referrals'], // Example offers
      greeting: '',
      currentTime: '',
    };
  }

  componentDidMount() {
    this.updateGreeting();
    // Update time every minute
    this.timerID = setInterval(
      () => this.updateGreeting(),
      60000
    );
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

        {/* Balance Section */}
        <motion.div
          className="balance-section"
          initial={{ x: -100 }}
          animate={{ x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Your Balance</h2>
          <p>${balance}</p>
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
            {giftCards.map((card, index) => (
              <li key={index}>{card}</li>
            ))}
          </ul>
        </motion.div>

        {/* Offers Section */}
        <motion.div
          className="offers-section"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Current Offers</h2>
          <ul>
            {offers.map((offer, index) => (
              <li key={index}>{offer}</li>
            ))}
          </ul>
        </motion.div>

        {/* Add other sections as needed */}
      </div>
    );
  }
}

export default Dashboard;
