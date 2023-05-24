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
      localStorage.setItem('accessToken',accessToken)

      spotifyApi.searchTracks(search).then((data) => {
        console.log('Search Results:', data.body);
        this.setState({ searchResults: data.body.tracks.items });
      });

      document.querySelector('.Button_Main').style.display='block';
    
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


    const accessToken = localStorage.getItem('accessToken')

     if(accessToken){
        this.setState({
          accessToken
        })
     }
  }
  refreshAccessToken() {
    const { refreshToken } = this.state;

    axios.post('/refreshSpotify', { refreshToken }).then((res) => {
      const { accessToken, expiresIn } = res.data;

      this.setState({ accessToken });

      // Set a timeout to refresh the access token again after 30 minutes
      setTimeout(() => {
        this.refreshAccessToken();
      }, (expiresIn - 1800) * 1000); // Refresh token 30 minutes before it expires
    });
  }
  render() {
    const { search, searchResults } = this.state;
    // console.log(this.state.searchResults)

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
       
         <section className='display_spotify_song_info'>
             {searchResults.map((track) => (
            <div>
              <img src={track.album.images[1].url} />
              <h2>{track.name}</h2>
              <h3>{track.artists[0].name}</h3>
              <Button className='display_spotify_song_info_Button' variant="primary" onClick={() => this.chooseTrack(track)}>
                  Listen or Download
                </Button>
            </div>
            ))}
         </section>
         <section className='Button_Main'>
            <section className='forward_and_back_button'>
                <div className="btn btn-warning" >PREV</div>
                <div className="btn btn-warning">NEXT</div>
            </section>
         </section>
        </section>
        <section>
          
        </section>
      </div>
    );
  }
}

export default SportifyMusicMain;
