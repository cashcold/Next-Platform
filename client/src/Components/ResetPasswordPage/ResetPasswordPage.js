import React, { Component } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';
import './ResetPasswordPage.css'; // Import the CSS file for styling

class ResetPasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle the password reset logic (API call to send reset link)
    

        const saveRestartLinkPassword = {
          email: this.state.email
      }
      if(!saveRestartLinkPassword.email){
          return(toast.warning("Enter Email",{position: 'top-center'}))
      }    

      axios.post ("http://localhost:8000/users/forgotpassword",saveRestartLinkPassword)
      .then(res => (toast.success("Link have sent to email address")))
      .catch(err => (toast.error(err.response.data)))
      .then(res => window.location="/login" )
      }

  render() {
    return (
      <div className="reset-container">
        <div className="reset-header">
           <ToastContainer/>
          <h1 className="animate-h1">Forgot Your Password?</h1>
          <p className="animate-text">Enter your email to reset your password</p>
        </div>

        <form className="reset-form" onSubmit={this.handleSubmit}>
          <div className="form-group animate-div">
            <label>Email Address</label>
            <input 
              type="email" 
              name="email" 
              value={this.state.email} 
              onChange={this.handleInputChange} 
              placeholder="Enter your email" 
              required
            />
          </div>

          <button type="submit" className="reset-button">Send Reset Link</button>
        </form>
      </div>
    );
  }
}

export default ResetPasswordPage;
