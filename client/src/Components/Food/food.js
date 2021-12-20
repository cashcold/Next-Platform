import React, { Component } from 'react';
import './style.css' 
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';

class FoodMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            theMealFood_db: [],
            searchResultFood: '',
            searchResultFoodAll: ''
         }
         this.handleChange = this.handleChange.bind(this)
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    componentDidMount(){
        var options = {
            method: 'GET',
            url: 'https://imdb8.p.rapidapi.com/title/find',
            params: {q: 'game of thr'},
            headers: {
              'x-rapidapi-host': 'imdb8.p.rapidapi.com',
              'x-rapidapi-key': 'eb58aea156msh88be6213c1aaeddp133cc9jsn5e4283eb9196'
            }
          };
          
          axios.request(options).then(function (response) {
              console.log(response.data);
          }).catch(function (error) {
              console.error(error);
          });
        
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
        .then((data)=>{
            this.setState({
                theMealFood_db: data.data.meals
            })
            const stri_the_meal_api = data.data
            let TheMealApi = JSON.stringify(stri_the_meal_api)
            localStorage.setItem('TheMealApi',TheMealApi)
        })
      
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
        .then((data)=>{
            console.log("other from ",data.data.meals)
            this.setState({
                searchResultFoodAll: data.data
            })
        })
      
    }
    render() { 
        // console.log('this is now new ' , this.state.theMealFood_db)
        // console.log(this.state.theMealFood_db.map(data => data.strMeal))
        console.log(this.state.searchResultFood)
        return ( 
            <div className='food_main'>
                  <Helmet>
                    <base />
                    <title>Next-Platform Food Home</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <section className="foodMain_section_1">
                    <h1>FOOD</h1>
                      <input className='SearcInput' type='search' name='searchResult'  onChange={this.handleChange('searchResultFood')}/>
                  
                </section>
                <section className="dsiplay_the_meal_api">
                {this.state.theMealFood_db.map(data => {
                        return(
                            <div className='data_TheMeal'>
                                <h3>{data.strMeal}</h3>
                                <img src={data.strMealThumb}/>
                            </div>
                        )
                    })}
                </section>
            </div>
         );
    }
}
 
export default FoodMain;