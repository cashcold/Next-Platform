import React, { Component } from 'react';
import './DisplayDrinksInfor.css';
import axios from 'axios';
import {
  EmailShareButton,
  FacebookShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  FacebookMessengerIcon,
  HatenaIcon,
  InstapaperIcon,
  LineIcon,
  LinkedinIcon,
  LivejournalIcon,
  MailruIcon,
  OKIcon,
  PinterestIcon,
  PocketIcon,
  RedditIcon,
  TelegramIcon,
  TumblrIcon,
  TwitterIcon,
  ViberIcon,
  VKIcon,
  WeiboIcon,
  WhatsappIcon,
  WorkplaceIcon
} from "react-share";

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
      <div className='main_home_cocktail'>
        
      <section className="btc_shark_section">
                <div className="btc_shark">
                    <a target='_blank' href='tel:+233203808479'>
                    <img className="d-block w-100"  src="https://firebasestorage.googleapis.com/v0/b/nextplatformcashcold.appspot.com/o/BTC%20SHARK%20TRADE%2FbtcSharkTrade.png?alt=media&token=8ef98b95-21f7-4ece-9990-7b1cae48b657"
                        alt="First slide" />
                    </a>
                    
                    </div>
        </section>
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
      <div className="all_icons">
        <h1>Share</h1>
                        <div className='socail_icon'>
                                    <FacebookShareButton  url={window.location.href}>
                                    <FacebookIcon size={40}  round={true} />
                                </FacebookShareButton>
                                <PinterestShareButton  url={window.location.href}>
                                    <PinterestIcon size={40}  round={true} />
                                </PinterestShareButton>
                                <WhatsappShareButton  url={window.location.href}>
                                    <WhatsappIcon size={40}  round={true} />
                                </WhatsappShareButton>
                                <TwitterShareButton  url={window.location.href}>
                                <VKShareButton  url={window.location.href}>
                                    <VKIcon size={40}  round={true} />
                                </VKShareButton>
                                    <TwitterIcon size={40}  round={true} />
                                </TwitterShareButton>
                                <LineShareButton  url={window.location.href}>
                                    <LineIcon size={40}  round={true} />
                                </LineShareButton>
                                <RedditShareButton  url={window.location.href}>
                                    <RedditIcon size={40}  round={true} />
                                </RedditShareButton><br/><br/>
                                
                            </div>
                            <div className='socail_icon'>
                                <br/><br/>
                                <ViberShareButton  url={window.location.href}>
                                    <ViberIcon size={40}  round={true} />
                                </ViberShareButton>
                                <LinkedinShareButton  url={window.location.href}>
                                    <LinkedinIcon size={40}  round={true} />
                                </LinkedinShareButton>
                                <TelegramShareButton  url={window.location.href}>
                                    <TelegramIcon size={40}  round={true} />
                                </TelegramShareButton>
                                <OKShareButton  url={window.location.href}>
                                    <OKIcon size={40}  round={true} />
                                </OKShareButton>
                                <InstapaperShareButton  url={window.location.href}>
                                    <InstapaperIcon size={40}  round={true} />
                                </InstapaperShareButton>
                            
                            </div>
                            <div className='socail_icon'>
                                <br/><br/>
                            
                                <MailruShareButton  url={window.location.href}>
                                    <MailruIcon size={40}  round={true} />
                                </MailruShareButton>
                                <TumblrShareButton  url={window.location.href}>
                                    <TumblrIcon size={40}  round={true} />
                                </TumblrShareButton>
                                <PocketShareButton  url={window.location.href}>
                                    <PocketIcon size={40}  round={true} />
                                </PocketShareButton>
                                < WorkplaceShareButton  url={window.location.href}>
                                    <WorkplaceIcon size={40}  round={true} />
                                </ WorkplaceShareButton>
                                <EmailShareButton  url={window.location.href}>
                                    <EmailIcon size={40}  round={true} />
                                </EmailShareButton>
                            </div>
                    </div>
      </div>
    );
  }
}

export default CocktailDetails;
