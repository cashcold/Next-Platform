import React, { Component } from 'react';
import axios from 'axios';

class CocktailDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cocktail: null,
      loading: true,
    };
  }

  componentDidMount() {
    this.fetchCocktailDetails();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.match.params.id !== this.props.match.params.id) {
      this.fetchCocktailDetails();
    }
  }

  fetchCocktailDetails = async () => {
    try {
      // Extract the cocktail ID from the TMDB_id query parameter
      const urlParams = new URLSearchParams(window.location.search);
      const tmdbId = urlParams.get('TMDB_id');

      // Make a request to the cocktail API using the extracted ID
      if (tmdbId) {
        const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${tmdbId}`);
        const cocktail = response.data.drinks[0];
        console.log("Cocktail details:", cocktail);
        this.setState({ cocktail, loading: false });
      }
    } catch (error) {
      console.error('Error fetching cocktail details:', error.message);
      this.setState({ loading: false }); // Set loading to false even on error
    }
  };

  render() {
    console.log("State:", this.state);

    const { cocktail, loading } = this.state;

    return (
      <div className="cocktail-details">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <h1>{cocktail.strDrink}</h1>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />

            <div>
              <strong>Alcoholic Content:</strong> {cocktail.strAlcoholic}
            </div>

            <div>
              <strong>Glass Type:</strong> {cocktail.strGlass}
            </div>

            <div>
              <strong>Instructions:</strong> {cocktail.strInstructions}
            </div>

            <div>
              <strong>Ingredients:</strong>
              <ul>
                {Array.from({ length: 15 }, (_, index) => index + 1).map((index) => {
                  const ingredient = cocktail[`strIngredient${index}`];
                  const measure = cocktail[`strMeasure${index}`];

                  if (ingredient && measure) {
                    return <li key={index}>{`${measure} ${ingredient}`}</li>;
                  }

                  return null;
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default CocktailDetails;
