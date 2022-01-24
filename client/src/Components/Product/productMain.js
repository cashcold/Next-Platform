import React, { Component } from 'react';
import './productMain.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'
import {Hm_api} from '../Api/Hm_API'
import AmazonFreshProduct from './amazon_fresh_product';


class ProductMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            Hm_Inew_arriv_cloths: []
         }
    }

    componentDidMount(){



    

       
        
    }
    render() { 

     
        return ( 
            <div className='productMain'>
                <section className="product_section_1">
                    <div className="product_row_1">
                        <h1>Roowwwwwww</h1>
                        <AmazonFreshProduct/>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default ProductMain;