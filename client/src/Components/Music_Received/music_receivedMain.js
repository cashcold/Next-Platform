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
                <section className="receivedMusic_section_1 music_center_main"></section>
                <section className="receivedMusic_section_1 music_RightSideBar"></section>
            </div>
         );
    }
}
 
export default MusicReceivedMain;