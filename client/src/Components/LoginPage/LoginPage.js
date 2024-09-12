import React, { Component } from 'react';
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
    // Handle form submission logic
    console.log(this.state);
  }

  render() {
    return (
      <div className="login_main_page">
      <div className="login-container">
        <div className="login-header">
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
        
        <div className="signup-link animate-text">
          <p>Don’t have an account? <a href="#">Sign up here</a></p>
        </div>
      </div>
      </div>
    );
  }
}

export default LoginPage;
