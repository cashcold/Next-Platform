import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import ReactPaginate from 'react-paginate';
import { Card, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';

import './sportifyMusic.css';

class SportifyMusicMain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sportifyDetails: [],
      accessToken: '',
      refreshToken: '',
      expiresIn: '',
      search: '',
      searchResults: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.chooseTrack = this.chooseTrack.bind(this);
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleSearch() {
    const { search, accessToken } = this.state;
    if (search && accessToken) {
      const spotifyApi = new SpotifyWebApi({ clientId: '4e2ccdd89a0847bc992b541f5e5e6f73' });
      spotifyApi.setAccessToken(accessToken);

      spotifyApi.searchTracks(search).then((data) => {
        console.log('Search Results:', data.body);
        this.setState({ searchResults: data.body.tracks.items });
      });
    }
  }

  chooseTrack(track) {
    console.log('Selected Track:', track);
    // Add your logic for selecting a track
  }

  componentDidMount() {
    const code = new URLSearchParams(window.location.search).get('code');
    if (code) {
      axios
        .post('/loginSpotify', { code })
        .then((data) => {
          const { accessToken, refreshToken, expiresIn } = data.data;
          this.setState({
            sportifyDetails: data.data,
            accessToken,
            refreshToken,
            expiresIn,
          });
        })
        .then(() => {
          window.history.pushState({}, null, '/Next-Platform-with-Sportify');
        });
    }
  }

  render() {
    const { search, searchResults } = this.state;
    console.log(this.state.accessToken)

    return (
      <div className="next_sportify_main">
        <section className="Next_sportify_section_1">
          <h1>Welcome to our online music</h1>
          <div>
            <input
              type="search"
              placeholder="Search Songs"
              value={search}
              onChange={this.handleChange('search')}
            />
            <button onClick={this.handleSearch}>Search</button>
          </div>
          {searchResults.map((track) => (
            <Card key={track.id}>
              <Card.Img variant="top" src={track.album.images[0].url} />
              <Card.Body>
                <Card.Title>{track.name}</Card.Title>
                <Card.Text>{track.artists[0].name}</Card.Text>
                <Button variant="primary" onClick={() => this.chooseTrack(track)}>
                  Select
                </Button>
              </Card.Body>
            </Card>
          ))}
        </section>
      </div>
    );
  }
}

export default SportifyMusicMain;
