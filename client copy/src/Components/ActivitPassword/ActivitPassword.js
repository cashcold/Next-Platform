import React, { Component } from 'react';
import axios from 'axios';
import './ActivitPassword.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';

class ActivitPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      token: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  handleChange = input => event => {
    event.preventDefault();
    this.setState({ [input]: event.target.value });
  };

  onSubmit = event => {
    event.preventDefault();
    const saveLinkPassword = {
      password: this.state.password
    };

    if (saveLinkPassword.password.length < 6) {
      toast.warn('Password must be at least 6 characters');
      return false;
    }
    const token = this.props.match.params.token;

    axios
      .post(`/users/activtypassword/${token}`, saveLinkPassword)
      .then(res => {
        toast.success('Password Updated');
      })
      .then(
        setTimeout(() => {
          window.location = '/login';
        }, 3000)
      )
      .catch(err => {
        toast.error(err.response.data);
      });
  };

  render() {
    return (
      <div className='activepassword-container'>
        <ToastContainer />
        <h1 className='header-title animate__animated animate__fadeInDownBig animate__slower'>
          <span>ENTER</span> NEW PASSWORD
        </h1>
        <div className='password-input animate__animated animate__bounceInUp animate__slower'>
          <input
            type='password'
            name='password'
            onChange={this.handleChange('password')}
            placeholder='New Password'
          />
        </div>

        <button className='btn btn-success save-btn' onClick={this.onSubmit}>
          Save Password
        </button>
      </div>
    );
  }
}

export default ActivitPassword;
