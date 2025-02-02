import React, { Component } from 'react';
import './footballAllLivescore.css'
class FootballAllLive extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='livescoreMain'>
                <section className="live_section_1">
                <div id="wg-api-football-livescore"
                    data-host="v3.football.api-sports.io"
                    data-refresh="60"
                    data-key="Your-Api-Key-Here"
                    data-theme=""
                    data-show-errors="false"
                    class="api_football_loader">
                </div>
                </section>
            </div>
         );
    }
}
 
export default FootballAllLive;