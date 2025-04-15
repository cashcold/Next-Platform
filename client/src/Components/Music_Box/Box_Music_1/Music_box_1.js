import React, { Component } from 'react';
import { Mp3_main_api } from '../../Api/mp3_main_api.js';
import ReactPaginate from 'react-paginate';
import { Card, Button } from 'react-bootstrap';
import './style.css';

class MusicBox_1 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            music_box_1: Mp3_main_api,
            offset: 0,
            perPage: 8,
            currentPage: 0,
            postData: [],
            pageCount: 0,
        };

        this.handlePageClick = this.handlePageClick.bind(this);
    }

    receivedData() {
        const data = this.state.music_box_1;
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
        const postData = slice.map((pd) => (
            <div className="music-card" key={pd.id}>
                <div
                    className="music-card-content"
                    onClick={() => {
                        localStorage.setItem('mp3_api_id', pd.id);
                        localStorage.setItem('mp3_api_name', pd.name);
                        localStorage.setItem('mp3_api_title', pd.title);
                        localStorage.setItem('mp3_api_head_Text_url', pd.head_Text_url);
                        localStorage.setItem('mp3_api_img', pd.img);
                        localStorage.setItem('mp3_api_head_Text', pd.head_Text);
                        localStorage.setItem('mp3_api_song_href', pd.song_href);
                        localStorage.setItem('mp3_api_date', pd.date);
                        localStorage.setItem('mp3_api_eye_seen', pd.eye_seen);
                        localStorage.setItem('mp3_api_music_type', pd.music_type);
                        localStorage.setItem('mp3_api_about_Main', pd.about_Main);
                        localStorage.setItem('mp3_api_social_on_image', pd.social_on_image);

                        const musicParamsUrl = {
                            name: pd.name,
                            info: pd.head_Text_url,
                            on_image: pd.social_on_image,
                        };
                        const queryMusicParams = require('query-string');
                        const passMusicParams = queryMusicParams.stringify(musicParamsUrl);

                        window.location = `/music/${pd.head_Text_url}?${passMusicParams}`;
                    }}
                >
                    <img src={pd.img} alt={pd.name} className="music-card-image" />
                    <div className="music-card-info">
                        <h3>{pd.name}</h3>
                        <p>{pd.title}</p>
                        <Button variant="danger">Listen or Download</Button>
                    </div>
                </div>
            </div>
        ));
        this.setState({
            pageCount: Math.ceil(data.length / this.state.perPage),
            postData,
        });
    }

    handlePageClick = (e) => {
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState(
            {
                currentPage: selectedPage,
                offset: offset,
            },
            () => {
                this.receivedData();
            }
        );
    };

    componentDidMount() {
        this.receivedData();
    }

    render() {
        return (
            <div className="music-box">
                <h1>Next-Platform Music Box</h1>
                <p>Discover and download your favorite music tracks!</p>
                <section className="music-grid">{this.state.postData}</section>
                <section className="pagination-container">
                    <ReactPaginate
                        previousLabel={'Prev'}
                        nextLabel={'Next'}
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                    />
                </section>
            </div>
        );
    }
}

export default MusicBox_1;