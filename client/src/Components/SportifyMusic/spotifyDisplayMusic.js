import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
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
      Song_title: '',
      Song_overview: '',
      Song_img: '',
      accessToken: '',
      track: null,
      lyrics: '',
      loading: true,
      error: false,
      albums: [],
      albumLoading: true,
      albumError: false,
      currentTrack: null, // Track URI for playing in the SpotifyPlayer
    };
    this.spotifyApi = new SpotifyWebApi({
      clientId: '4e2ccdd89a0847bc992b541f5e5e6f73',
    });
  }

  componentDidMount() {
    const songId = new URLSearchParams(window.location.search).get('Song_id');
    const Song_title = new URLSearchParams(window.location.search).get('Song_title');
    const Song_overview = new URLSearchParams(window.location.search).get('Song_overview');
    const Song_img = new URLSearchParams(window.location.search).get('Song_img');
    const accessToken = new URLSearchParams(window.location.search).get('accessToken');
    this.setState({ songId, Song_title, Song_overview, Song_img, accessToken }, () => {
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
          this.fetchAlbums(track.artists[0].id);
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
        this.setState({ lyrics: 'Failed to fetch lyrics, refresh the page again' });
      });
  }

  fetchAlbums(artistId) {
    this.spotifyApi.getArtistAlbums(artistId)
      .then((data) => {
        const albums = data.body.items;
        this.setState({ albums, albumLoading: false });
      })
      .catch((error) => {
        console.error('Error fetching albums:', error);
        this.setState({ albumLoading: false, albumError: true });
      });
  }

  handleDownload = () => {
    const { track } = this.state;
    const downloadUrl = track.external_urls.spotify; // Assuming Spotify external URL provides a download option

    if (downloadUrl) {
      window.open(downloadUrl, '_blank');
    }
  };

  handleAlbumClick = (albumUri) => {
    this.setState({ currentTrack: albumUri });
  };

  render() {
    const { track, lyrics, loading, error, albums, albumLoading, albumError, currentTrack } = this.state;

    if (loading || albumLoading) {
      return <div>Loading...</div>;
    }

    if (error || albumError) {
      return <div>Error occurred while fetching data.</div>;
    }

    return (
      <div className="spotify-display-music">
        <Helmet>
          <base />
          <title>{this.state.Song_title}</title>
          <meta name="description" content={this.state.Song_overview} />
          <meta property="og:title" content={this.state.Song_title} />
          <meta property="og:description" content={this.state.Song_overview} />
          <meta property="og:image" content={this.state.Song_img} />
          <link rel="canonical" href="next-platform.com" />
        </Helmet>
        <h1 className="title">Enjoy The Best Of Music</h1>
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
              <p className="release-date-precision">
                Release Date Precision: {track.album.release_date_precision}
              </p>
              <p className="available-markets">Available Markets: {track.available_markets.join(', ')}</p>
              <SpotifyPlayer
                token={this.state.accessToken}
                uris={currentTrack ? [currentTrack] : [track.uri]} // Updated uris prop
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
              <button className="download-button" onClick={this.handleDownload}>
                Download
              </button>
            </div>
          </div>
        )}
        {albums.length > 0 && (
          <div className="albums-list">
            <h3 className="albums-title">Albums by {track.artists[0].name}:</h3>
            <ul className="album-items">
              {albums.map((album) => (
                <li
                  key={album.id}
                  className="album-item"
                  onClick={() => this.handleAlbumClick(album.uri)}
                >
                  <img src={album.images[0].url} alt={album.name} className="album-thumbnail" />
                  <p className="album-name">Album: {album.name}</p>
                  <p className="album-release-date">Release Date: {album.release_date}</p>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default SpotifyDisplayMusic;
