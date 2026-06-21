import React, { Component } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Button, Form, FormControl, Container, Row, Col, Spinner } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';
import queryString from 'query-string';
import './books.css';

class BooksMainBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      searchQuery: '',
      activeQuery: 'story',
      pageCount: 0,
      currentPage: 1,
      loading: false,
    };
  }

  componentDidMount() {
    this.fetchBooks(this.state.activeQuery, this.state.currentPage);
  }

  fetchBooks = async (query, page) => {
    this.setState({ loading: true });
    try {
      const response = await axios.get(
        `https://openlibrary.org/search.json?q=${encodeURIComponent(query)}&page=${page}`
      );
      const totalDocs = response.data.numFound || 0;
      
      this.setState({
        books: response.data.docs || [],
        // Limit page maximum to 50 pages for clean pagination performance
        pageCount: Math.min(Math.ceil(totalDocs / 100), 50), 
      });
    } catch (error) {
      toast.error("Error fetching books. Please try again.");
    } finally {
      this.setState({ loading: false });
    }
  };

  handleSearch = (event) => {
    event.preventDefault();
    const { searchQuery } = this.state;
    if (!searchQuery.trim()) return;

    this.setState({ activeQuery: searchQuery, currentPage: 1 }, () => {
      this.fetchBooks(searchQuery, 1);
    });
  };

  handlePageClick = (data) => {
    const selectedPage = data.selected + 1;
    this.setState({ currentPage: selectedPage }, () => {
      this.fetchBooks(this.state.activeQuery, selectedPage);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  };

  handleInputChange = (event) => {
    this.setState({ searchQuery: event.target.value });
  };

  handleCardNavigation = (book, author) => {
    const params = queryString.stringify({
      title: book.title,
      author: author,
      cover: book.cover_i || '',
    });
    
    // Smooth navigation structure matching standard router patterns
    window.location.href = `/Next-Platform-Book-info/${encodeURIComponent(book.title)}?${params}`;
  };

  render() {
    const { books, searchQuery, pageCount, currentPage, loading } = this.state;

    return (
      <Container className="books-container my-4">
        <Helmet>
          <title>Books Hub | Next Platform Live</title>
        </Helmet>

        <h1 className="text-center mb-4 font-weight-bold">Welcome To Books Shop for Free</h1>

        <Form className="search-form d-flex mb-4 gap-2" onSubmit={this.handleSearch}>
          <FormControl
            type="text"
            placeholder="Search for books, authors..."
            value={searchQuery}
            onChange={this.handleInputChange}
            className="me-2"
          />
          <Button variant="success" type="submit">Search</Button>
        </Form>

        {/* Promotion Ad Banner Space */}
        <div className="promo-banner mb-4">
          <img
            className="d-block w-100 rounded shadow-sm"
            src="https://firebasestorage.googleapis.com/v0/b/the-christ-d3d67.appspot.com/o/nextplatform%2FBUY%20BITCOIN.jpg?alt=media&token=95e601b7-808f-412f-8360-e8b7eb025798"
            alt="Promotional Advertisement"
          />
        </div>

        {loading ? (
          <div className="d-flex justify-content-center my-5">
            <Spinner animation="border" variant="success" size="xl" />
          </div>
        ) : (
          <Row className="g-4">
            {books.map((book) => {
              const author = book.author_name ? book.author_name[0] : 'Unknown Author';
              const coverUrl = book.cover_i
                ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
                : 'https://via.placeholder.com/180x250?text=No+Cover';

              return (
                <Col xs={12} sm={6} md={4} lg={3} key={book.key}>
                  <Card className="h-100 book-card shadow-sm border-0">
                    <div className="card-img-container" style={{ height: '280px', overflow: 'hidden' }}>
                      <Card.Img
                        variant="top"
                        src={coverUrl}
                        alt={book.title}
                        style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                      />
                    </div>
                    <Card.Body className="d-flex flex-column justify-content-between">
                      <div>
                        <Card.Title className="h6 text-truncate" title={book.title}>
                          {book.title}
                        </Card.Title>
                        <Card.Text className="text-muted small text-truncate">{author}</Card.Text>
                      </div>

                      <Button
                        variant="outline-primary"
                        className="w-100 mt-3"
                        onClick={() => this.handleCardNavigation(book, author)}
                      >
                        More Info
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}
          </Row>
        )}

        {books.length > 0 && (
          <div className="d-flex justify-content-center mt-5">
            <ReactPaginate
              previousLabel={'Previous'}
              nextLabel={'Next'}
              breakLabel={'...'}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={3}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              pageClassName={'page-item'}
              pageLinkClassName={'page-link'}
              previousClassName={'page-item'}
              previousLinkClassName={'page-link'}
              nextClassName={'page-item'}
              nextLinkClassName={'page-link'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              activeClassName={'active'}
              forcePage={currentPage - 1}
            />
          </div>
        )}
      </Container>
    );
  }
}

export default BooksMainBox;