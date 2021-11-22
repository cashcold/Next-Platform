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
        gsap.registerPlugin(ScrollTrigger)
       

          
        const RegisterMusicMainTrigger = ()=>{
            const T_L = gsap.timeline()
            
            T_L
            .from('.music_prara_box_1',{xPercent: -100})
            .from('.music_prara_box_2',{xPercent: 100})
            .from('.music_prara_box_3',{xPercent: -100})
            .from('.music_prara_box_4',{xPercent: -100})

            ScrollTrigger.create({
                animation: T_L,
                trigger: '.music_para',
                start: '55px 0%',
                end: '+=1000',
                scrub: true,
                pin: true,
                anticipatePin: 1
            })
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
                <div className="music_para">
                    <section className="music_prara_box_1"></section>
                    <section className="music_prara_box_2"></section>
                    <section className="music_prara_box_3"></section>
                    <section className="music_prara_box_4"></section>
                </div>
            </div>
         );
    }
}
 
export default MusicMain;