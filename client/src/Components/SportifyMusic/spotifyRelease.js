import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import SpotifyWebApi from 'spotify-web-api-node';
import SpotifyPlayer from 'react-spotify-web-playback';
import axios from 'axios';
import './spotifyDisplayMusic.css';
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {Card,Button} from 'react-bootstrap'



class SpotifyReleases extends Component {
  constructor(props) {
    super(props);
    this.state = {
        Release_id: '',
        accessToken: ''
    
    };
    this.spotifyApi = new SpotifyWebApi({
      clientId: '4e2ccdd89a0847bc992b541f5e5e6f73',
    });
  }

  componentDidMount() {
    const Release_id = new URLSearchParams(window.location.search).get('Release_id');
    // const Song_title = new URLSearchParams(window.location.search).get('Song_title');
    // const Song_overview = new URLSearchParams(window.location.search).get('Song_overview');
    // const Song_img = new URLSearchParams(window.location.search).get('Song_img');
    const accessToken = new URLSearchParams(window.location.search).get('accessToken');

    this.setState({Release_id, accessToken})
   



    
    setTimeout(()=>{
      toast.dark(
          <div className='logoImg animate__animated animate__slower animate__heartBeat welcome_trans_h4'>
             
              <Card >
                  
                  <Card.Body>
                      <Card.Text>
                      <div className="btc_shark_img">
                          <a target='_blank' href='tel:+233203808479'>
                          <img className="d-block w-100"  src={require('../../AllInOne/BTC_SHARK/A2 STICKER-01 (1).jpg')}
                              alt="First slide" />
                          </a>
                          
                          </div>
                      </Card.Text>
                  </Card.Body>
                  </Card>
          </div>, {
          position: "top-right",
          autoClose: false,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });
     },20000)
  }


  render() {
  

    return (
      <div className="spotify-release-music">
      
        <ToastContainer/>
        <h1 className="title">Next-Platform new_releases_section</h1>
        
         <section className="btc_shark_section">
                <div className="btc_shark">
                    <a target='_blank' href='tel:+233203808479'>
                    <img className="d-block w-100"  src={require('../../AllInOne/BTC_SHARK/A2 STICKER-01 (1).jpg')}
                        alt="First slide" />
                    </a>
                    
                    </div>
        </section>

      </div>
    );
  }
}

export default SpotifyReleases;
