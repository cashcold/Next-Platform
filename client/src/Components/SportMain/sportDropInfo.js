import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import './sportDropInfo.css'

class SportDropInfo extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            scoreBat_pd_thumbnail: '',
            scoreBat_pd_competition: '',
            scoreBat_pd_title: '',
            sscoreBat_pd_date: '',
            scoreBat_pd_embed: ''
         }
    }

    componentDidMount(){
       
         const scoreBat_pd_thumbnail = localStorage.getItem('scoreBat_pd_thumbnail')
         const scoreBat_pd_competition = localStorage.getItem('scoreBat_pd_competition')
         const scoreBat_pd_title = localStorage.getItem('scoreBat_pd_title')
         const scoreBat_pd_date = localStorage.getItem('scoreBat_pd_date')
         const scoreBat_pd_embed = localStorage.getItem('scoreBat_pd_embed')

         this.setState({
            scoreBat_pd_thumbnail,
            scoreBat_pd_competition,
            scoreBat_pd_title,
            scoreBat_pd_date,
            scoreBat_pd_embed
         })


        document.querySelector('.scoreBat_embeded').innerHTML = `
        ${scoreBat_pd_embed}
        <h1>Stream and Watch Sport HightLight</h1>
    `


      
    }
    render() { 
     
        return ( 
            <div className='sport_info_drop_main'>
                  <Helmet>
                <base />
                <title> {this.state.scoreBat_pd_title}</title>
                <meta name="desscription" content={this.state.scoreBat_pd_competition} />
                <meta property="og:title" content={this.state.scoreBat_pd_title} />
                <meta property="og:description" content={this.state.scoreBat_pd_competition} />
                <meta property="og:image" content={this.state.scoreBat_pd_thumbnail} />
            </Helmet>
                <div className="sport_drop_table">
                    <section className="sport_table_1">
                    <div className="scoreBat_embeded"></div>
                    <h1>{this.state.scoreBat_pd_competition}</h1>
                    <h3>{this.state.scoreBat_pd_title}</h3>
                   </section>
                    <section className="sport_table_2">

                    </section>
                </div>  
            </div>
         );
    }
}
 
export default SportDropInfo;