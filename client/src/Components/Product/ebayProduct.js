import React, { Component } from 'react';
import './ebayProduct.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'

class EbayMainProduct extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            ebay_product_check: [],
         }
         this.handleChange = this.handleChange.bind(this)
    }
     handleChange = input => (event)=>{
       this.setState({[input]: event.target.value})
   }
    componentDidMount(){
        // axios.get('/users/ebay_produck_ckeck',)
        // .then(response => {
        //     this.setState({
        //     ebay_product_check: response.data[0].searchResult[0].item
        //     })
        //     const ebay = JSON.stringify(this.state.ebay_product_check)
        //     localStorage.setItem('ebay_product_check', ebay)

        // })
    }
    render() { 
        console.log(this.state.ebay_product_check)
        return ( 
            <div className='ebayMain_Css'>
                <section className="ebay_section_1">
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/125820a8-064d-413d-a2f7-18a949b33806"><img src="https://kol.jumia.com/banners/u9bRTR8VkARvQnShWOVcxhF8m7Qe1ZmgyCUi2H18.png" alt="Deal of the day"/></a>
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/30b5299f-ac96-42b8-973b-46d1fa73d8e1"><img src="https://kol.jumia.com/banners/tpGd5bXW49b01TkUq1IGkx4rYhSIj3QQrLpEXhVS.jpeg" alt="Grocery Category"/></a>
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/0a677c8c-91f4-4c4e-9603-3213b63d455c"><img src="https://kol.jumia.com/banners/4GHAvEBaaIPyAbmMcODbHpnF5Vrp5rwcTgYpn3WU.jpeg" alt="TVs and Audio Category"/></a>
                    <a  target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/08a0f4fb-5353-433b-a085-13e1429409ab"><img src="https://kol.jumia.com/banners/AALElDRZyBhk3jseWpzIKE7wEQOQlh2E85P20ZAE.jpeg" alt="Perfumes Category"/></a>
                    <a  target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/0d37bf9b-6444-4e86-8d28-a971dbe9ca6b"><img src="https://kol.jumia.com/banners/0J4eeN8fDxsZRcVcoOGp4idNy6bpSNUKJrQN7Gig.jpeg" alt="Computing Category"/></a>
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/03446ba3-dbcd-4729-92db-2ceb79d91578"><img src="https://kol.jumia.com/banners/kIuoQexhsGczY0rkem6wBY6HWEW5SxbUqrcDNiTG.jpeg" alt="Sport & Fitness Category"/></a>
                </section>
            </div>
         );
    }
}
 
export default EbayMainProduct;