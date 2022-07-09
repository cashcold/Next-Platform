import React, { Component } from 'react';
import MusicCenterFlowMain from '../MusicCenterFlow/MusicCenterFlowMain.js';
import MusicBox_1 from '../Music_Box/Box_Music_1/Music_box_1.js';
import './music_receivedMain.css'
class MusicReceivedMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='music_received_main'>
                <section className="receivedMusic_section_1 music_LeftSideBar">
                    <div className="feature_playlist">
                    <MusicBox_1/>
                    </div>
                    <div className="feature_playlist">
                        <h2>favourite </h2>
                        <iframe  src="https://open.spotify.com/embed/playlist/37i9dQZF1EQn4jwNIohw50?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div>
                </section>
                <section className="receivedMusic_section_1 music_center_main">
                   <MusicCenterFlowMain/>
               </section>

                <section className="receivedMusic_section_1 music_RightSideBar">
                    <div className="gosple_main">
                        <h2>Praise and Worship Vol. 1|| Naija vs Ghana</h2>
                        <iframe  src="https://open.spotify.com/embed/playlist/2rdcocOpQzLq0VI0lmGOAb?utm_source=generator" width="100%" height="380" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default MusicReceivedMain;