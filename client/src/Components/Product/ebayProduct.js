import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
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
            <Helmet>
            <base />
            <title>Next-Platform Product Main</title>
            <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
            <link rel="canonical" href="somelink" />
        </Helmet>
                <section className="ebay_section_1">
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/30b5299f-ac96-42b8-973b-46d1fa73d8e1"><img src="https://kol.jumia.com/banners/tpGd5bXW49b01TkUq1IGkx4rYhSIj3QQrLpEXhVS.jpeg" alt="Grocery Category"/></a>
                    <a target='_blank' href='https://www.fbnbankghana.com/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/273177044_6264535532733_865087272134140109_n.jpg?stp=cp0_dst-jpg_q75_s526x296_spS444&_nc_cat=104&ccb=1-5&_nc_sid=67cdda&_nc_eui2=AeFTCYaiYQPgE3Z37wY3t2HIJXPgQb52coUlc-BBvnZyhbo61N-zD65ELPGKgPb8J2L4NQTW9pb5LPXWpEoiQpIR&_nc_ohc=odHF7u7nd0EAX-EwVlS&_nc_ht=scontent.facc8-1.fna&oh=00_AT_DbOXD276_bu8Zh7edaF8YhUykIHal_wlwB8VDGmkbpg&oe=621B006F'/>
                    <h3>  sign up for our Visa Prepaid Card, load and spend over GH¢500 to stand the chance of winning shopping vouchers worth up to GH¢2000. Call 0302739011 for more details.<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Get Now</h4>
                    </a>
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