import React, { Component } from 'react';
import './AccessoryList.css';  // Import the CSS file

class AccessoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessories: [],
      loading: true,
      error: null,
    };
  }

  componentDidMount() {
    this.fetchAccessories();
  }

  fetchAccessories = async () => {
    try {
      const response = await fetch('http://localhost:8000/users/accessories');
      if (!response.ok) {
        throw new Error('Failed to fetch accessories');
      }
      const data = await response.json();
      this.setState({ accessories: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  render() {
    const { accessories, loading, error } = this.state;

    if (loading) {
      return <p className="loading">Loading accessories...</p>;
    }

    if (error) {
      return <p className="error">Error: {error}</p>;
    }

    return (
      <div className="accessory-main">
      <div className="accessory-list">
        <h1 className="heading">Accessories List</h1>
        <ul className="accessories">
          {accessories.map((accessory) => (
            <li key={accessory._id} className="accessory-item">
              <h2>{accessory.name}</h2>
              <p>Category: {accessory.category}</p>
              <p>Price: ${accessory.price}</p>
              <p>Description: {accessory.description}</p>
              <p>Stock: {accessory.stock}</p>
              <p>Rating: {accessory.ratings}/5</p>
              <div className="images">
                {accessory.images.map((image, index) => (
                  <img key={index} src={image} alt={accessory.name} />
                ))}
              </div>
              <p>Colors: {accessory.colors.join(', ')}</p>
              <p>Sizes: {accessory.sizes.join(', ')}</p>
              <button className="btn btn-warning">Order Now</button>
            </li>
          ))}
        </ul>
      </div>
      </div>
    );
  }
}

export default AccessoryList;
