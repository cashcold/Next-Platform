import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import './WithdrawPage.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaWallet, FaDollarSign, FaArrowRight } from "react-icons/fa";

class WithdrawPage extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      user_profile_display: '',
      id: '',
      user_Name: '',
      email: '',
      phone: '',
      country: '',
      type: 'Withdrawal',
      accountBalance: '',
      withdrawAmount: '',
      walletAddress: '',
      bitcoinAddress: '', // Add state for Bitcoin wallet address
      zero_accountBalance: 0,
    };

    this.handleWithdraw = this.handleWithdraw.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  handleWithdraw = () => {
    const { id, country, bitcoinAddress } = this.state;
  
    const Withdraw = { 
      id: this.state.id,
      user_id: this.state.id,
      withdrawAmount: this.state.withdrawAmount,
      user_Name: this.state.user_Name,
      email: this.state.email,
      phone: this.state.phone,
      country: this.state.country,
      type: this.state.type,
      date: this.state.withdraw_date, 
      bitcoin: country !== 'Ghana' ? bitcoinAddress : null, // Include Bitcoin address if not from Ghana
    };

    axios.post(`http://localhost:8000/users/withdraw/${id}`, Withdraw)
      .then(res => {
        console.log("Full response from backend:", res);  // Log the entire response object
  
        if (res.data.message) {
          toast.success(res.data.message); // Display success message
        } else {
          toast.error("No properties found in response");
        }
  
        setTimeout(() => {
          window.location = '/dashboard'; // Redirect to Dashboard after 5 seconds
        }, 5000);
      })
      .catch(err => {
        console.error("Error response:", err.response);  // Log the error response
        toast.error("Failed to process withdrawal: " + err.response?.data?.message || err.message);
      });
  };

  componentDidMount() {
    console.log(this.state.withdrawAmount)
    
    const token = sessionStorage.getItem('x-access-token');
    const decoded = jwt_decode(token);
    this.setState({
      id: decoded.user_id,
    });

    const id = decoded.user_id;
    axios.post('http://localhost:8000/users/user_profile_display', { id }).then(data => 
      this.setState({
        user_profile_display: data.data,
        accountBalance: data.data.accountBalance,
        withdrawAmount: data.data.accountBalance,
        user_Name: data.data.user_Name,
        email: data.data.email,
        phone: data.data.phone,
        country: data.data.country,
        walletAddress: data.data.walletAddress,
      })
    );
  }

  render() {
    console.log(this.state.withdrawAmount)
    return (
      <div className="withdraw-page">
        <ToastContainer />
        <div className="withdraw-header">
          <h1 className="header-title">Withdraw Funds</h1>
          <p className="header-subtitle">Manage your rewards and balances easily</p>
        </div>
        
        <div className="withdraw-info">
          <div className="balance-box">
            <FaDollarSign className="icon balance-icon" />
            <div className="balance-details">
              <h4 className="balance-title">Current Balance</h4>
              <p className="balance-amount">${this.state.accountBalance}</p>
            </div>
          </div>
          
          <div className="wallet-box">
            <FaWallet className="icon wallet-icon" />
            <div className="wallet-details">
              <h4 className="wallet-title">Payment Number</h4>
              <p className="wallet-address">{this.state.phone || "No Wallet Connected"}</p>
            </div>
          </div>
          <section class="useroutghana">
          <p>🌍 <strong>Attention Next-Platform Users!</strong> 🌍</p>

<p>We are excited to announce a new update for our international users! If you are located outside of Ghana, you will now receive your payments through Bitcoin! 💸💰</p>

<p>This means faster, more secure, and convenient transactions for all our global users. No more waiting for international bank transfers – get your rewards instantly in your Bitcoin wallet! 🚀</p>

<p>🔹 <strong>How it works:</strong></p>
<ul>
  <li>Log in to your Next-Platform account.</li>
  <li>Navigate to the withdrawal section.</li>
  <li>Enter your Bitcoin wallet address.</li>
  <li>Withdraw your funds and receive them in Bitcoin!</li>
</ul>

<p>We are committed to providing the best experience for all our users, no matter where you are in the world. 🌐</p>

<p>Thank you for being a part of the Next-Platform community! If you have any questions or need assistance, feel free to reach out to our support team.</p>

<p>#NextPlatform #BitcoinPayments #GlobalUsers #Crypto #SecurePayments #InstantRewards</p>
          </section>

          {this.state.country !== 'Ghana' && (
            <div className="bitcoin-box">
              <FaWallet className="icon bitcoin-icon" />
              <div className="bitcoin-details">
                <h4 className="bitcoin-title">Bitcoin Wallet Address</h4>
                <input 
                  type="text" 
                  name="bitcoinAddress" 
                  value={this.state.bitcoinAddress} 
                  onChange={this.handleChange} 
                  placeholder="Enter your Bitcoin wallet address" 
                  className="bitcoin-input"
                />
              </div>
            </div>
          )}

          <button className="withdraw-btn" onClick={this.handleWithdraw}>
            Withdraw Now <FaArrowRight className="icon withdraw-icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default WithdrawPage;