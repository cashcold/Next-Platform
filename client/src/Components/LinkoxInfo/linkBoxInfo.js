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
                    <title>{this.state.title}</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>

              <section className='linkBox_info_main'>
               
                  <div>
                    <img src={`${this.state.img}`} alt='pic'/>
                    {/* <img src={`${this.state.home_url}${this.state.img}`} alt='pic'/> */}
                    <h1>{this.state.title}</h1>
                    <h4>{this.state.description}</h4>
                  </div>
                  <div className="info_social">
                    <div className='socail_icon'>
                        <div class="a2a_kit a2a_kit_size_42 a2a_default_style">
                        <a class="a2a_dd" href="https://www.addtoany.com/share"></a>
                        <a class="a2a_button_facebook"></a>
                        <a class="a2a_button_twitter"></a>
                        <a class="a2a_button_whatsapp"></a>
                        <a class="a2a_button_linkedin"></a>
                        <a class="a2a_button_telegram"></a>
                        <a class="a2a_button_snapchat"></a>
                        <a class="a2a_button_viber"></a>
                        <a class="a2a_button_line"></a>
                        <a class="a2a_button_pinterest"></a>
                        </div>
                    </div>
                </div>
              </section>
            </div>
         );
    }
}
 
export default LinkBoxInfo;