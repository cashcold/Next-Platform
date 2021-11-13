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
                <section className='poster__box__1'>
                    <div className="postBox1">
                      
                    </div>
                </section>
            </div>
         );
    }
}
 
export default Poster;