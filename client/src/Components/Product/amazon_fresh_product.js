import React, { Component } from 'react';
import './amazon_fresh_product.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
import {Hm_api} from '../Api/Hm_API'



class AmazonFreshProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            amazon_fresh_product: [],
            amazon_hearPhone_product: [],
            offset: 0,
            data: [],
            perPage: 14,
            currentPage: 0,
            loading: []
         }
         this.handleChange = this.handleChange.bind(this)
         this.handlePageClick = this.handlePageClick.bind(this);
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
   handleChange = input => (event)=>{
       this.setState({[input]: event.target.value})
   }
   receivedData() {
       axios.get('https://api.rainforestapi.com/request?api_key=595AE51AA7404FB6BE2DE7480E1EE2A6&type=search&search_term=blue&amazon_domain=amazon.com&category_id=amazonfresh')
           .then(data => {
            data = data.data.search_results
               console.log(data)
               const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
               const postData = slice.map(pd => <React.Fragment>
                   <div className="food_box_main_in">
                       <div className="food_box" onClick={()=>{
                           //   localStorage.setItem('scoreBat_matchviewUrl',pd.matchviewUrl)
                           // window.location =`/${pd.matchviewUrl}`
                       }}>
                           {/* <img src={pd.strMealThumb}/>
                           <h3 className='styleTextName'>{pd.strMeal}</h3>
                           <a href='#' className='btn btn-warning'>Order Now</a> */}
                             <Card classMame='card_sport' style={{backgroundColor: "black", color: 'white', padding: '2em 0em'}}>
                                           
                                   <Card.Img src={pd.image} />
                                   <Card.Body>
                                       <Card.Text>
                                       {/* <p>{pd.title}</p> */}
                                       </Card.Text>
                                       <a href='#' className='btn btn-warning'> Watch <i class="fas fa-arrow-circle-right"></i></a>
                                       {/* <a href={pd.matchviewUrl} className='btn btn-warning'> Watch <i class="fas fa-arrow-circle-right"></i></a> */}
                                   </Card.Body>
                               </Card>
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

    componentDidMount(){
        this.receivedData()

const params = {
  api_key: "595AE51AA7404FB6BE2DE7480E1EE2A6",
  type: "search",
  amazon_domain: "amazon.com",
  offer_id: "A2NDNAPHQ3UDKH",
  search_term: "headphones"
}

axios.get('https://api.rainforestapi.com/request', { params })
  .then(response => {
      this.setState({
        amazon_hearPhone_product: response.data.search_results
      })

  }).catch(error => {
    // catch and print the error
    // console.log(error);
  })

    }
    render() { 
        // console.log(this.state.amazon_hearPhone_product)

        return ( 
            <div className='productMain'>
                <section className="product_section_1">
                    <div className="product_row_1">
                        <h1>Amazon Product</h1>
                        <section className="ScoreBatVideoAPI_DataSection">
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
                    </div>
                </section>
            </div>
         );
    }
}
 
export default AmazonFreshProduct;