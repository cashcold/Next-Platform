import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import './spotifyDisplayMusic.css';

function formatDuration(durationMs) {
  const minutes = Math.floor(durationMs / 60000);
  const seconds = Math.floor((durationMs % 60000) / 1000);

  const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  return `${formattedMinutes}:${formattedSeconds}`;
}

class SpotifyDisplayMusic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      songId: '',
      accessToken: '',
      track: null,
      lyrics: '',
      loading: true,
      error: false,
    };
    this.spotifyApi = new SpotifyWebApi({
      clientId: '4e2ccdd89a0847bc992b541f5e5e6f73',
    });
  }

  componentDidMount() {
    const songId = new URLSearchParams(window.location.search).get('Song_id');
    const accessToken = new URLSearchParams(window.location.search).get('accessToken');
    this.setState({ songId, accessToken }, () => {
      this.fetchTrack();
    });
  }

  fetchTrack() {
    const { songId, accessToken } = this.state;
    this.spotifyApi.setAccessToken(accessToken);
    this.spotifyApi.getTrack(songId)
      .then((data) => {
        const track = data.body;
        this.setState({ track, loading: false }, () => {
          this.fetchLyrics(track.artists[0].name, track.name);
        });
      })
      .catch((error) => {
        console.error('Error fetching track:', error);
        this.setState({ loading: false, error: true });
      });
  }

  fetchLyrics(artist, track) {
    axios.get('/lyrics', {
      params: {
        artist,
        track,
      },
    })
      .then((response) => {
        const lyrics = response.data.lyrics || 'No lyrics found';
        this.setState({ lyrics });
      })
      .catch((error) => {
        console.error('Error fetching lyrics:', error);
        this.setState({ lyrics: 'Failed to fetch lyrics' });
      });
  }

  render() {
    const { track, lyrics, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error occurred while fetching track.</div>;
    }

    return (
      <div className="spotify-display-music">
        <h1 className="title">Display Spotify Music</h1>
        {track && (
          <div className="track-details">
            <div className="image-container">
              <img className="album-image" src={track.album.images[1].url} alt={track.name} />
            </div>
            <div className="info-container">
              <h2 className="track-name">{track.name}</h2>
              <p className="artist-name">Artist: {track.artists[0].name}</p>
              <p className="album-name">Album: {track.album.name}</p>
              <p className="release-date">Release Date: {track.album.release_date}</p>
              <p className="popularity">Popularity: {track.popularity}</p>
              <p className="duration">Duration: {formatDuration(track.duration_ms)}</p>
              <p className="album-type">Album Type: {track.album.album_type}</p>
              <p className="release-date-precision">Release Date Precision: {track.album.release_date_precision}</p>
              <p className="available-markets">Available Markets: {track.available_markets.join(', ')}</p>
              <SpotifyPlayer
                token={this.state.accessToken}
                uris={[track.uri]}
                styles={{
                  activeColor: '#fff',
                  bgColor: '#333',
                  color: '#fff',
                  loaderColor: '#fff',
                  sliderColor: '#1cb954',
                  trackArtistColor: '#ccc',
                  trackNameColor: '#fff',
                }}
              />
              <h3 className="lyrics-title">Lyrics:</h3>
              <p className="lyrics-text">{lyrics}</p>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default SpotifyDisplayMusic;
