import React, { Component } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import './LoginPage.css'; // Importing the CSS file

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    
    const userLogin = {
      email: this.state.email,
      password: this.state.password
  }

  if(!userLogin.email){
      toast.warning('Enter Email Address')
      return false;
  }
  if(!userLogin.password){
      toast.warning('Enter Password')
      return false;
  }

  axios.post( "http://localhost:8000/users/login",userLogin).then(res => {  
      sessionStorage.setItem('x-access-token',JSON.stringify(res.data))
      return res.data;
  }).then(res => {toast.success("Login Successful !", setTimeout(()=>{
      toast.success("LOADING ACCOUNT") 
  },4000),{
      
      });}).then(res => window.location="/dashboard" ).catch(err => {toast.error(err.response.data, {
      position: toast.POSITION.TOP_RIGHT
   });
  });
  }

  render() {
    return (
      <div className="login_main_page">
      <div className="login-container">
        <div className="login-header">
          <ToastContainer/>
          <h1 className="animate-h1">Welcome Back!</h1>
          <p className="animate-text">We’re so happy to see you again. Log in to continue your amazing journey!</p>
        </div>
        
        <form className="login-form" onSubmit={this.handleSubmit}>
          <div className="form-group animate-div">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={this.state.email} 
              onChange={this.handleInputChange}
              placeholder="Enter your email" 
              required 
            />
          </div>
          
          <div className="form-group animate-div">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleInputChange}
              placeholder="Enter your password" 
              required 
            />
          </div>
          
          <button type="submit" className="login-button">Login</button>
        </form>
        
        <div className="signup-link_password animate-text">
          <p>Forgot Your Password? <a href="reset-password">Reset Password</a></p>
        </div>
        <div className="signup-link animate-text">
          <p>Don’t have an account? <a href="signup">Sign up here</a></p>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginPage;
