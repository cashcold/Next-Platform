import React, { Component } from 'react';
import axios from 'axios';

export default class useAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessToken: '',
      refreshToken: '',
      expiresIn: '',
    };
  }

  componentDidMount() {
    axios
      .post('http://localhost:3000/loginSpotify', {
        code: this.props.code,
      })
      .then((res) => {
        this.setState({
          accessToken: res.data.accessToken,
          refreshToken: res.data.refreshToken,
          expiresIn: res.data.expiresIn,
        });
        window.history.pushState({}, null, '/');
      })
      .catch(() => {
        window.location = '/Next-Platform-with-Sportify';
      });
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.refreshToken && this.state.expiresIn) {
      const interval = setInterval(() => {
        axios
          .post('http://localhost:3000/refreshSpotify', {
            refreshToken: this.state.refreshToken,
          })
          .then((res) => {
            this.setState({
              accessToken: res.data.accessToken,
              expiresIn: res.data.expiresIn,
            });
          })
          .catch(() => {
            window.location = '/Next-Platform-with-Sportify';
          });
      }, (this.state.expiresIn - 60) * 1000);

      return () => clearInterval(interval);
    }
  }

  render() {
    return this.state.accessToken;
  }
}
