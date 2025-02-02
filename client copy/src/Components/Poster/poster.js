import React, { Component } from 'react';
import axios from 'axios'
import './style.css'
class Poster extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            products: []
         }
    }
    componentDidMount(){
        fetch('https://sportspage-feeds.p.rapidapi.com/odds')
            .then(res=>res.json())
            .then(res => this.setState({
                products: res
            }))
            .then(json=>console.log(json))
        }
        
       
    render() { 
        console.log(this.state.products)
        
        return ( 
            <div className='poster'>
               <section className='div-container '  id="section-beaches"> 
                   <div className="parallax parallax1">
                       
                       <div id="div-span-beaches" className="text">
                       Amazing Beaches
                       </div>
                   </div>
               </section>
               <section className='div-container '  id="section-civilization">
                   <div className="parallax parallax2">
                       <div id="div-span-beaches" className="text">
                       Rich Ancient Civilization
                       </div>
                   </div>
               </section>
               <section className='div-container '  id="section-places">
                   <div className="parallax parallax3">
                       <div id="div-span-beaches" className="text">
                       Wonderful Places to GO
                       </div>
                   </div>
               </section>
            </div>
         );
    }
}
 
export default Poster;