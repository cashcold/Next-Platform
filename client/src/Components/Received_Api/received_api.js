import React, { Component } from 'react';
import './style.css'
import { Helmet } from 'react-helmet'; 
class ReceivedApi extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sport_api_id: '',
            sport_api_head_Text: '',
            sport_api_text: '',
            sport_api_img: '',
            home_url: '',
            sport_api_date: '',
         }
    }
    componentDidMount(){
        
       
       
        

        const sport_api_id = localStorage.getItem('sport_api_id')
        const sport_api_head_Text = localStorage.getItem('sport_api_head_Text')
        const sport_api_text = localStorage.getItem('sport_api_text')
        const sport_api_img = localStorage.getItem('sport_api_img')
        const sport_api_date = localStorage.getItem('sport_api_date')
        const home_url = localStorage.getItem('home_url')

        this.setState({
            sport_api_id,
            sport_api_head_Text,
            sport_api_text,
            sport_api_img,
            sport_api_date,
            home_url
            
        })

    }
    render() { 
        return ( 
            <div className='recceived_api'>
                <Helmet>
                    <base />
                    <title>{this.state.sport_api_head_Text}</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <section className='received_api_section_box_1'>
                    <img src={`${this.state.home_url}/${this.state.sport_api_img}`} alt='pic'/>
                    <h1>{this.state.sport_api_id}</h1>
                    <h1>{this.state.sport_api_head_Text}</h1>
                    <h2>{this.state.sport_api_text}</h2>
                    <h5>{this.state.sport_api_date}</h5>
                </section>
                <section className='check_script'>

                </section>
            </div>
         );
    }
}
 
export default ReceivedApi;