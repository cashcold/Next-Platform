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
                    <a target='_blank' href='https://www.youtube.com/channel/UCsepKOc2Z2iwD8sjIt0h2jA'>
                    <img src='https://scontent.facc8-2.fna.fbcdn.net/v/t1.6435-9/109750655_140723594323346_994710098553268757_n.jpg?_nc_cat=106&ccb=1-5&_nc_sid=e3f864&_nc_ohc=3URwMJ-Q7lgAX_bMNGs&_nc_ht=scontent.facc8-2.fna&oh=00_AT91_NPZTaeRg8XoQyMqf198I4rrhDjKBR43yv9uf2XEDg&oe=623EDEC8'/>
                    <h3> 🙏Worshper J B Annan<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.facebook.com/mouhafassahy'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t39.30808-6/274317644_7827201567305993_6509753712061071956_n.jpg?stp=dst-jpg_p526x296&_nc_cat=100&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeGzrOENwElFtNKT5xtez_tiGXO8oaocdvUZc7yhqhx29UVN7_9fgZZmYxOq28WYK7rQyRjZMR5sxPcJGPD1nidr&_nc_ohc=IZXnfFXCYrsAX9PFr-e&_nc_ht=scontent.facc8-1.fna&oh=00_AT9wgfySD50K9_Bz5sLVs7vqFJZhyb5ECitdcBMzKwgYTw&oe=621CA65E'/>
                    <h3> From the day you are born till you die, ❤️relationships play a major role in your life👨‍👦. Join Joe Asmah and I Thursday for an insightful episode.<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
            </div>
         );
    }
}
 
export default WatchNextMain;