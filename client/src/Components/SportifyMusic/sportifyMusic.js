import React, { Component } from 'react';
import ReactPaginate from 'react-paginate'; 
import {Card,Button} from 'react-bootstrap'
import  axios from 'axios'

// import './link_box.css'
// import { Helmet } from 'react-helmet';
// LinkBoxMain


import './sportifyMusic.css'
class SportifyMusicMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            SportifyDetails: [],
            access_token: [],
            refresh_token: [],
            expires_in: [],
            

         }

    }
   

   
     componentDidMount(){


        const code = new URLSearchParams(window.location.search).get("code")

        if(code){
            axios.post('/loginSportify',{code}).then(data => 
        this.setState({
            SportifyDetails: data.data,
            access_token: data.data.access_token,
            refresh_token: data.data.refresh_token,
            expires_in: data.data.expires_in,
        })).then(
            window.history.pushState({}, null, ' / ')
        )

        }

     }
    render() { 
       const  client_id = '7274681e5f564e29b6246893ed62f20a'
       const  redirectURL = 'http://localhost:3000/Next-Platform-with-Sportify'

        const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirectURL}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`


        console.log(this.state.expires_in)
        // console.log(this.state.SportifyDetails)

        return ( 
            <div className='next_sportify_main'>
                <section className='Next_sportify_section_1'>
                    <h1>Next-platform With Sportify Top Music of The Week </h1>
                    <a href={AUTH_URL} className='btn btn-primary'>Login</a>
                </section>
            </div>
         );
    }
}
 
export default SportifyMusicMain;