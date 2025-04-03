import React, { Component } from 'react';
import axios from 'axios';
import './newsInfo.css'; // Make sure this path is correct

class NewsInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: null,
            error: null
        };
    }

    componentDidMount() {
        const id = localStorage.getItem('News_id');
        if (id) {
            axios.get(`/news/${id}`)
                .then(response => {
                    this.setState({ news: response.data });
                })
                .catch(error => {
                    console.error('Error fetching news details:', error);
                    this.setState({ error: 'Failed to fetch news details.' });
                });
        }
    }

    render() {
        const { news, error } = this.state;

        return (
            <div className='news-info-main'>
                <h1>Display News Info</h1>
                <img className="d-block w-100"  src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBUY%20BITCOIN.jpg?alt=media&token=95e601b7-808f-412f-8360-e8b7eb025798"
                        alt="First slide" />
                {error && <p className='error-message'>{error}</p>}
                {news && (
                    <div className='news-details'>
                        {news.image && <img src={news.image} alt={news.title} className='news-image' />}
                        <h2 className='news-title'>{news.title}</h2>
                        <p className='news-description'>{news.description}</p>
                        <p className='news-content'>{news.content}</p>
                        <p className='news-author'>Author: {news.author}</p>
                        <p className='news-language'>Language: {news.language}</p>
                        <p className='news-category'>Category: {news.category.join(', ')}</p>
                        <p className='news-published'>Date: {new Date(news.published).toLocaleDateString()}</p>
                        <br/>
                        <a href={news.url} className='news-link btn btn-warning' target='_blank' rel='noopener noreferrer'>Read more</a>
                    </div>
                )}
            </div>
        );
    }
}

export default NewsInfo;
