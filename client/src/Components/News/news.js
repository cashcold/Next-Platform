import React, { Component } from 'react';
import './news.css';
import axios from 'axios';

class NewsMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            news: [], // Initialize state to hold news data as an empty array
            page: 1,
            limit: 10,
            total: 0,
            search: '',
            category: '',
            error: null // To handle any errors
        };
    }

    componentDidMount() {
        this.fetchNews();
    }

    fetchNews = () => {
        const { page, limit, search, category } = this.state;
        console.log('Fetching news with params:', { page, limit, search, category });

        axios.get('http://localhost:8000/latest-news', {
            params: { page, limit, search, category }
        })
        .then(response => {
            console.log('Response data:', response.data);
            this.setState({
                news: response.data.news || response.data.newsData || [], // Adjust this based on the actual data structure
                total: response.data.total || response.data.totalNewsCount || 0 // Adjust this based on the actual data structure
            });
        })
        .catch(error => {
            console.error('Error fetching data from Currents API:', error);
            this.setState({ error: 'Failed to fetch news.' });
        });
    }

    handleSearchChange = (e) => {
        this.setState({ search: e.target.value });
    }

    handleCategoryChange = (e) => {
        this.setState({ category: e.target.value });
    }

    handleSearch = () => {
        this.setState({ page: 1 }, this.fetchNews);
    }

    handlePrevPage = () => {
        this.setState(
            prevState => ({ page: prevState.page - 1 }),
            this.fetchNews
        );
    }

    handleNextPage = () => {
        this.setState(
            prevState => ({ page: prevState.page + 1 }),
            this.fetchNews
        );
    }

    render() {
        const { news, page, limit, total, search, category, error } = this.state;
        const totalPages = Math.ceil(total / limit);

        console.log('Rendering news:', news);

        return (
            <div className='news-container'>
                <h1>Latest News</h1>
                <div className='search-bar'>
                    <input 
                        type='text' 
                        placeholder='Search news...' 
                        value={search} 
                        onChange={this.handleSearchChange} 
                    />
                    <select value={category} onChange={this.handleCategoryChange}>
                        <option value=''>All Categories</option>
                        <option value='business'>Business</option>
                        <option value='entertainment'>Entertainment</option>
                        <option value='general'>General</option>
                        <option value='health'>Health</option>
                        <option value='science'>Science</option>
                        <option value='sports'>Sports</option>
                        <option value='technology'>Technology</option>
                    </select>
                    <button onClick={this.handleSearch}>Search</button>
                </div>
                {error && <p className='error-message'>{error}</p>}
                <div className='news-list'>
                    {news && news.length > 0 ? (
                        news.map(item => (
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
                        ))
                    ) : (
                        <p>No news available.</p>
                    )}
                </div>
                <div className='pagination'>
                    <button onClick={this.handlePrevPage} disabled={page === 1}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={this.handleNextPage} disabled={page === totalPages}>Next</button>
                </div>
            </div>
        );
    }
}

export default NewsMain;