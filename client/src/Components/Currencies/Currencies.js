import React, { Component } from 'react';
import axios from 'axios';
import './currencies.css';

class Currencies extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currencies: [],
            page: 1,
            limit: 10,
            total: 0,
            error: null
        };
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies = () => {
        const { page, limit } = this.state;

        axios.get(`/currencies?page=${page}&limit=${limit}`)
            .then(response => {
                this.setState({
                    currencies: response.data.data,
                    total: response.data.total
                });
            })
            .catch(error => {
                console.error('Error fetching data from CoinGecko API:', error);
                this.setState({ error: 'Failed to fetch currencies.' });
            });
    }

    handlePrevPage = () => {
        this.setState(
            prevState => ({ page: prevState.page - 1 }),
            this.fetchCurrencies
        );
    }

    handleNextPage = () => {
        this.setState(
            prevState => ({ page: prevState.page + 1 }),
            this.fetchCurrencies
        );
    }

    render() {
        const { currencies, page, limit, total, error } = this.state;
        const totalPages = Math.ceil(total / limit);

        return (
            <div className='currencies-container'>
                <h1>Available Currencies</h1>
                {error && <p className='error-message'>{error}</p>}
                <ul className='currencies-list'>
                    {currencies.map(currency => (
                        <li key={currency.id} className='currency-item'>
                            <p className='currency-name'>{currency.name} ({currency.symbol})</p>
                            <p className='currency-price'><span>Price:</span> ${currency.current_price}</p>
                            <p className='currency-market-cap'><span>Market Cap:</span> ${currency.market_cap}</p>
                            <p className='currency-volume'><span>24h Volume:</span> ${currency.total_volume}</p>
                            <p className='currency-high'><span>24h High:</span> ${currency.high_24h}</p>
                            <p className='currency-low'><span>24h Low:</span> ${currency.low_24h}</p>
                            <p className='currency-change'><span>24h Change:</span> {currency.price_change_percentage_24h}%</p>
                            <p className='currency-supply'><span>Circulating Supply:</span> {currency.circulating_supply}</p>
                            <p className='currency-total-supply'><span>Total Supply:</span> {currency.total_supply}</p>
                            <p className='currency-max-supply'><span>Max Supply:</span> {currency.max_supply}</p>
                            <p className='currency-last-updated'><span>Last Updated:</span> {new Date(currency.last_updated).toLocaleString()}</p>
                        </li>
                    ))}
                </ul>
                <div className='pagination'>
                    <button onClick={this.handlePrevPage} disabled={page === 1}>Previous</button>
                    <span>Page {page} of {totalPages}</span>
                    <button onClick={this.handleNextPage} disabled={page === totalPages}>Next</button>
                </div>
            </div>
        );
    }
}

export default Currencies;
