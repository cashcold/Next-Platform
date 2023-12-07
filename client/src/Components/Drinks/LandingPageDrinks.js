import React, { Component } from 'react';
import './LandingPageDrinks.css';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Card, Button } from 'react-bootstrap';
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

class LandingPageDrinks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      drinks: [],
      currentPage: 0,
      itemsPerPage: 10,
    };
  }

  componentDidMount() {
    this.fetchNonAlcoholicDrinks();
  }

  fetchNonAlcoholicDrinks = () => {
    const apiEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic';

    axios
      .get(apiEndpoint)
      .then((response) => {
        // The API response may have a different structure, adjust accordingly
        this.setState({ drinks: response.data.drinks });
      })
      .catch((error) => {
        console.error('Error fetching drinks:', error);
        toast.error('Failed to fetch drinks. Please try again.');
      });
  };

  handlePageClick = (data) => {
    const selectedPage = data.selected;
    this.setState({ currentPage: selectedPage });
  };

  render() {
    const { drinks, currentPage, itemsPerPage } = this.state;
    const offset = currentPage * itemsPerPage;
    const currentItems = drinks.slice(offset, offset + itemsPerPage);

    return (
      <div  className='LandingPageDrinks_app__main'>
        <Helmet>
          <base />
          <title>Next-Platform Drinks Home</title>
          <meta name="description" content="React Helmet is useful for SEO for dynamically changing head information" />
          <link rel="canonical" href="somelink" />
        </Helmet>
        <section className='landDrinks_main_nonAlcoholic'>
            <h1>Welcome to the Non-Alcoholic Oasis</h1>
            <p>Indulge in the crisp and invigorating flavors of our non-alcoholic drinks collection. Whether you're looking for a refreshing mocktail for a sunny day or a unique beverage for a special celebration, we've got you covered.</p>
            <p>Our curated selection of non-alcoholic drinks offers a perfect blend of taste and health. Sip on these delightful concoctions without worrying about the alcohol content. Each drink is crafted to tantalize your taste buds and elevate your social experience.</p>
            <h2>Why Choose Non-Alcoholic?</h2>
            <p>1. <strong>Health Conscious:</strong> Enjoy the goodness of fresh ingredients without the effects of alcohol.</p>
            <p>2. <strong>Socially Inclusive:</strong> Everyone can join the party without restrictions. Perfect for gatherings with friends and family.</p>
            <p>3. <strong>Endless Variety:</strong> From fruity punches to herbal infusions, our non-alcoholic drinks cater to diverse palates.</p>
            <h2>Explore Our Collection</h2>
            <p>Take a journey through our enticing non-alcoholic drink options. Each sip is a celebration of flavor and a toast to good times. Click, explore, and treat yourself to a world of delightful beverages.</p>
            <Button variant="primary">Discover Non-Alcoholic Drinks</Button>
        </section>
        <section className="LandDrinksPage_main">
        
          <section className="landDrinks_main__1">
            <div className="drink-cards">
              {currentItems.map((drink) => (
                <Card key={drink.idDrink} className="drink-card">
                  <Card.Img variant="top" src={drink.strDrinkThumb} alt={drink.strDrink} className="drink-image" />
                  <Card.Body>
                    <Card.Title>{drink.strDrink}</Card.Title>
                    <Card.Text>{drink.strInstructions}</Card.Text>
                    <Button variant="primary" className="learn-more-btn">
                      Learn More
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>

            <ReactPaginate
              previousLabel={'previous'}
              nextLabel={'next'}
              breakLabel={'...'}
              breakClassName={'break-me'}
              pageCount={Math.ceil(drinks.length / itemsPerPage)}
              marginPagesDisplayed={2}
              pageRangeDisplayed={5}
              onPageChange={this.handlePageClick}
              containerClassName={'pagination'}
              subContainerClassName={'pages pagination'}
              activeClassName={'active'}
            />
          </section>
        </section>
      </div>
    );
  }
}

export default LandingPageDrinks;
