import React, { Component } from 'react';
import './music_receivedMain.css'
class MusicReceivedMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='music_received_main'>
                <section className="receivedMusic_section_1 music_LeftSideBar"></section>
                <section className="receivedMusic_section_1 music_center_main">
                    <div className="iframe_list">
                        <h2>Top Naja Count Down</h2>
                        <iframe  src="https://open.spotify.com/embed/playlist/3M75W37HkFPdnkkaaOhvPo?utm_source=generator&theme=0" width="100%" height="400" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture">
                        </iframe>
                    </div>             
                    <div className="iframe_list">
                        <h2>Top Gh Count Down</h2>
                        <iframe  src="https://open.spotify.com/embed/playlist/3M75W37HkFPdnkkaaOhvPo?utm_source=generator&theme=0" width="100%" height="400" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div>             
                    <div className="iframe_list">
                        <h2>Top 100 GHANA IN</h2>
                        <iframe src="https://open.spotify.com/embed/playlist/4AJYrpCpoZdvwCC1YGmrct?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div>             
               </section>
                <section className="receivedMusic_section_1 music_RightSideBar"></section>
            </div>
         );
    }
}
 
export default MusicReceivedMain;