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
      imageUrl: '',
      drinkName: '',
      strCategory: '',
      strAlcoholic: '',
      strGlass: '',
      Barracuda: '',
      Apple_Berry: '',
    };
  }

  componentDidMount() {
    
    
     // Fetch data from the API using Axios
     axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Barracuda')
     .then(response => {
       // Extract the image URL and drink name from the API response
       const Barracuda = response.data.drinks[0].strDrinkThumb;

       // Update the component state with the new data
       this.setState({ Barracuda });
     })
     .catch(error => console.error('Error fetching data:', error));

     
     axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=Apple Berry Smoothie')
     .then(response => {
       // Extract the image URL and drink name from the API response
       const Apple_Berry = response.data.drinks[0].strDrinkThumb;

       // Update the component state with the new data
       this.setState({ Apple_Berry });
     })
     .catch(error => console.error('Error fetching data:', error));

    // Fetch data initially
    this.fetchData();
    this.fetchNonAlcoholicDrinks();

  
    this.interval = setInterval(() => {
      this.fetchData();
    }, 6000); 
  }

  componentWillUnmount() {



    // Clear the interval when the component is unmounted
    clearInterval(this.interval);
  }

  fetchData = () => {
    // Fetch data from the API using Axios
    axios.get('https://www.thecocktaildb.com/api/json/v1/1/random.php')
      .then(response => {
        // Extract the image URL and drink name from the API response
        const imageUrl = response.data.drinks[0].strDrinkThumb;
        const drinkName = response.data.drinks[0].strDrink;
        const strCategory = response.data.drinks[0].strCategory;
        const strAlcoholic = response.data.drinks[0].strAlcoholic;
        const strGlass = response.data.drinks[0].strGlass;

        // Update the component state with the new data
        this.setState({ imageUrl, drinkName, strCategory, strAlcoholic, strGlass });
      })
      .catch(error => console.error('Error fetching data:', error));
  };

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
    const { drinks, currentPage, itemsPerPage, imageUrl, drinkName, strCategory, strAlcoholic, strGlass, Barracuda, Apple_Berry } = this.state;
    const offset = currentPage * itemsPerPage;
    const currentItems = drinks.slice(offset, offset + itemsPerPage);

    return (
      <div className='LandingPageDrinks_app__main'>
        <Helmet>
          <base />
          <title>Next-Platform Drinks Home</title>
          <meta name="description" content="React Helmet is useful for SEO for dynamically changing head information" />
          <link rel="canonical" href="somelink" />
        </Helmet>
        <section className='promoteDrinks_main'>
          <div className='drinksPromote_box_1'>
          <div className="image-container">
              <img src={Barracuda} alt='picture' />
            </div>
          </div>
          <div className='drinksPromote_box_2'>
            <h4>🌟 Welcome to Next-Platform Drinks! 🍹 Where Every Sip is a Celebration! 🌈 Indulge in a world of delightful non-alcoholic beverages crafted just for you. Join our community and discover the perfect blend of taste, health, and social joy. 🥳✨ Cheers to endless flavors and good times! 🎉 #NextPlatformDrinks #CheersToGoodTimes 🍸🌺</h4>
          </div>
          <div className='drinksPromote_box_3'>
          <div className="image-container">
              <img src={Apple_Berry} alt='picture' />
            </div>
          </div>
        </section>
        <section className='search-containe-main'>
          <div className="search-container">
          <input type="text" id="searchInput" placeholder="Search for drinks..."/>
          <button id="searchButton">Search</button>
        </div>
        </section>
        <section className='receivedRandomImage'>
          <div className="main-container">
            <div className="image-container">
              <img src={imageUrl} alt={drinkName} />
            </div>
            <div className="content-container">
              <h1>{drinkName}</h1>
              <h4>{strCategory}</h4>
              <p>{strAlcoholic}</p>
              <span>{strGlass}</span>
            </div>
          </div>
        </section>
        <section ClassName='popUpDrink'>
            <div className='freeDrinkPoP'>
             <section className='socialMediaContent'>
                <h2>Follow Us on Social Media</h2>
                <p>Stay updated with the latest drinks and promotions. Follow us on social media for exciting content and giveaways!</p>
              </section>
              <section className='freeDrinkPrompt'>
                <h2>Get a Free Drink!</h2>
                <p>Enter your phone number to receive a coupon for a free drink at Next-Platform Ofline Stores.</p>
                <label htmlFor="phoneNumber">Phone Number:</label>
                <input
                  type="tel"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Enter your phone number"
                  value={this.state.phoneNumber}
                  onChange={this.handleChange}
                />
                <button onClick={this.handleSubmit}>Get Free Drink</button>
              </section>
          </div>
        </section>
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
