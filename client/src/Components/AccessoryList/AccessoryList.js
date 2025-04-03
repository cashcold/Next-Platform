import React, { Component } from 'react';
import './AccessoryList.css';  // Import the CSS file
import { ToastContainer, toast } from 'react-toastify';  // Import Toastify
import 'react-toastify/dist/ReactToastify.css';  // Import Toastify styles

class AccessoryList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessories: [],
      loading: true,
      error: null,
      selectedAccessory: null, // Store selected accessory for popout
    };
  }

  componentDidMount() {
    this.fetchAccessories();
  }

  fetchAccessories = async () => {
    try {
      const response = await fetch('/users/accessories');
      if (!response.ok) {
        throw new Error('Failed to fetch accessories');
      }
      const data = await response.json();
      this.setState({ accessories: data, loading: false });
    } catch (error) {
      this.setState({ error: error.message, loading: false });
    }
  };

  handleOrderClick = (accessory) => {
    this.setState({ selectedAccessory: accessory }, () => {
      this.notifyOrderConfirmation();
    });
  };

  // Notify the user about the order confirmation
  notifyOrderConfirmation = () => {
    const { selectedAccessory } = this.state;
    if (selectedAccessory) {
      toast.info(
        <div>
          <h3>Confirm Order</h3>
          <img src={selectedAccessory.images[0]} alt={selectedAccessory.name} style={{ width: '100px', height: 'auto', borderRadius: '8px' }} />
          <p><strong>{selectedAccessory.name}</strong></p>
          <p>Price: GHC {selectedAccessory.price}</p>
          <button onClick={this.confirmOrder} className="btn btn-success">Confirm Order</button>
        </div>,
        {
          position: "top-right",
          autoClose: 30000,  // Toast will close after 10 seconds if not interacted with
          hideProgressBar: true,
        }
      );
    }
  };

  confirmOrder = () => {
    toast.success(
      <div>
        <h3>Your order has been confirmed!</h3>
        <p>For emergency orders, please call: <strong>0551475547</strong></p>
      </div>,
      {
        position: "top-right",
        autoClose: 80000, // Toast will close after 5 seconds
      }
    );
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
        <img className="d-block w-100"  src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBUY%20BITCOIN.jpg?alt=media&token=95e601b7-808f-412f-8360-e8b7eb025798"
                        alt="First slide" />
        <div className="accessory-list">
          <h1 className="heading">God's Speed Computers GH Accessories </h1>
          <ul className="accessories">
            {accessories.map((accessory) => (
              <li key={accessory._id} className="accessory-item">
                <h2>{accessory.name}</h2>
                <p>Category: {accessory.category}</p>
                <p>Price: GHC {accessory.price}</p>
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
                <button 
                  className="btn btn-warning"
                  onClick={() => this.handleOrderClick(accessory)} // Show popout when order is clicked
                >
                  Order Now
                </button>
              </li>
            ))}
          </ul>
        </div>

        <ToastContainer /> {/* ToastContainer to show notifications */}
      </div>
    );
  }
}

export default AccessoryList;
