import React, { Component } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col, Spinner } from 'react-bootstrap';
import './DynamicProductmain.css'; 
import LinkBoxMain from '../Link_Box/link_box';

class DynamicProductmain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [], 
      loading: true,
      error: null,
      showLightbox: false,       
      selectedProduct: null   
    };

    this.jumiaMarketplaceUrl = "https://www.jumia.com.gh/catalog/";
    this.jforceTrackingSlug = "fq1RzYc"; 
    this.siteProductionUrl = "https://nextplatformlive.com"; 
  }

  componentDidMount() {
    this.fetchEntireCatalog();
  }

  fetchEntireCatalog = async () => {
    try {
      const response = await axios.get('https://dummyjson.com/products?limit=0');
      this.setState({ 
        products: response.data.products,
        loading: false 
      });
    } catch (err) {
      this.setState({ error: "Could not establish product stream pipeline.", loading: false });
    }
  };

  handleOpenLightbox = (product) => {
    this.setState({
      showLightbox: true,
      selectedProduct: product
    });
  };

  handleCloseLightbox = () => {
    this.setState({
      showLightbox: false,
      selectedProduct: null
    });
  };

  generateMonetizedLink = (productTitle) => {
    return `${this.jumiaMarketplaceUrl}?q=${encodeURIComponent(productTitle)}&utm_source=jforce&utm_medium=affiliate&utm_campaign=${this.jforceTrackingSlug}`;
  };

  generateServerShareUrl = (product) => {
    return `${this.siteProductionUrl}/Product-Info/${product.id}?Prod_title=${encodeURIComponent(product.title)}&Prod_img=${encodeURIComponent(product.thumbnail)}`;
  };

  copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("🛒 Link copied to clipboard! Paste it anywhere on social media.");
  };
   
  render() {
    const { products, loading, error, showLightbox, selectedProduct } = this.state;

    const shareUrl = selectedProduct ? this.generateServerShareUrl(selectedProduct) : '';
    const shareText = selectedProduct ? encodeURIComponent(`Check out this crazy deal: ${selectedProduct.title} ➡️ `) : '';

    const whatsappUrl = `https://api.whatsapp.com/send?text=${shareText}${encodeURIComponent(shareUrl)}`;
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    const twitterUrl  = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`;
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${shareText}`;

    return (
      <section>
     
      
      <Container className="main-hub-container my-5">
        <h1 className="text-center mb-2 font-weight-bold text-white">Super Deals Mega Mall</h1>
        <p className="text-center text-muted mb-5">Click any product to view sharing choices and marketplace links</p>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '300px' }}>
            <Spinner animation="border" variant="warning" />
          </div>
        ) : error ? (
          <div className="text-center text-danger my-4 font-weight-bold">{error}</div>
        ) : (
          <Row className="g-4">
            {products.map((item) => (
              <Col xs={12} sm={6} md={4} lg={3} key={item.id}>
                <Card className="h-100 main-hub-card shadow-sm border-0" onClick={() => this.handleOpenLightbox(item)}>
                  <div className="main-hub-img-container d-flex align-items-center justify-content-center p-3">
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      alt={item.title}
                      className="hub-responsive-img"
                    />
                  </div>
                  
                  <Card.Body className="d-flex flex-column justify-content-between bg-dark text-white p-3">
                    <div>
                      <Card.Title className="h6 font-weight-bold text-white mb-3 main-hub-title">
                        {item.title}
                      </Card.Title>
                    </div>

                    <div className="mt-auto">
                      <button className="btn btn-warning w-100 font-weight-bold text-dark mt-2 main-hub-btn">
                        View Options 🔍
                      </button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        )}

        {/* 🚀 CUSTOM ISOLATED LIGHTBOX WINDOW (No Global Overlay Collisions) */}
        {showLightbox && selectedProduct && (
          <div className="hub-lightbox-overlay" onClick={this.handleCloseLightbox}>
            <div className="hub-lightbox-window" onClick={(e) => e.stopPropagation()}>
              
              <div className="hub-lightbox-header">
                <h5>Product Options</h5>
                <button className="hub-lightbox-close-x" onClick={this.handleCloseLightbox}>&times;</button>
              </div>

              <div className="hub-lightbox-body">
                {/* Image Canvas Frame with Dark Slate Theme Fill */}
                <div className="hub-lightbox-img-frame mb-3">
                  <img src={selectedProduct.thumbnail} alt={selectedProduct.title} />
                </div>

                <h4 className="hub-lightbox-title mb-4">{selectedProduct.title}</h4>
                
                <p className="hub-lightbox-section-label mb-2">Share to Social Media (Brings Image & Title)</p>
                
                {/* 5 Distinct Social Platforms Action Controls */}
                <div className="hub-lightbox-share-grid mb-4">
                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="hub-share-tile hub-color-wa">WhatsApp</a>
                  <a href={facebookUrl} target="_blank" rel="noopener noreferrer" className="hub-share-tile hub-color-fb">Facebook</a>
                  <a href={twitterUrl} target="_blank" rel="noopener noreferrer" className="hub-share-tile hub-color-tw">Twitter/X</a>
                  <a href={telegramUrl} target="_blank" rel="noopener noreferrer" className="hub-share-tile hub-color-tg">Telegram</a>
                  <button onClick={() => this.copyToClipboard(shareUrl)} className="hub-share-tile hub-color-cp">Copy Link 🔗</button>
                </div>

                <div className="hub-lightbox-divider mb-4"></div>

                <a
                  href={this.generateMonetizedLink(selectedProduct.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-warning w-100 py-3 font-weight-bold text-dark hub-lightbox-primary-btn"
                  onClick={this.handleCloseLightbox}
                >
                  Check Deal on Jumia 🛒
                </a>
              </div>

            </div>
          </div>
        )}
      </Container>
       {/* <LinkBoxMain/> */}
      </section>
    );
  }
}

export default DynamicProductmain;