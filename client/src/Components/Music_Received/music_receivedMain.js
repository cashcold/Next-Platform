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
                </section>
                <section className="receivedMusic_section_1 music_center_main">
                   <MusicCenterFlowMain/>
               </section>

                <section className="receivedMusic_section_1 music_RightSideBar">
                   
                </section>
            </div>
         );
    }
}
 
export default MusicReceivedMain;