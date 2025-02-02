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
      newReleases: [],
      offset: 0,
      total: 0,
      itemsPerPage: 50,
      currentPage: 1,
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
    this.fetchNewReleases(accessToken);
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

  fetchNewReleases(accessToken) {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getNewReleases({ limit: 50 }).then(
      (data) => {
        console.log('New Releases:', data.body);
        const newReleases = data.body.albums.items;
        const total = data.body.albums.total;
        this.setState({ newReleases, total });
      },
      (error) => {
        console.error('Error retrieving new releases:', error);
      }
    );
  }

  goToPrevPage() {
    const { offset, itemsPerPage, currentPage } = this.state;
    const newOffset = offset - itemsPerPage;
    const newPage = currentPage - 1;

    this.setState({ offset: newOffset, currentPage: newPage }, () => {
      this.fetchNewReleasesPage();
    });
  }

  goToNextPage() {
    const { offset, itemsPerPage, currentPage } = this.state;
    const newOffset = offset + itemsPerPage;
    const newPage = currentPage + 1;

    this.setState({ offset: newOffset, currentPage: newPage }, () => {
      this.fetchNewReleasesPage();
    });
  }

  fetchNewReleasesPage() {
    const { accessToken, itemsPerPage, offset } = this.state;
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getNewReleases({ limit: itemsPerPage, offset }).then(
      (data) => {
        console.log('New Releases:', data.body);
        const newReleases = data.body.albums.items;
        this.setState({ newReleases });
      },
      (error) => {
        console.error('Error retrieving new releases:', error);
      }
    );
  }

  render() {
    const { releaseData, error, lyrics, newReleases, currentPage, total } = this.state;
    const totalPages = Math.ceil(total / this.state.itemsPerPage);

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

        {newReleases.length > 0 && (
          <section className="new_releases_drop_section">
            <h2>Next-Platform New Releases For The Week</h2>
            <div className="new_releases_drop_details">
              {newReleases.map((release) => (
                <div key={release.id}>
                  <img src={release.images[1].url} alt={release.name} />
                  <h4>{release.name}</h4>
                  <p>{release.artists.map((artist) => artist.name).join(', ')}</p>
                  <Button
                    className="display_spotify_song_info_Button"
                    variant="primary"
                    onClick={() => this.fetchReleaseData(release.id, this.state.accessToken)}
                  >
                    View Release
                  </Button>
                </div>
              ))}
            </div>

            <div className="pagination">
              <button
                className="pagination-button"
                onClick={() => this.goToPrevPage()}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {currentPage} of {totalPages}
              </span>
              <button
                className="pagination-button"
                onClick={() => this.goToNextPage()}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </section>
        )}
      </div>
    );
  }
}

export default SpotifyReleases;
