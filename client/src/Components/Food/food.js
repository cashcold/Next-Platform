import React, { Component } from 'react';
import './style.css' 
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';
import GetFoodMain from './getFoodMain';

class FoodMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='getFoodMain'>
                <section className="getfood_section_1">
                    <GetFoodMain/>
                </section>
            </div>
         );
    }
}
 
export default FoodMain;