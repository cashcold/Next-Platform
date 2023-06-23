import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import { Card, Button } from 'react-bootstrap';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/scrollbar';
import "swiper/css/effect-cube";
import SwiperCore, { Navigation, Scrollbar } from 'swiper/core';
import './sportifyMusic.css';
import MusicReceivedMain from '../Music_Received/music_receivedMain';

// Initialize Swiper components
SwiperCore.use([Navigation, Scrollbar]);

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
      totalResults: 0,
      currentPage: 0,
      itemsPerPage: 19,
      newReleases: [],
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.chooseTrack = this.chooseTrack.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handleChange = (input) => (event) => {
    this.setState({ [input]: event.target.value });
  };

  handleSearch() {
    const { search, accessToken } = this.state;
    if (search && accessToken) {
      const spotifyApi = new SpotifyWebApi({ clientId: '4e2ccdd89a0847bc992b541f5e5e6f73' });
      spotifyApi.setAccessToken(accessToken);
      localStorage.setItem('accessToken', accessToken);

      spotifyApi.searchTracks(search, { limit: 50 }).then((data) => {
        console.log('Search Results:', data.body);
        const totalResults = data.body.tracks.total;
        const searchResults = data.body.tracks.items.slice(0, this.state.itemsPerPage);
        this.setState({ searchResults, totalResults });
      });

      document.querySelector('.Button_Main').style.display = 'block';
    }
  }
s
  chooseTrack(track) {
    console.log('Selected Track:', track);

    const NextPlatformSong_api_ParamsUrl = {
      Song_id: track.id,
      Song_title: track.name,
      Song_overview: track.artists[0].name,
      Song_img: track.album.images[1].url,
      accessToken: this.state.accessToken,
    };

    const queryMusicParams = require('query-string');

    const passSong_api_Params = queryMusicParams.stringify(NextPlatformSong_api_ParamsUrl);

    window.location = `/Next-Platform-song/${track.name}?${passSong_api_Params}`;
  }

  chooseRelease(release) {
    console.log('Selected Release:', release);
  
    const NextPlatformRelease_api_ParamsUrl = {
      Release_id: release.id,
      Release_title: release.name,
      Release_overview: release.artists.map((artist) => artist.name).join(', '),
      Release_img: release.images[1].url,
      accessToken: this.state.accessToken,
    };
  
    const queryMusicParams = require('query-string');
  
    const passRelease_api_Params = queryMusicParams.stringify(NextPlatformRelease_api_ParamsUrl);
  
    window.location = `/Next-Platform-release/${release.name}?${passRelease_api_Params}`;
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
          this.fetchNewReleases(accessToken); // Fetch new releases after getting access token
        })
        .then(() => {
          window.history.pushState({}, null, '/Next-Platform-with-Spotify');
        });
    }

    const accessToken = localStorage.getItem('accessToken');

    if (accessToken) {
      this.setState({
        accessToken,
      });
      this.fetchNewReleases(accessToken); // Fetch new releases if access token is already stored
    }
  }

  fetchNewReleases(accessToken) {
    const spotifyApi = new SpotifyWebApi();
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.getNewReleases({ limit: 50 }).then(
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

  handlePageChange(pageNumber) {
    const { search, accessToken, itemsPerPage } = this.state;
    const offset = pageNumber * itemsPerPage;

    const spotifyApi = new SpotifyWebApi({ clientId: '4e2ccdd89a0847bc992b541f5e5e6f73' });
    spotifyApi.setAccessToken(accessToken);

    spotifyApi.searchTracks(search, { limit: 50, offset }).then((data) => {
      console.log('Search Results:', data.body);
      const searchResults = data.body.tracks.items.slice(offset, offset + itemsPerPage);
      this.setState({ searchResults, currentPage: pageNumber });
    });
  }

  getColor(popularity) {
    if (popularity <= 30) {
      return 'red';
    } else if (popularity <= 70) {
      return 'blue';
    } else {
      return 'green';
    }
  }

  render() {
    const { search, searchResults, totalResults, currentPage, itemsPerPage, newReleases } = this.state;

    // Calculate pagination values
    const totalPages = Math.ceil(totalResults / itemsPerPage);
    const pageRangeDisplayed = 5;
    const paginationStart = Math.max(0, currentPage - Math.floor(pageRangeDisplayed / 2));
    const paginationEnd = Math.min(totalPages - 1, paginationStart + pageRangeDisplayed - 1);
    const paginationRange = Array.from({ length: paginationEnd - paginationStart + 1 }, (_, i) => paginationStart + i);

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

          <section className="display_spotify_song_info">
            {searchResults.map((track) => (
              <div key={track.id}>
                <img src={track.album.images[1].url} alt={track.name} />
                <div
                  className="progress"
                  style={{ width: `${track.popularity}%`, backgroundColor: this.getColor(track.popularity) }}
                ></div>

                <span>Popularity: {track.popularity}</span>
                <h2>{track.name}</h2>
                <h3>{track.artists[0].name}</h3>
                <Button
                  className="display_spotify_song_info_Button"
                  variant="primary"
                  onClick={() => this.chooseTrack(track)}
                >
                  Listen or Download
                </Button>
              </div>
            ))}
          </section>

          <section className="Button_Main">
            <section className="forward_and_back_button">
              <ReactPaginate
                previousLabel="Prev"
                nextLabel="Next"
                breakLabel="..."
                breakClassName="break-me"
                pageCount={totalPages}
                marginPagesDisplayed={2}
                pageRangeDisplayed={pageRangeDisplayed}
                onPageChange={(selected) => this.handlePageChange(selected.selected)}
                containerClassName="pagination"
                subContainerClassName="pages pagination"
                activeClassName="active"
              />
            </section>
          </section>
        </section>
        <section className="new_releases_section new_releases_section_forWeb">
          {newReleases.length > 0  && <h2>Next-Platform New Releases For The Week</h2>}
          <Swiper
            navigation
            scrollbar={{ draggable: true }}
            slidesPerView={5} // Adjust this value to determine the number of items per row
            slidesPerColumn={2} // Set the number of rows to 1
            slidesPerColumnFill="row"
            spaceBetween={10}
            className="swiper-container"
          >
            {newReleases.map((release) => (
              <SwiperSlide key={release.id}>
                <div>
                  <img src={release.images[1].url} alt={release.name} />
                  <h4>{release.name}</h4>
                  <p>{release.artists.map((artist) => artist.name).join(', ')}</p>
                  <Button
                    className="display_spotify_song_info_Button"
                    variant="primary"
                    onClick={() => this.chooseRelease(release)}
                  >
                    Listen or Download
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
        <section className="new_releases_section new_releases_section_forMobile">
        {newReleases.length > 0  && <h2>Next-Platform New Releases For The Week</h2>}
          <Swiper
            navigation
            scrollbar={{ draggable: true }}
            slidesPerView={2}
            spaceBetween={10}
          >
            {newReleases.map((release) => (
              <SwiperSlide key={release.id}>
                <div>
                  <img src={release.images[1].url} alt={release.name} />
                  <h4>{release.name}</h4>
                  <p>{release.artists.map((artist) => artist.name).join(', ')}</p>
                  <Button
                    className="display_spotify_song_info_Button"
                    variant="primary"
                    onClick={() => this.chooseRelease(release)}
                  >
                    Listen or Download
                  </Button>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        <MusicReceivedMain/>
      </div>
    );
  }
}

export default SportifyMusicMain;
