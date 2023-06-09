import React, { Component } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
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
      loading: true,
      error: false,
    };
    this.spotifyApi = new SpotifyWebApi({
      clientId: '4e2ccdd89a0847bc992b541f5e5e6f73',
      accessToken: this.state.accessToken,
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
    const { songId } = this.state;
    this.spotifyApi.getTrack(songId)
      .then((data) => {
        const track = data.body;
        this.setState({ track, loading: false });
      })
      .catch((error) => {
        console.error('Error fetching track:', error);
        this.setState({ loading: false, error: true });
      });
  }

  render() {
    const { track, loading, error } = this.state;

    if (loading) {
      return <div>Loading...</div>;
    }

    if (error) {
      return <div>Error occurred while fetching track.</div>;
    }

    return (
      <div className="next_sportify_main">
        <h1>Display Spotify Music</h1>
        {track && (
          <div className="track-details">
          <img src={track.album.images[1].url} alt={track.name} />
            <h2>{track.name}</h2>
            <p>Artist: {track.artists[0].name}</p>
            <p>Album: {track.album.name}</p>
            <p>Release Date: {track.album.release_date}</p>
            <p>Popularity: {track.popularity}</p>
            <p>Duration: {formatDuration(track.duration_ms)}</p>
            <p>Album Type: {track.album.album_type}</p>
            <p>Available Markets: {track.available_markets.join(', ')}</p>
            <p>Release Date Precision: {track.album.release_date_precision}</p>
          </div>
        )}
      </div>
    );
  }
}

export default SpotifyDisplayMusic;
