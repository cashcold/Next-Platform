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
                    <a target='_blank' href='https://www.facebook.com/johnben.annan.1'>
                    <img src='https://scontent.facc8-2.fna.fbcdn.net/v/t39.30808-6/s720x720/274582099_487492182979817_2869515671241834304_n.jpg?_nc_cat=101&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeGjoALWm1TewNdi4tQPeqd_SOLbFduYCrRI4tsV25gKtGfV6459WDyzExPHh_QRHMjncW_1OxgT9kQhAjTQCzI5&_nc_ohc=qMLi-HBnugQAX93Q4zi&tn=CrG_bAVXfnDePAKQ&_nc_ht=scontent.facc8-2.fna&oh=00_AT8Vw1gZsiMLcZXR5DRqgaSY3EXzlPLcY1aonPIHLOV8HA&oe=6219CB41'/>
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