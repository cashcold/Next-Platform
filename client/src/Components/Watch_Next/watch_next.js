import React, { Component } from 'react';
import './watch_next.css'
import axios from 'axios'

class WatchNextMain extends Component {
    constructor(props) {
        super(props);
    }

    state = { 
        MarvelCheck: []
     }

    componentDidMount(){
         axios.post(`users/marvel`)
        .then((data)=>{
            this.setState({
                MarvelCheck: data
            })
        })
        
       
    }
    render() { 
        console.log(this.state.MarvelCheck)
        return ( 
            <div className='watch_next_main'>
                <section className="next_watch_section_1">
                   
                </section>
            </div>
         );
    }
}
 
export default WatchNextMain;