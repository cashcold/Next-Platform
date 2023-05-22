import React, { Component } from 'react';
import axios from 'axios';
// import WebPlayback from './WebPlayback';

class SpotifyAuth extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: null,
      refreshToken: null,
      error: null
    };
  }

  componentDidMount() {
    this.getToken();
    // Set interval to refresh token every 5 minutes
    this.refreshInterval = setInterval(() => {
      this.refreshToken();
    }, 5 * 60 * 1000);
  }

  componentWillUnmount() {
    clearInterval(this.refreshInterval);
  }

  getToken() {
    // Replace with your own client ID and client secret from the Spotify Developer Dashboard
    const clientId = '7274681e5f564e29b6246893ed62f20a';
    const clientSecret = '6c641ca17e444af4a111c84d7f83ddb9';

    // Encode client ID and client secret in Base64 format
    const encoded = new Buffer(`${clientId}:${clientSecret}`).toString('base64');

    // Set up headers for the request
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encoded}`
      }
    };

    // Set up data for the request
    const data = {
      grant_type: 'client_credentials'
    };

    // Send a POST request to the Spotify API token endpoint
    axios.post('https://accounts.spotify.com/api/token', new URLSearchParams(data), headers)
      .then(res => {
        this.setState({
          token: res.data.access_token,
          refreshToken: res.data.refresh_token,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  refreshToken() {
    const { refreshToken } = this.state;
    if (!refreshToken) return;

    // Replace with your own client ID and client secret from the Spotify Developer Dashboard
    const clientId = '7274681e5f564e29b6246893ed62f20a';
    const clientSecret = '6c641ca17e444af4a111c84d7f83ddb9';

    // Encode client ID and client secret in Base64 format
    const encoded = new Buffer(`${clientId}:${clientSecret}`).toString('base64');

    // Set up headers for the request
    const headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${encoded}`
      }
    };

    // Set up data for the request
    const data = {
      grant_type: 'refresh_token',
      refresh_token: refreshToken
    };

    // Send a POST request to the Spotify API token endpoint
    axios.post('https://accounts.spotify.com/api/token', new URLSearchParams(data), headers)
      .then(res => {
        this.setState({
          token: res.data.access_token,
          error: null
        });
      })
      .catch(err => {
        this.setState({
          error: err.message
        });
      });
  }

  render() {
    const { token, error } = this.state;

    if (error) {
      return <p>Error: {error}</p>;
    }

    if (!token) {
      return <p>Loading...</p>;
    }

    return (
      <div>
        <p>Access Token: {token}</p>
      </div>
    );
  }
}

export default SpotifyAuth;
 