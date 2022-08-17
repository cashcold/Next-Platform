import React, { Component } from 'react';
import './watch_next.css'
import axios from 'axios'

class WatchNextMain extends Component {
    constructor(props) {
        super(props);
    }

    state = { 
        MarvelCheck: [],
        RAWG_Video_Games: []
     }

    componentDidMount(){
       
        
        axios.get(`https://api.rawg.io/api/games?key=e1fbdfe6840f485282801980ab3f63de`)
        .then((data)=>{
            console.log(data)
            this.setState({
                RAWG_Video_Games: data.data
            })
        })
     

       
    }
    render() { 
        console.log(this.state.RAWG_Video_Games)
        return ( 
            <div className='watch_next_main'>
               
                 <section className="next_watch_section_1">
                   <div className="nextWatch_box_1"></div>
                </section>  
            </div>
         );
    }
}
 
export default WatchNextMain;