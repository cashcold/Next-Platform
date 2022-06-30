import React, { Component } from 'react';
import './style.css'
import { Helmet } from 'react-helmet';
import axios from 'axios'

class LinkBoxInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            description: '',
            on_image: '',
        }
    }

    
    componentDidMount(){

        const title = localStorage.getItem('link_box_title')
        const description = localStorage.getItem('link_box_description')
        const on_image = localStorage.getItem('link_box_on_image')
        
        
        this.setState({
            title,description,on_image
        })
       
    }
    render() { 
        return ( 
            <div className='watch_next_main'>
                 <Helmet>
                    <base />
                    <title>Next-Platform LinkBoxInfo</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>

              <section className='linkBox_info_main'>
                  <div>
                  <img src={`${this.state.on_image}`} alt='pic'/>
                    <h1>{this.state.title}</h1>
                    <h4>{this.state.description}</h4>
                  </div>
              </section>
            </div>
         );
    }
}
 
export default LinkBoxInfo;