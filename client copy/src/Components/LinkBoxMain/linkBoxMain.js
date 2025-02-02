import React, { Component } from 'react';
import './style.css'
import { Helmet } from 'react-helmet';
import axios from 'axios'
import LinkBoxInfo from '../LinkoxInfo/linkBoxInfo';

class LinkBoxMainBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        }
    }

    
    componentDidMount(){

       
       
    }
    render() { 
        return ( 
            <div className='watch_next_main'>
                 <Helmet>
                    <base />
                    <title>Next-Platform LinkBoxMainBox</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>

              <section className='linkBox_info_main_box'>
                <div className="linkBoxFlow_box_1 linkbox_flow_A">
                    <LinkBoxInfo/>
                </div>
                <div className="linkBoxFlow_box_1 linkbox_flow_B"></div>
              </section>
            </div>
         );
    }
}
 
export default LinkBoxMainBox;