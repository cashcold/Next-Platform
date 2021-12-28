import React, { Component } from 'react';
import moment from 'moment'
import { Helmet } from 'react-helmet';
class SportMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ApiFootballFixture_date: ''
          }
    }
    
    componentDidMount(){
        const today_date = moment().format('L')
        this.setState({
            ApiFootballFixture_date: today_date
        })
       

    }
    render() { 
        console.log(this.state.ApiFootballFixture_date)
        return ( 
            <div className='sportMain'>
                   <Helmet>
                    <base />
                    <title>Next-Platform Sport</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <link rel="canonical" href="next-platform.com" />
                    
                </Helmet>
                <section className="sport_main_box_1">
                   
                    <h1>Sport</h1>
                    <div id="wg-api-football-fixtures"
                        data-host="v3.football.api-sports.io"
                        data-refresh="60"
                        data-date=""
                        // data-date="2021-12-24"
                        data-league=""
                        data-team=""
                        data-season=""
                        data-last=""
                        data-next=""
                        data-key="17aea3a85a334e0804f70b3af8f4731e"
                        data-theme="dark"
                        data-show-errors="false"
                        class="api_football_loader">
                           
                    </div>
                </section>
            </div>
         );
    }
}
 
export default SportMain;