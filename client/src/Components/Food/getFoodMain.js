import React, { Component } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import { Helmet } from 'react-helmet';
import './getFoodMain.css'
class GetFoodMain extends Component {
   
    constructor(props) {
        super(props);
        this.state = { 
            theMealFood_db: [],
            searchResultFood: '',
            searchResultFoodAll: '',
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
            .get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
            .then(res => {

                const data = res.data.meals;
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                    <div className="food_box_main_in">
                        <div className="food_box" onClick={()=>{
                            toast.dark(<Card>
                                <Card.Header as="h5">Meal Order</Card.Header>
                                <Card.Body>
                                    <Card.Title>New ORDER</Card.Title>
                                    <Card.Text>
                                    <img src={pd.strMealThumb}/>
                                    <h3>{pd.strMeal}</h3>
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
                            <img src={pd.strMealThumb}/>
                            <h3>{pd.strMeal}</h3>
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
        
        
        
        axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
        .then((data)=>{
            this.setState({
                theMealFood_db: data.data.meals
            })
            const stri_the_meal_api = data.data
            let TheMealApi = JSON.stringify(stri_the_meal_api)
            localStorage.setItem('TheMealApi',TheMealApi)
        })
      
        // axios.get(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${this.state.searchResultFood}`)
        // .then((data)=>{
        //     console.log("other from ",data.data.meals)
        //     this.setState({
        //         searchResultFoodAll: data.data
        //     })
        // })
        this.receivedData()
      
    }
    render() { 
        // console.log('this is now new ' , this.state.theMealFood_db)
        // console.log(this.state.theMealFood_db.map(data => data.strMeal))
        return ( 
            <div className='food_main'>
                  <Helmet>
                    <base />
                    <title>Next-Platform Food Home</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <ToastContainer/>
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
                    activeClassName={"active"}/>
                </section>
                <section className="foodMain_section_1">
                    <h1>FOOD</h1>
                      <input className='SearcInput' type='search' name='searchResult'  onChange={this.handleChange('searchResultFood')}/>
                  
                </section>
            </div>
         );
    }
}
 
export default GetFoodMain;