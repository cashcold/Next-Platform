import React, { Component } from 'react';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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
      giftCards: [
        'Amazon GHC0', 
        'Netflix GHC0', 
        'Google Play GHC0', 
        'Spotify GHC0', 
        'Apple iTunes GHC0', 
        'Steam GHC0', 
        'eBay GHC0', 
        'PlayStation GHC0', 
        'Xbox GHC0', 
        'Walmart GHC0',
        'Best Buy GHC0',
        'Disney+ GHC0',
        'Uber GHC0',
        'Lyft GHC0',
        'Roblox GHC0',
        'Sephora GHC0',
        'Nike GHC0',
        'Adidas GHC0',
        'Target GHC0',
        'DoorDash GHC0',
        'Hulu GHC0',
        'Grubhub GHC0',
        'Domino’s GHC0',
        'Burger King GHC0',
        'Starbucks GHC0',
        'Visa Prepaid GHC0',
        'Mastercard Prepaid GHC0',
        'Home Depot GHC0',
        'Zalando GHC0',
        'Nordstrom GHC0'
      ], // Example gift cards
      mysteryRewards: [
  'Mystery Box – Win a Random Gift with Every Purchase',  
  'Unlock a Surprise Discount at Checkout',  
  'Spin the Wheel for a Secret Bonus',  
  'Scratch & Win – Reveal Your Hidden Reward',  
  'Get a Free Mystery Gift on Orders Above GHC100',  
  'Random Cashback Bonus – Up to GHC50 Back',  
  'Lucky Draw – Chance to Win Free Products',  
  'Unwrap a Mystery Reward After Your 5th Purchase',  
  'Hidden Discount – Only Shown at Checkout',  
  'Buy Any Item & Get a Mystery Discount Code',  
  'Mystery Gift Box – Surprise Item Added to Your Cart',  
  'First 100 Buyers Get a Secret Reward',  
  'Mystery Coupon Sent to Your Email After Purchase',  
  'Hidden Bonus – Only Available for 1 Hour',  
  'Mystery Loyalty Bonus – Earn Extra Points at Random',  
  'Lucky Surprise – One in Every 10 Orders Wins a Prize',  
  'Daily Mystery Reward – Log in to Claim',  
  'Random Price Drop – Item Prices Change for a Limited Time',  
  'Exclusive Mystery Reward for VIP Members',  
  'Golden Ticket – Win Big with a Random Purchase',  
  'Mystery Discount Code – Hidden Somewhere on the Website',  
  'Flash Mystery Sale – Prices Change Every Hour',  
  'Secret Cashback Bonus – Activated at Checkout',  
  'Mystery Freebie – Added to Orders at Random',  
  'Lucky Purchase – One Order Will Be 100% Free',  
  'Hidden Gift – Check Your Account After Every 3 Purchases',  
  'Secret Jackpot – One Lucky Customer Wins GHC500',  
  'Random Gift Card Reward – Sent After Purchase',  
  'Mystery Upgrade – Your Order Might Get a Free Boost',  
  'Unbox a Mystery Item When You Spend GHC250+'
], // Example mystery rewards
      offers: [
        '10% off next purchase', 
        'GHC5 bonus for referrals', 
        'Free shipping on orders above GHC50', 
        'Buy 1 Get 1 Free on selected items', 
        'GHC10 cashback on first transaction', 
        '15% off for new users', 
        'Earn double points on weekends', 
        'GHC20 discount on electronics', 
        'Exclusive early access to sales', 
        'Refer 3 friends and get GHC25 bonus',
        '25% off on holiday specials', 
        'Limited-time flash sale: 30% off', 
        'Free trial for premium membership', 
        'GHC50 voucher for top spenders', 
        '10% off gift cards purchase', 
        'Free coffee with every meal order', 
        'Special birthday discount - GHC15 off', 
        'Spin & Win: Chance to win GHC100', 
        'Instant 5% rebate on mobile payments', 
        '50% off on selected fashion items', 
        'Exclusive VIP deals for subscribers', 
        'GHC30 bonus for signing up today', 
        'Loyalty members get free gifts', 
        '20% off on fitness and wellness products', 
        'GHC5 credit for social media shares', 
        'Cashback rewards on fuel purchases', 
        'First 100 customers get GHC25 bonus', 
        'Scratch & Win surprise discounts', 
        'Early bird special: GHC40 off event tickets', 
        'Free delivery on first three orders'
      ], // Example offers
      promotions: [
        'Buy One, Get One Free',  
        '50% Off Your Second Purchase',  
        'Free Gift with Every Order Above GHC200',  
        'Buy 2, Get 1 Free',  
        'Limited-Time Flash Sale – Up to 70% Off',  
        'Spend GHC300 and Get GHC50 Cashback',  
        'Refer a Friend and Earn GHC20 Bonus',  
        'Exclusive 24-Hour Deal – Extra 10% Off',  
        'First-Time Buyers Get 15% Off',  
        'Free Shipping on Orders Over GHC100',  
        'Earn Double Reward Points for Every Purchase',  
        'Weekend Special – 30% Off on All Electronics',  
        'Limited-Stock Clearance Sale – Everything Must Go!',  
        'Spend GHC500 and Get a Free Gift Card',  
        'Flash Deal: 40% Off for the Next 3 Hours',  
        'GHC10 Discount for Signing Up',  
        'Buy 3, Get 1 Free on Selected Items',  
        'Spend More, Save More: Up to 25% Off',  
        'End-of-Season Sale – Prices Slashed!',  
        'VIP Members Get an Extra 5% Off',  
        'Back-to-School Sale – 20% Off on Supplies',  
        'Holiday Special – Free Mystery Gift with Purchase',  
        'Bundle Deal: Buy 2 Accessories and Save GHC30',  
        'Loyalty Bonus – Extra Rewards for Returning Customers',  
        'Limited-Time Exclusive Offer – 35% Off',  
        'Trade-In Program – Get Credit for Your Old Devices',  
        'First 50 Orders Get a Surprise Discount',  
        'Birthday Special – GHC20 Off for You',  
        'Midnight Madness Sale – Discounts Only from 12 AM to 3 AM',  
        'Scratch & Win – Surprise Discounts on Checkout'
      ], // Example promotions
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
          axios.post(`/users/api/updateBalance`, {
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
      .post('/users/withdrawInfo', { id })
      .then((response) => {
        const { totalWithdrawAmount, lastWithdrawAmount } = response.data.data; // Destructure the data
        this.setState({
          withdrawTotal: totalWithdrawAmount, // Set totalWithdrawAmount
          lastWithdrawAmount, // Set lastWithdrawAmount
        });
      })
      .catch((error) => {
        console.error('Error fetching withdrawal info:', error);
        if (error.response && error.response.data && error.response.data.message === "No withdrawal records found") {
          this.setState({
            withdrawTotal: 'No records', // Set default value
            lastWithdrawAmount: 'No records', // Set default value
          });
        }
      });
  
    axios.post('/users/user_profile_display', { id }).then(data => {
      const userProfile = data.data;
      this.setState({
        user_profile_display: userProfile,
        username: userProfile.user_Name,
        balance: userProfile.accountBalance,
        rewards: [
          `Referrer Balance: GHC${userProfile.refferReward}`,
          // `Last Withdrawal GHC530`,
          // 'Time spend GHC5830',
          `Total Referral Rewards: GHC${this.state.totalReferralReward}`,
          'Share Links GHC6973'
        ] // Update rewards with dynamic value
      });
    });
  
    // Fetch total referral reward
    axios.get(`/users/totalRefferReward/${id}`)
      .then(response => {
        this.setState({ totalReferralReward: response.data.totalReward }, () => {
          // Update rewards with the correct totalReferralReward value
          this.setState(prevState => ({
            rewards: [
              `Referrer Balance: GHC${prevState.user_profile_display.refferReward}`,
              // `Total Withdrawal GHC530`,
              `Total Referral Rewards: GHC${prevState.totalReferralReward}`,
              // 'Total Time spend GHC5830',
              'Share Links GHC6973'
            ]
          }));
        });
      })
      .catch(error => {
        console.error("Error fetching total referral reward:", error);
        toast.error("Failed to fetch total referral reward.");
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
      totalReferralReward,
      promotions,
      mysteryRewards
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

          <h2>Rewards Earned</h2>

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
           
            <ul>
              {rewards.map((reward, index) => (
                <li key={index}>{reward}</li>
              ))}
            </ul>
          </motion.div>
          
          {/* mysteryRewards Section */}
          <motion.div
            className="offers-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2>My Stery Rewards</h2>
            <ul>
              {mysteryRewards.map((offer, index) => (
                <li key={index}>{offer}</li>
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
          
          {/* promotion Section */}
          <motion.div
            className="giftcards-section"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.7 }}
          >
            <h2>Promotion Available </h2>
            <ul>
              {promotions.map((giftCard, index) => (
                <li key={index}>{giftCard}</li>
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