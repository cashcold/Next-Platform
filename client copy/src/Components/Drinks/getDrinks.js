import React, { Component } from 'react';
import './getDrinks.js' 
import axios from 'axios'

import { toast } from 'react-toastify';
import {Card,Button} from 'react-bootstrap'
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet'; 

class GetDrinksMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            getDrinksMain: [],
            searchDrinksResuit: '',
            searchDrinksResuit_api: [],
            offset: 0,
            data: [],
            perPage: 12,
            currentPage: 0
         }


         this.handleChange = this.handleChange.bind(this)
         this.handlePageClick = this.handlePageClick.bind(this);
       
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    receivedData() {
        axios
            .get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`)
            .then(res => {

                const data = res.data.drinks;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                    <div className="food_box_main_in">
                        <div className="food_box" onClick={()=>{
                            toast.dark(<Card>
                                <Card.Header as="h5">Meal Order</Card.Header>
                                <Card.Body>
                                    <Card.Title>New ORDER</Card.Title>
                                    <Card.Text>
                                    <img src={pd.strDrinkThumb}/>
                                <h3>{pd.strDrink}</h3>
                                    </Card.Text>
                                    {/* <Button variant="primary">Make Order</Button> */}
                                </Card.Body>
                                </Card>, {
                                position: "top-center",
                                autoClose: false,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                })
                        }}>
                            <img src={pd.strDrinkThumb}/>
                            <h3>{pd.strDrink}</h3>
                            <a href='#' className='btn btn-warning'>Learn To Do <br/><span>For Free</span></a>
                        </div>
                    </div>
                  
                </React.Fragment>)
                // const postData = slice.map(pd => <React.Fragment>
                //     <h3>{pd.strMeal}</h3>
                //  <img src={pd.strMealThumb}/>
                // </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            });
    }
    handlePageClick = (e) => {
        window.scrollTo(0, 0)
       const selectedPage = e.selected;
       const offset = selectedPage * this.state.perPage;

       this.setState({
           currentPage: selectedPage,
           offset: offset
       }, () => {
           this.receivedData()
       });

   };

    componentDidMount(){
       axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic`).then(data =>this.setState({
        getDrinksMain: data.data.drinks
       }))

        this.receivedData()
      
    }
    render() { 
         console.log(this.state.searchDrinksResuit)
         console.log(this.state.searchDrinksResuit_api)
        return ( 
            <div>
                 <Helmet>
                    <base />
                    <title>Next-Platform Drinks Home</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <section className="search_bar_main">
                    <h3>Search</h3>
                    <input className='SearcInput' type='search' name='searchDrinksResuit'  onChange={this.handleChange('searchDrinksResuit')}/>
                    <h1>{this.state.searchDrinksResuit}</h1>
                        <i class="fa fa-search fa-2x" aria-hidden="true" onClick={()=>{
                             axios.post(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${this.state.searchDrinksResuit}`).then(data =>this.setState({
                                searchDrinksResuit_api: data.data.drinks
                               }))
                        }}></i>
                    {this.state.searchDrinksResuit_api.map(data => {
                        return(
                            <div className='getDrinksmap'>
                                <h1>{data.strDrink}</h1>
                                <img src={data.strDrinkThumb}/>
                            </div>
                        )
                    })}
                        
                    </section>
                <section className="foodDataSection">
                  {this.state.postData}
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
                    activeClassName={"active"}/>
                </section>
                 </section>
                <section className="getDrinksSection_1">
                    <h1></h1>
                    
                    {/* <section className="search_section">
                        
                    <h1>{this.state.searchDrinksResuit}</h1>
                    {this.state.searchDrinksResuit_api.map(data => {
                        return(
                            <div className=''>
                                <h1>{data.strDrink}</h1>
                                <img src={data.strDrinkThumb}/>
                            </div>
                        )
                    })}
                    </section> */}
                    {/* <section className="foodDataSection gerDrink_main">
                    <h1>23 Classic Drinks to Order at a Bar - Town & Country Locate You<br/></h1>
                    {this.state.getDrinksMain.map(data => {
                        return(
                            <div className='food_box_main_in'>
                                <div className='food_box'>
                                    <img src={data.strDrinkThumb}/>
                                    <h1>{data.strDrink}</h1>
                                </div>
                            </div>

                              
                        )
                    })}
                    </section> */}
                  
                </section>
            </div>
         );
    }
}
 
export default GetDrinksMain;