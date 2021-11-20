import React, { Component } from 'react';
import './style.css'
import { Helmet } from 'react-helmet';
import {TimelineLite, TimelineMax} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger'


class MusicMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

    componentDidMount(){
        // gsap.registerPlugin(ScrollTrigger)
       

          
        const RegisterMusicMainTrigger = ()=>{
            
        }
          
        RegisterMusicMainTrigger()

       
    }
    render() { 
        return ( 
            <div className='music_main'>
                 <Helmet>
                    <base />
                    <title>NEXT-PLATFORM MUSIC</title>
                    <meta name="description" content="NEXT-PLATFORM-HOME" />
                    <link rel="canonical" href="next-platform.com" />
                </Helmet>
                <h1>MUSIC</h1>
            </div>
         );
    }
}
 
export default MusicMain;