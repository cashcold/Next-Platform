import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Container, Row, Col, Spinner, Button } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import './bookInfo.css';

class BooksInfoBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookDetails: null,
      loading: true,
    };
  }

  componentDidMount() {
    // Read parameters straight out of URL query context reliably
    const parsed = queryString.parse(window.location.search);
    const title = parsed.title;
    const author = parsed.author;

    if (title) {
      this.fetchBookDetails(title, author || '');
    } else {
      toast.error("Target lookup credentials missing.");
      this.setState({ loading: false });
    }
  }

  fetchBookDetails = async (title, author) => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?title=${encodeURIComponent(title)}&author=${encodeURIComponent(author)}`
      );
      if (response.data.docs && response.data.docs.length > 0) {
        this.setState({ bookDetails: response.data.docs[0] });
      } else {
        this.setState({ bookDetails: null });
      }
    } catch (error) {
      toast.error("Error retrieving detailed record repository.");
    } finally {
      this.setState({ loading: false });
    }
  };

  // Build automated Amazon URL using your exact affiliate store ID
  getAmazonAffiliateLink = () => {
    const { bookDetails } = this.state;
    if (!bookDetails) return '#';
    
    const cleanTitle = bookDetails.title;
    const cleanAuthor = bookDetails.author_name ? bookDetails.author_name[0] : '';
    const searchQuery = encodeURIComponent(`${cleanTitle} ${cleanAuthor}`);
    
    return `https://www.amazon.com/s?k=${searchQuery}&tag=nextplatforml-20`;
  };

  handleBackRoute = () => {
    window.location.href = '/Next-Platform-Books';
  };

  render() {
    const { bookDetails, loading } = this.state;

    return (
      <Container className="bookInfoMain my-5">
        <Helmet>
          <title>{bookDetails ? `${bookDetails.title} - Book Info` : 'Loading Book Details...'}</title>
        </Helmet>

        <Button
          variant="light"
          className="d-flex align-items-center gap-2 mb-4 border shadow-sm"
          onClick={this.handleBackRoute}
        >
          <span style={{ transform: 'scale(1.2)' }}>⬅️</span> Back to Library
        </Button>

        {loading ? (
          <div className="d-flex justify-content-center align-items-center my-5" style={{ minHeight: '300px' }}>
            <Spinner animation="border" variant="primary" />
          </div>
        ) : bookDetails ? (
          <Row className="bg-white p-4 rounded shadow-sm">
            <Col md={4} className="text-center mb-4 mb-md-0">
              {bookDetails.cover_i ? (
                <img
                  className="img-fluid rounded shadow"
                  src={`https://covers.openlibrary.org/b/id/${bookDetails.cover_i}-L.jpg`}
                  alt={bookDetails.title}
                  style={{ maxHeight: '450px', objectFit: 'contain' }}
                />
              ) : (
                <div className="bg-light d-flex align-items-center justify-content-center rounded border" style={{ height: '350px' }}>
                  <span className="text-muted text-center p-3">No Photographic Representation Found</span>
                </div>
              )}
            </Col>

            <Col md={8}>
              <h1 className="mb-2 font-weight-bold display-5">{bookDetails.title}</h1>
              <h3 className="text-muted h5 mb-4">By: {bookDetails.author_name?.join(', ') || 'Unknown Author'}</h3>

              <hr />

              <div className="book-specs my-4">
                <p><strong>First Published:</strong> {bookDetails.first_publish_year || 'N/A'}</p>
                <p><strong>Publisher Structure:</strong> {bookDetails.publisher?.slice(0, 5).join(', ') || 'N/A'}</p>
                <p><strong>Publish Date String:</strong> {bookDetails.publish_date?.slice(0, 3).join(', ') || 'N/A'}</p>
                <p className="text-truncate"><strong>Universal ISBN Listing:</strong> {bookDetails.isbn?.slice(0, 5).join(', ') || 'N/A'}</p>
              </div>

              <hr />

              {/* 🔥 MONETIZED TARGET ZONE 🔥 */}
              <div className="monetization-zone mt-4 p-3 bg-light rounded border border-warning d-sm-flex align-items-center justify-content-between">
                <div>
                  <h5 className="font-weight-bold text-dark mb-1">Looking for a physical copy or Kindle e-book?</h5>
                  <p className="text-muted small mb-0">Check availability and current market pricing directly via verified channels.</p>
                </div>
                <a
                  href={this.getAmazonAffiliateLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-warning btn-lg font-weight-bold text-dark px-4 mt-3 mt-sm-0 shadow-sm d-inline-block text-decoration-none"
                  style={{ backgroundColor: '#FF9900', border: 'none' }}
                >
                  Buy on Amazon 🛒
                </a>
              </div>
            </Col>
          </Row>
        ) : (
          <div className="text-center my-5">
            <h3>Record Metadata Unreachable</h3>
            <p className="text-muted">We could not retrieve deep detailed schema information for this text entry.</p>
          </div>
        )}
      </Container>
    );
  }
}

export default BooksInfoBox;