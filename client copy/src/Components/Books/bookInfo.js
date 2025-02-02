import React, { Component } from 'react';
import './bookInfo.css';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { toast } from 'react-toastify';

class BooksInfoBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookDetails: null,
            loading: true,
        };
    }

    componentDidMount() {
        const Book_Title = localStorage.getItem('Book_Title');
        const Book_Author_name = localStorage.getItem('Book_Author_name');

        if (Book_Title && Book_Author_name) {
            this.fetchBookDetails(Book_Title, Book_Author_name);
        } else {
            toast.error("Book details not found");
            this.setState({ loading: false });
        }
    }

    fetchBookDetails = (title, author) => {
        axios.get(`https://openlibrary.org/search.json?title=${title}&author=${author}`)
            .then(response => {
                const book = response.data.docs[0]; // Assuming the first result is the correct one
                this.setState({ bookDetails: book, loading: false });
            })
            .catch(error => {
                toast.error("Error fetching book details");
                this.setState({ loading: false });
            });
    };

    render() {
        const { bookDetails, loading } = this.state;

        return (
            <div className="bookInfoMain">
                <Helmet>
                    <title>Book Info</title>
                </Helmet>
                {loading ? (
                    <p className="loading">Loading book details...</p>
                ) : bookDetails ? (
                    <div className="book-details">
                        <h1>{bookDetails.title}</h1>
                        <p><strong>Author:</strong> {bookDetails.author_name && bookDetails.author_name.join(', ')}</p>
                        <p><strong>First Publish Year:</strong> {bookDetails.first_publish_year}</p>
                        <p><strong>Publisher:</strong> {bookDetails.publisher && bookDetails.publisher.join(', ')}</p>
                        <p><strong>ISBN:</strong> {bookDetails.isbn && bookDetails.isbn.join(', ')}</p>
                        <p><strong>Publish Date:</strong> {bookDetails.publish_date && bookDetails.publish_date.join(', ')}</p>
                        {bookDetails.cover_i && (
                            <img className="book-cover" src={`https://covers.openlibrary.org/b/id/${bookDetails.cover_i}-L.jpg`} alt={bookDetails.title} />
                        )}
                    </div>
                ) : (
                    <p className="no-details">No book details found.</p>
                )}
            </div>
        );
    }
}

export default BooksInfoBox;
