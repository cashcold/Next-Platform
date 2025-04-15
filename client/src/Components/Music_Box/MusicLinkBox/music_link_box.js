import React, { Component } from 'react';
import './style.css';
import { Helmet } from 'react-helmet';
import {
    FacebookShareButton,
    PinterestShareButton,
    WhatsappShareButton,
    TwitterShareButton,
    LinkedinShareButton,
    TelegramShareButton,
} from 'react-share';
import {
    FacebookIcon,
    PinterestIcon,
    WhatsappIcon,
    TwitterIcon,
    LinkedinIcon,
    TelegramIcon,
} from 'react-share';

class MusicLinkBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mp3_api_name: '',
            mp3_api_title: '',
            mp3_api_img: '',
            mp3_api_date: '',
            mp3_api_eye_seen: '',
            mp3_api_music_type: '',
            mp3_api_song_href: '',
            mp3_api_about_Main: '',
            social_url: '',
        };
    }

    componentDidMount() {
        const social_url = window.location.href;
        const mp3_api_name = localStorage.getItem('mp3_api_name');
        const mp3_api_title = localStorage.getItem('mp3_api_title');
        const mp3_api_img = localStorage.getItem('mp3_api_img');
        const mp3_api_date = localStorage.getItem('mp3_api_date');
        const mp3_api_eye_seen = localStorage.getItem('mp3_api_eye_seen');
        const mp3_api_music_type = localStorage.getItem('mp3_api_music_type');
        const mp3_api_song_href = localStorage.getItem('mp3_api_song_href');
        const mp3_api_about_Main = localStorage.getItem('mp3_api_about_Main');

        this.setState({
            mp3_api_name,
            mp3_api_title,
            mp3_api_img,
            mp3_api_date,
            mp3_api_eye_seen,
            mp3_api_music_type,
            mp3_api_song_href,
            mp3_api_about_Main,
            social_url,
        });
    }

    render() {
        const {
            mp3_api_name,
            mp3_api_title,
            mp3_api_img,
            mp3_api_date,
            mp3_api_eye_seen,
            mp3_api_music_type,
            mp3_api_song_href,
            mp3_api_about_Main,
            social_url,
        } = this.state;

        return (
            <div className="music-link-box">
                <Helmet>
                    <title>{mp3_api_title} - Download Now</title>
                    <meta name="description" content={mp3_api_about_Main} />
                    <meta property="og:title" content={mp3_api_title} />
                    <meta property="og:description" content={mp3_api_about_Main} />
                    <meta property="og:image" content={mp3_api_img} />
                </Helmet>

                <section className="song-details">
                <section className='movieBox_1_back_tab' onClick={()=>{
                        window.location =`/music`
                    }}>
                        <img  src={require('../../../AllInOne/icons/icons8-go-back.gif')}/>
                            <p className="">Back</p>
                    </section>
                    <div className="song-header">
                        <h1>
                            <span>Download:</span> {mp3_api_name} - {mp3_api_title}
                        </h1>
                        <div className="song-meta">
                            <p>
                                <i className="fa-solid fa-calendar-check"></i> {mp3_api_date}
                            </p>
                            <p>
                                <i className="fa-solid fa-eye"></i> {mp3_api_eye_seen} views
                            </p>
                        </div>
                    </div>

                    <div className="song-image">
                        <img src={mp3_api_img} alt={mp3_api_title} />
                    </div>

                    <div className="download-button">
                        <a href={mp3_api_song_href} className="btn btn-danger" download>
                            Download MP3
                        </a>
                    </div>

                    <div className="song-description">
                        <h3>{mp3_api_about_Main}</h3>
                    </div>

                    <div className="song-stream">
                        <audio controls src={mp3_api_song_href}>
                            Your browser does not support the <code>audio</code> element.
                        </audio>
                    </div>
                </section>

                <section className="social-share">
                    <h3>Share this song:</h3>
                    <div className="social-icons">
                        <FacebookShareButton url={social_url}>
                            <FacebookIcon size={40} round />
                        </FacebookShareButton>
                        <PinterestShareButton url={social_url}>
                            <PinterestIcon size={40} round />
                        </PinterestShareButton>
                        <WhatsappShareButton url={social_url}>
                            <WhatsappIcon size={40} round />
                        </WhatsappShareButton>
                        <TwitterShareButton url={social_url}>
                            <TwitterIcon size={40} round />
                        </TwitterShareButton>
                        <LinkedinShareButton url={social_url}>
                            <LinkedinIcon size={40} round />
                        </LinkedinShareButton>
                        <TelegramShareButton url={social_url}>
                            <TelegramIcon size={40} round />
                        </TelegramShareButton>
                    </div>
                </section>
            </div>
        );
    }
}

export default MusicLinkBox;