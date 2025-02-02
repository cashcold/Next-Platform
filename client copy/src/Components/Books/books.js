import React, { Component } from 'react';
import './books.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Button, Form, FormControl } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

class BooksMainBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            books: [],
            searchQuery: '',
            pageCount: 0,
            currentPage: 0,
        };
    }

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks = (query = 'story', page = 1) => {
        axios.get(`https://openlibrary.org/search.json?q=${query}&page=${page}`)
            .then(response => {
                const books = response.data.docs;
                const pageCount = Math.ceil(response.data.numFound / 100);
                this.setState({ books, pageCount });
            })
            .catch(error => {
                toast.error("Error fetching books");
            });
    };

    handlePageClick = (data) => {
        const selectedPage = data.selected + 1;
        this.setState({ currentPage: selectedPage });
        this.fetchBooks(this.state.searchQuery, selectedPage);
    };

    handleSearch = (event) => {
        event.preventDefault();
        this.fetchBooks(this.state.searchQuery);
    };

    handleInputChange = (event) => {
        this.setState({ searchQuery: event.target.value });
    };

    render() {
        return (
            <div className="books-container">
                <Helmet>
                    <title>Books Shop for Free</title>
                </Helmet>
                <h1>Welcome To Books Shop for Free</h1>
                <Form className="search-form" onSubmit={this.handleSearch}>
                    <FormControl
                        type="text"
                        placeholder="Search for books, movies, authors..."
                        value={this.state.searchQuery}
                        onChange={this.handleInputChange}
                        className="mr-sm-2"
                    />
                    <Button variant="outline-success" type="submit">Search</Button>
                </Form>
                <div className="books-grid">
                    {this.state.books.map(book => (
                        <Card className="book-card" key={book.key}>
                            <Card.Img variant="top" src={`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg`} alt={book.title} />
                            <Card.Body>
                                <Card.Title >{book.title}</Card.Title>
                                <Card.Text>{book.author_name && book.author_name.join(', ')}</Card.Text>
                                <Button variant="primary" 
                                onClick={()=>{
                                    localStorage.setItem('Book_Title', book.title)
                                    localStorage.setItem('Book_Author_name', book.author_name)

                                   const Books_api_ParamsUrl = { 
                                    book_id: book.id,
                                    book_title: book.title,
                                    book_overview: book.author_name,
                                    book_img: book.cover_i
                                }
                                const queryBooksParams = require('query-string')
    
                                const passBooks_api_Params = queryBooksParams.stringify(Books_api_ParamsUrl)
                                
                                window.location =`/Next-Platform-Book-info/${book.title}?${passBooks_api_Params}`
                              
                            }}
                                >More Info</Button>
                            </Card.Body>
                        </Card>
                    ))}
                </div>
                <ReactPaginate
                    previousLabel={'previous'}
                    nextLabel={'next'}
                    breakLabel={'...'}
                    breakClassName={'break-me'}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={'pagination'}
                    subContainerClassName={'pages pagination'}
                    activeClassName={'active'}
                />
            </div>
        );
    }
}

export default BooksMainBox;
