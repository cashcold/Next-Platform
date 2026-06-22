import React, { Component } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import './DynamicProductHub.css'; 

class DynamicProductHub extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allProducts: [],      // Holds the total raw records returned from the API
      visibleProducts: [],  // Holds only the subset currently visible on screen
      itemsToShow: 8,       // Step size for rendering sets of products
      loading: true,
      error: null
    };

    this.jumiaMarketplaceUrl = "https://www.jumia.com.gh/catalog/";
    this.jforceTrackingSlug = "fq1RzYc"; 
  }

  componentDidMount() {
    this.fetchLiveProducts();
  }

  fetchLiveProducts = async () => {
    try {
      // 🚀 CHANGED: Removed '?limit=8' to download the full catalog pool from FakeStoreAPI
      const response = await axios.get('https://fakestoreapi.com/products');
      
      this.setState({ 
        allProducts: response.data,
        // Slice the initial dataset to render our baseline items state size smoothly
        visibleProducts: response.data.slice(0, this.state.itemsToShow),
        loading: false 
      });
    } catch (err) {
      this.setState({ error: "Could not establish product stream pipeline.", loading: false });
    }
  };

  // 🚀 LOAD MORE INTERFACE LOGIC
  handleLoadMore = () => {
    this.setState((prevState) => {
      const nextDisplayLimit = prevState.itemsToShow + 8; // Adds 8 more items every click
      return {
        itemsToShow: nextDisplayLimit,
        visibleProducts: prevState.allProducts.slice(0, nextDisplayLimit)
      };
    });
  };

  generateMonetizedLink = (productTitle) => {
    return `${this.jumiaMarketplaceUrl}?q=${encodeURIComponent(productTitle)}&utm_source=jforce&utm_medium=affiliate&utm_campaign=${this.jforceTrackingSlug}`;
  };
   
  render() {
    const { visibleProducts, allProducts, loading, error } = this.state;
    // Condition check to hide the button if everything in the array has already been populated
    const showLoadMoreButton = visibleProducts.length < allProducts.length;

    return (
      <Container className="hub-container my-5">
        <Helmet>
          <title>Top Deals Hub | Next Platform Live</title>
        </Helmet>

        <h1 className="text-center mb-2 font-weight-bold text-white">Trending Gadgets & Accessories</h1>
        <p className="text-center text-muted mb-5">Click any deal to find it instantly on Jumia Ghana</p>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <Spinner animation="border" variant="warning" />
          </div>
        ) : error ? (
          <div className="text-center text-danger my-4 font-weight-bold">{error}</div>
        ) : (
          <>
            <Row className="g-4">
              {visibleProducts.map((item) => (
                <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <Card className="h-100 hub-card shadow-sm border-0">
                    <div className="hub-img-container d-flex align-items-center justify-content-center p-3" style={{ height: '240px', background: '#ffffff' }}>
                      <Card.Img
                        variant="top"
                        src={item.image}
                        alt={item.title}
                        style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
                      />
                    </div>
                    
                    <Card.Body className="d-flex flex-column justify-content-between bg-dark text-white p-3">
                      <div>
                        <Card.Title className="h6 font-weight-bold text-white mb-2 hub-card-title" style={{ display: '-webkit-box', WebkitLineClamp: '2', WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {item.title}
                        </Card.Title>
                        
                        <Card.Text className="text-warning h5 font-weight-bold mb-3 hub-card-price">
                          GHS {(item.price * 15).toFixed(2)} 
                        </Card.Text>
                      </div>

                      <a
                        href={this.generateMonetizedLink(item.title)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-warning w-100 font-weight-bold text-dark mt-2 dynamic-shop-btn"
                      >
                        Check Deal on Jumia 🛒
                      </a>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>

            {/* 🔥 PAGINATION INJECTED BELOW THE MAPPED GRID FEED AREA 🔥 */}
            {showLoadMoreButton && (
              <div className="text-center mt-5">
                <Button 
                  onClick={this.handleLoadMore}
                  className="px-5 py-2 font-weight-bold load-more-action-btn"
                >
                  Load More Deals 📦
                </Button>
              </div>
            )}
          </>
        )}
      </Container>
    );
  }
}

export default DynamicProductHub;