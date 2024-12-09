// WithdrawPage.js
import React, { Component } from 'react';
import jwt_decode from 'jwt-decode';
import './WithdrawPage.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { io } from "socket.io-client";
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
      widthdrawAmount: '',
      walletAddress: '',
      zero_accountBalance: 0,
    };

    this.handleWithdraw = this.handleWithdraw.bind(this);
  }

  handleWithdraw = () => {
    const { id } = this.state;
  
    const Withdraw = { 
      id: this.state.id,
      user_id: this.state.id,
      widthdrawAmount: this.state.widthdrawAmount,
      user_Name: this.state.user_Name,
      email: this.state.email,
      phone: this.state.phone,
      country: this.state.country,
      type: this.state.type,
      date: this.state.withdraw_date, 
      bitcoin: this.state.bitcoin,
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
    console.log(this.state.widthdrawAmount)
    
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
        widthdrawAmount: data.data.accountBalance,
        user_Name: data.data.user_Name,
        email: data.data.email,
        phone: data.data.phone,
        country: data.data.country,
        walletAddress: data.data.walletAddress,
      })
    );
  }

  render() {
    console.log(this.state.widthdrawAmount)
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

          <button className="withdraw-btn" onClick={this.handleWithdraw}>
            Withdraw Now <FaArrowRight className="icon withdraw-icon" />
          </button>
        </div>
      </div>
    );
  }
}

export default WithdrawPage;
