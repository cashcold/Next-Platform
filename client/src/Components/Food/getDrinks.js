import React, { Component } from 'react';
import './getDrinks' 
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet'; 

class GetDrinksMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            getDrinksMain: []
         }


         this.handleChange = this.handleChange.bind(this)
       
    }
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

    componentDidMount(){
        axios
        .get(`www.thecocktaildb.com/api/json/v1/1/search.php?f=a`)
        .then(res => res.json())
        .then(res => this.setState({
            getDrinksMain: res.data
        }))
    }
    render() { 
         console.log('this is now new drinks' , this.state.getDrinksMain)
        return ( 
            <div>
                <section className="getDrinksSection_1">
                    {this.state.getDrinksMain.map(data => {
                        return(
                            <div className=''>
                                <h1>{data.strDrink}</h1>
                            </div>
                        )
                    })}
                </section>
            </div>
         );
    }
}
 
export default GetDrinksMain;