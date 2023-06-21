import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import './spotifyRelease.css'; // Make sure to add the correct path to your CSS file
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import { Card, Button } from 'react-bootstrap';

class SpotifyReleases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      releaseId: '',
      accessToken: '',
      releaseData: null,
      error: null,
      lyrics: '',
    };
    this.spotifyApi = new SpotifyWebApi({
      clientId: '4e2ccdd89a0847bc992b541f5e5e6f73',
    });
  }

  componentDidMount() {
    const releaseId = new URLSearchParams(window.location.search).get('Release_id');
    const accessToken = new URLSearchParams(window.location.search).get('accessToken');

    this.setState({ releaseId, accessToken });

    this.fetchReleaseData(releaseId, accessToken);
  }

  fetchReleaseData(releaseId, accessToken) {
    this.spotifyApi.setAccessToken(accessToken);

    this.spotifyApi
      .getAlbum(releaseId)
      .then((response) => {
        const releaseData = response.body;
        this.setState({ releaseData });
        this.fetchLyrics(releaseData.artists[0].name, releaseData.name);
      })
      .catch((error) => {
        console.error('Error fetching release data:', error);
        this.setState({ error });
      });
  }

  fetchLyrics(artist, track) {
    axios
      .get('/lyrics', {
        params: {
          artist,
          track,
        },
      })
      .then((response) => {
        const lyrics = response.data.lyrics;
        this.setState({ lyrics });
      })
      .catch((error) => {
        console.error('Error fetching lyrics:', error);
        this.setState({ lyrics: 'Lyrics not available' });
      });
  }

  render() {
    const { releaseData, error, lyrics } = this.state;

    return (
      <div className="spotify-release-music">
        <ToastContainer />
        <h1 className="title">Next-Platform new_releases_section</h1>
        <section className="release-info">
          {error ? (
            <div className="error-message">Error fetching release data: {error.message}</div>
          ) : releaseData ? (
            <div className="release-data">
              <div className="release-cover">
                <img src={releaseData.images[0].url} alt="Release Cover" />
              </div>
              <div className="release-details">
                <h2>{releaseData.name}</h2>
                <p>Artist: {releaseData.artists[0].name}</p>
                <p>Popularity: {releaseData.popularity}</p>
                <p>Release date: {releaseData.release_date}</p>
                <p>Copyrights: {releaseData.label}</p>
                <p>Available Markets: {releaseData.available_markets.join(', ')}</p>
              </div>
              
              <div className="spotify-player">
                <SpotifyPlayer
                  token={this.state.accessToken}
                  uris={[releaseData.uri]}
                  autoPlay={false}
                  play={false}
                />
              </div>
              <div className="lyrics">
                <h3>Lyrics</h3>
                <p>{lyrics}</p>
              </div>
            </div>
          ) : (
            <div className="loading-message">Loading release data...</div>
          )}
        </section>
      </div>
    );
  }
}

export default SpotifyReleases;
