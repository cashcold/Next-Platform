import React, { Component } from 'react';
import './scorebatVideoApi.css';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Card } from 'react-bootstrap';
import loading_io_2 from '../../AllInOne/img2/Ellipsis-1.3s-214px.svg';
import moment from 'moment';

class ScoreBatVideoApi extends Component {
    constructor(props) {
        super(props);
        this.state = {
            scorebat: [], // Original data from API
            filteredData: [], // Filtered data for search
            searchQuery: '', // Search input value
            offset: 0,
            perPage: 12,
            currentPage: 0,
            pageCount: 0,
            postData: [],
        };
        this.handleSearch = this.handleSearch.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handlePageClick = (e) => {
        window.scrollTo(0, 0);
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset,
        }, () => {
            this.updatePostData();
        });
    };

    handleSearch(event) {
        const query = event.target.value.toLowerCase();
        const filteredData = this.state.scorebat.filter(item =>
            item.title.toLowerCase().includes(query) ||
            item.competition.toLowerCase().includes(query)
        );

        this.setState({
            searchQuery: query,
            filteredData,
            pageCount: Math.ceil(filteredData.length / this.state.perPage),
            currentPage: 0,
            offset: 0,
        }, () => {
            this.updatePostData();
        });
    }

    updatePostData() {
        const slice = this.state.filteredData.slice(this.state.offset, this.state.offset + this.state.perPage);
        const postData = slice.map(pd => (
            <React.Fragment key={pd.title}>
                <div className="food_box_main_in">
                    <div className="food_box" onClick={() => {
                        localStorage.setItem('scoreBat_pd_thumbnail', pd.thumbnail);
                        localStorage.setItem('scoreBat_pd_competition', pd.competition);
                        localStorage.setItem('scoreBat_pd_title', pd.title);
                        localStorage.setItem('scoreBat_pd_date', pd.date);
                        localStorage.setItem('scoreBat_pd_embed', pd.videos[0].embed);

                        const scoreBatParamsUrl = {
                            name: pd.title,
                            info: pd.competition,
                            on_image: pd.thumbnail,
                        };
                        const queryMusicParams = require('query-string');

                        const passScoreBatParams = queryMusicParams.stringify(scoreBatParamsUrl);

                        window.location = `/sport-main-home/${pd.title}?${passScoreBatParams}`;
                    }}>
                        <Card className='card_sport'>
                            <Card.Img className='card_sport_img' src={pd.thumbnail} />
                            <h5><i className="fa fa-clock-o fa-x" aria-hidden="true"></i> <span>{moment(pd.date).format('LLLL')}</span></h5>
                            <Card.Body>
                                <Card.Text>
                                    <span>{pd.videos[0].title}
                                        <div className="loading_img">
                                            <img className='loading_io_2' src={loading_io_2} alt='Loading' />
                                        </div>
                                    </span>
                                    <p>{pd.title}</p>
                                </Card.Text>
                                <h3 className='btn btn-danger'>WATCH</h3>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </React.Fragment>
        ));

        this.setState({ postData });
    }

    receivedData() {
        axios.get(`https://www.scorebat.com/video-api/v3/`)
            .then(response => {
                const data = response.data.response;
                this.setState({
                    scorebat: data,
                    filteredData: data, // Initialize filteredData with all data
                    pageCount: Math.ceil(data.length / this.state.perPage),
                }, () => {
                    this.updatePostData();
                });
            })
            .catch(error => {
                console.error('Error fetching data: ', error);
            });
    }

    componentDidMount() {
        this.receivedData();
    }

    render() {
        return (
            <div className='Scorenat_main_folder'>
                <section className='bat_score'>
                    <h1>Stream and Watch Sport Highlight</h1>
                    <input
                        type="text"
                        placeholder="Search matches..."
                        value={this.state.searchQuery}
                        onChange={this.handleSearch}
                        className="search-input"
                    />
                </section>
                <section className="ScoreBatVideoAPI_DataSection">
                    {this.state.postData}
                </section>
                <section className='check_pagination'>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={1}
                        pageRangeDisplayed={2}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"}
                    />
                </section>
            </div>
        );
    }
}

export default ScoreBatVideoApi;