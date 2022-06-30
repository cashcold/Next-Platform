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
            img: '',
            home_url: '',
        }
    }

    
    componentDidMount(){

        const title = localStorage.getItem('linkBox_api_title')
        const description = localStorage.getItem('linkBox_api_description')
        const on_image = localStorage.getItem('linkBox_api_social_on_image')
        const img = localStorage.getItem('linkBox_api_img')
        const home_url = localStorage.getItem('home_url')
        
        
        this.setState({
            title,description,on_image,img,home_url
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
                  <img src={`${this.state.home_url}${this.state.img}`} alt='pic'/>
                    <h1>{this.state.title}</h1>
                    <h4>{this.state.description}</h4>
                  </div>
              </section>
            </div>
         );
    }
}
 
export default LinkBoxInfo;