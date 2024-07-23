import React, { Component } from 'react';
import './news.css';
import axios from 'axios';

class NewsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [], // Initialize state to hold news data
            error: null // To handle any errors
        };
    }

    componentDidMount() {
        axios.get('http://localhost:8000/latest-news') // Update this URL to your backend endpoint
            .then(response => {
                this.setState({ news: response.data.news });
            })
            .catch(error => {
                console.error('Error fetching data from Currents API:', error);
                this.setState({ error: 'Failed to fetch news.' });
            });
    }

    render() {
        const { news, error } = this.state;

        return (
            <div className='news-container'>
                <h1>Latest News</h1>
                {error && <p className='error-message'>{error}</p>}
                <div className='news-list'>
                    {news.map(item => (
                        <div key={item.id} className='news-item'>
                            {item.image && <img src={item.image} alt={item.title} className='news-image' />}
                            <h2 className='news-title'>{item.title}</h2>
                            <p className='news-description'>{item.description}</p>
                            <a href={item.url} className='news-link' target='_blank' rel='noopener noreferrer'>Read more</a>
                            <p className='news-author'>Author: {item.author}</p>
                            <p className='news-language'>Language: {item.language}</p>
                            <p className='news-category'>Category: {item.category.join(', ')}</p>
                            <p className='news-published'>Date: {new Date(item.published).toLocaleDateString()}</p>
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default NewsMain;
