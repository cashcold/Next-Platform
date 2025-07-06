import React, { Component } from 'react';
import axios from 'axios';

class ExchangeMarquee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      baseCurrency: 'USD',
      rates: {},
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    const { baseCurrency } = this.state;
    const API_KEY = 'YOUR_API_KEY_HERE'; // Replace with your ExchangeRate-API key
    const url = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest/${baseCurrency}`;

    axios.get(url)
      .then((res) => {
        this.setState({ rates: res.data.conversion_rates, loading: false });
      })
      .catch((err) => {
        this.setState({ error: 'Could not load rates.', loading: false });
        console.error(err);
      });
  }

  render() {
    const { rates, loading, error } = this.state;

    if (loading) return <div style={{ background: '#000', color: '#fff', padding: '5px' }}>Loading exchange rates...</div>;
    if (error) return <div style={{ background: '#000', color: 'red', padding: '5px' }}>{error}</div>;

    const rateText = Object.entries(rates)
      .map(([currency, rate]) => `1 USD = ${rate} ${currency}`)
      .join('  |  ');

    return (
      <div style={{ backgroundColor: '#000', color: '#0f0', padding: '8px 0', fontSize: '14px', fontFamily: 'monospace' }}>
        <marquee behavior="scroll" direction="left">{rateText}</marquee>
      </div>
    );
  }
}

export default ExchangeMarquee;
