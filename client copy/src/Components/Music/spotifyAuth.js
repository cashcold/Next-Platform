import React, { Component } from 'react';
import axios from 'axios';

class SpotifyAuth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: '',
      refreshToken: '',
      error: ''
    };
    this.handleAuth = this.handleAuth.bind(this);
    this.refreshToken = this.refreshToken.bind(this);
  }

  handleAuth() {
    const client_id = '7274681e5f564e29b6246893ed62f20a'; // Replace with your own client ID
    const redirect_uri = 'http://localhost:3000/Next-Platform-with-Sportify'; // Replace with your own redirect URI
    const scope = 'user-read-private user-read-email'; // Replace with the scopes you require

    window.location = `https://accounts.spotify.com/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&scope=${scope}&response_type=code`;
  }

  refreshToken() {
    const { refreshToken } = this.state;
    const client_id = '7274681e5f564e29b6246893ed62f20a'; // Replace with your own client ID
    const client_secret = '6c641ca17e444af4a111c84d7f83ddb9'; // Replace with your own client secret

    axios.post('https://accounts.spotify.com/api/token', {
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
      client_id,
      client_secret
    })
      .then((response) => {
        const { access_token } = response.data;
        this.setState({ token: access_token });
        setTimeout(this.refreshToken, 300000); // Refresh token every 5 minutes
      })
      .catch((error) => {
        this.setState({ error });
      });
  }

  // componentDidMount() {
  //   const { code } = this.props.match.params;

  //   if (code) {
  //     const client_id = '7274681e5f564e29b6246893ed62f20a'; // Replace with your own client ID
  //     const client_secret = '6c641ca17e444af4a111c84d7f83ddb9'; // Replace with your own client secret
  //     const redirect_uri = 'http://localhost:3000/Next-Platform-with-Sportify'; // Replace with your own redirect URI

  //     axios.post('https://accounts.spotify.com/api/token', {
  //       grant_type: 'authorization_code',
  //       code,
  //       redirect_uri,
  //       client_id,
  //       client_secret
  //     })
  //       .then((response) => {
  //         const { access_token, refresh_token } = response.data;
  //         this.setState({ token: access_token, refreshToken: refresh_token });
  //         setTimeout(this.refreshToken, 300000); // Refresh token every 5 minutes
  //       })
  //       .catch((error) => {
  //         this.setState({ error });
  //       });
  //   }
  // }

  render() {
    const { token, error } = this.state;
    return (
      <div>
        {token && <p>Access token: {token}</p>}
        {error && <p>Error: {error.message}</p>}
        <button onClick={this.handleAuth}>Authenticate with Spotify</button>
      </div>
    );
  }
}

export default SpotifyAuth;
