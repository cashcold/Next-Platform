import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './RAWG_Video_Games.css';
import axios from 'axios';

class RAWG_Video_Games_Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dataMatch_check: [], // Store fetched game data
            currentPage: 1, // Track the current page
        };
    }

    componentDidMount() {
        this.fetchGames(this.state.currentPage);
    }

    fetchGames = (page) => {
        axios
            .get(`https://api.rawg.io/api/games?key=e1fbdfe6840f485282801980ab3f63de&page=${page}`)
            .then((data) =>
                this.setState({
                    dataMatch_check: data.data.results,
                    currentPage: page,
                })
            )
            .catch((error) => {
                console.error('Error fetching games:', error);
            });
    };

    handleGameClick = (id) => {
        // Redirect to game details page with the game ID
        window.location.href = `/next-platform_GameDetails/${id}`;
    };

    handleNextPage = () => {
        this.fetchGames(this.state.currentPage + 1);
        // window.scrollTo(0, 0); // Scroll to top
    };

    handlePrevPage = () => {
        if (this.state.currentPage > 1) {
            this.fetchGames(this.state.currentPage - 1);
            // window.scrollTo(0, 0); // Scroll to top
        }
    };

    render() {
        return (
            <div className="RAWG_main_folder">
                <Helmet>
                    <title>NEXT-PLATFORM VIDEO GAMES</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <meta property="og:title" content="NextPlatForm Home Main" />
                    <meta property="og:description" content="Join the biggest platform NextPlatform Home Entertainment Music Box" />
                    <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <section className="bat_score">
                    <h1>Play Free Games Online<br />And Save Your Progress</h1>
                    <h3>NEXT-PLATFORM Offers <br />You More than 350,000 Video Games.</h3>
                </section>
                <section className="section_inner_raw_js">
                    <section className="raw_js">
                        <h2>
                            {this.state.dataMatch_check.map((data) => (
                                <ul key={data.id}>
                                    <li>
                                        <img src={data.background_image} alt={data.name} />
                                        <div className="api_namme">{data.name}</div>
                                        <button
                                            className="btn btn-warning"
                                            onClick={() => this.handleGameClick(data.id)}
                                        >
                                            Play Now
                                        </button>
                                    </li>
                                </ul>
                            ))}
                        </h2>
                    </section>
                </section>
                <section className="for_next_prev_tab">
                    <div className="raw_Pre" onClick={this.handlePrevPage}>
                        Preview
                    </div>
                    <div className="raw_next" onClick={this.handleNextPage}>
                        Next
                    </div>
                </section>
            </div>
        );
    }
}

export default RAWG_Video_Games_Main;