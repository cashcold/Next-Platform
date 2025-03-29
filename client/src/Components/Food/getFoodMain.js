import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './getFoodMain.css';

class GetFoodMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            theMealFood_db: [],
            searchResultFood: '',
            searchResultFood_api: [],
            searchResultFoodAll: '',
            Check_searchResultFoodAll: [],
            theMealFood_db_landing: [],
            theMealFood_db_landing_Cake: [],
            offset: 0,
            data: [],
            perPage: 12,
            currentPage: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.handlePageClick = this.handlePageClick.bind(this);
    }

    handleChange = input => event => {
        this.setState({ [input]: event.target.value });
    };

    receivedData() {
        axios
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
            .then(res => {
                const data = res.data.meals;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage);
                const postData = slice.map(pd => (
                    <div className="food_box_main_in" key={pd.idMeal}>
                        <div className="food_box" onClick={() => {
                            localStorage.setItem('getFood_api_id', pd.idMeal);
                            localStorage.setItem('getFood_api_strMealThumb', pd.strMealThumb);
                            localStorage.setItem('getFood_api_strMeal', pd.strMeal);
                            window.location = `/food-main-home/Receive-food-order/${pd.strMeal}`;
                        }}>
                            <img src={pd.strMealThumb} alt={pd.strMeal} />
                            <h3 className='styleTextName'>{pd.strMeal}</h3>
                            <a href='#' className='btn btn-warning'>Order Now</a>
                        </div>
                    </div>
                ));

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                    postData
                });
            });
    }

    handlePageClick = (e) => {
        window.scrollTo(0, 0);
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData();
        });
    };

    componentDidMount() {
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
            .then((data) => {
                this.setState({
                    theMealFood_db: data.data.meals
                });
                const stri_the_meal_api = data.data;
                let TheMealApi = JSON.stringify(stri_the_meal_api);
                localStorage.setItem('TheMealApi', TheMealApi);
            });
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52822`)
            .then((data) => {
                this.setState({
                    theMealFood_db_landing: data.data.meals
                });
            });
        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=52900`)
            .then((data) => {
                this.setState({
                    theMealFood_db_landing_Cake: data.data.meals
                });
            });

        this.receivedData();
    }

    render() {
        return (
            <div className='food_main'>
                <Helmet>
                    <base />
                    <title>Next-Platform Food Home</title>
                    <meta name="description" content="React helmet is useful for SEO for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <ToastContainer />
                <section className="landing_1_section">
                    <div className="landing_box_1 box_landing_A">
                        <div className="getFood_hhead land_subtru">
                            <h1>You Can Order Your<br /> <br /><span>{this.state.theMealFood_db_landing.map(data => data.strMeal)}</span></h1>
                        </div>
                        <div className="mobileVision">
                            {this.state.theMealFood_db_landing.map(data => {
                                return (
                                    <div key={data.idMeal}><img src={data.strMealThumb} alt={data.strMeal} /></div>
                                );
                            })}
                        </div>
                        <div className="promoCode">
                            <h2>Use Your Promo Code To Get <span>65% Discount Now</span></h2>
                        </div>
                        {this.state.theMealFood_db_landing.map(data => {
                            return (
                                <div key={data.idMeal}>
                                    <h2 className='span_color'>Ingredient</h2>
                                    <ul>
                                        <li><h5>{data.strIngredient1}</h5></li>
                                        <li><h5>{data.strIngredient2}</h5></li>
                                        <li><h5>{data.strIngredient3}</h5></li>
                                        <li><h5>{data.strIngredient4}</h5></li>
                                        <li><h5>{data.strIngredient5}</h5></li>
                                        <li><h5>{data.strIngredient6}</h5></li>
                                        <li><h5>{data.strIngredient7}</h5></li>
                                    </ul>
                                </div>
                            );
                        })}
                        <div className='formA'>
                            <form className='myFormControl'>
                                <div className='myForms'>
                                    <select className='selectOption' name="" id="changeData">
                                        <option>SELECT CITY</option>
                                        <option data-value="Accra">Accra</option>
                                        <option data-value="Kumasi">Kumasi</option>
                                        <option data-value="Cape Coast">Cape Coast</option>
                                        <option data-value="Koforidua">Koforidua</option>
                                        <option data-value="Sekondi-Takoradi">Sekondi-Takoradi</option>
                                        <option data-value="Sunyani">Sunyani</option>
                                        <option data-value="Tamale">Tamale</option>
                                        <option data-value="Bolgatanga">Bolgatanga</option>
                                        <option data-value="Wa">Wa</option>
                                        <option data-value="Ho">Ho</option>
                                    </select>
                                </div>
                                <div className='myForms'>
                                    <input type='text' name='name' placeholder='PHONE' />
                                </div>
                                <a href='' className='btn btn-danger contactBtn'>ORDER NOW</a>
                            </form>
                        </div>
                    </div>
                    <div className="landing_box_2 land_subtru box_landing_B for_web_landing">
                        {this.state.theMealFood_db_landing.map(data => {
                            return (
                                <div key={data.idMeal}><img src={data.strMealThumb} alt={data.strMeal} /></div>
                            );
                        })}
                        <div className='landoverlay'></div>
                    </div>
                </section>
                <section className="branHotel">
                    <div className="banding_hot_box_1">
                        <h4>IN THE KITCHEN WITH AFRICA’S BEST CHEFS</h4>
                        {this.state.theMealFood_db_landing_Cake.map(data => {
                            return (
                                <div className='getDrinksmap getLanding' key={data.idMeal}>
                                    <h1>Get Your <br /><span>{data.strMeal}</span> </h1>
                                    <img src={data.strMealThumb} alt={data.strMeal} />
                                    <h5>GHC 10.00</h5>
                                    <div className='formA'>
                                        <form className='myFormControl'>
                                            <div className='myForms'>
                                                <select className='selectOption' name="" id="changeData">
                                                    <option>SELECT CITY</option>
                                                    <option data-value="Accra">Accra</option>
                                                    <option data-value="Kumasi">Kumasi</option>
                                                    <option data-value="Cape Coast">Cape Coast</option>
                                                    <option data-value="Koforidua">Koforidua</option>
                                                    <option data-value="Sekondi-Takoradi">Sekondi-Takoradi</option>
                                                    <option data-value="Sunyani">Sunyani</option>
                                                    <option data-value="Tamale">Tamale</option>
                                                    <option data-value="Bolgatanga">Bolgatanga</option>
                                                    <option data-value="Wa">Wa</option>
                                                    <option data-value="Ho">Ho</option>
                                                </select>
                                            </div>
                                            <div className='myForms'>
                                                <input type='text' name='name' placeholder='PHONE' />
                                            </div>
                                            <a href='' className='btn btn-danger contactBtn'>ORDER NOW</a>
                                        </form>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                    <div className="banding_hot_box_2">
                        <img src={require('../../AllInOne/hotel/travis-grossen-AXDTTuh-0UI-unsplash.jpg')} alt="Hotel" />
                    </div>
                </section>
                <section className="inforFlow">
                    <div className="flow_client">
                        <h1>Our Food Are Delivered by Top Neighborhood Restaurants</h1>
                    </div>
                </section>
                <section className="foodDataSection">
                    {this.state.postData}
                </section>
                <section className='check_pagination'>
                    <ReactPaginate
                        previousLabel={"prev"}
                        nextLabel={"next"}
                        breakLabel={"..."}
                        breakClassName={"break-me"}
                        pageCount={this.state.pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={this.handlePageClick}
                        containerClassName={"pagination"}
                        subContainerClassName={"pages pagination"}
                        activeClassName={"active"} />
                </section>
            </div>
        );
    }
}

export default GetFoodMain;