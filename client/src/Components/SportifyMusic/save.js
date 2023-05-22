import React, { Component } from 'react';
import SpotifyPlayer from 'react-spotify-web-playback';
import ReactPaginate from 'react-paginate'; 
import {Card,Button} from 'react-bootstrap'
import SpotifyWebApi from "spotify-web-api-node"
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
            accessToken: [],
            refreshToken: [],
            expiresIn: [],
            

         }
         this.handleChange = this.handleChange.bind(this)

    }

    handleChange = input => (event)=>{
      this.setState({[input]: event.target.value})
      
  }
   
    componentDidUpdate(prevProps, prevState) {
      console.log(this.state.refreshToken)
      console.log(this.state.expiresIn)

      const spotifyApi = new SpotifyWebApi({clientId: "4e2ccdd89a0847bc992b541f5e5e6f73",
      })

      
      if(this.state.accessToken) {
        spotifyApi.setAccessToken(this.state.accessToken);
      }



      spotifyApi.searchTracks('Love')
      .then(function(data) {
        console.log('Search by "Love"', data.body);
      }, function(err) {
        console.error(err);
      });
      


     
      if(this.state.refreshToken || this.state.expiresI){
        const interval = setInterval(() => {
          axios
            .post('/http://localhost:8000/refreshSpotify', {
              refreshToken: this.state.refreshToken,
            })
            .then((res) => {
              this.setState({
                accessToken: res.data.accessToken,
                expiresIn: res.data.expiresIn,
              });
            })
            .catch(() => {
              // window.location = '/Next-Platform-with-Sportify';
            });
        }, (this.state.expiresIn - 60) * 2600);
  
        return () => clearInterval(interval);


      }
     
      
     
    }
    
     
    

   
     componentDidMount(){
    
  


        const code = new URLSearchParams(window.location.search).get("code")

        if(code){
            axios.post('/loginSpotify',{code}).then(data => 

            this.setState({
                SportifyDetails: data.data,
                accessToken: data.data.accessToken,
                refreshToken: data.data.refreshToken,
                expiresIn: data.data.expiresIn,
            })).then(
                window.history.pushState({}, null, '/Next-Platform-with-Sportify ')
            )

        }


     }

  
  
  
    render() { 

    
       

          


       
      
        return ( 
            <div className='next_sportify_main'>
                <section className='Next_sportify_section_1'>

                   <h1>Welcome to our online music</h1>
                  
                </section>
              
            </div>
         );
    }
}
 
export default SportifyMusicMain; 