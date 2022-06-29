import React, { Component } from 'react';
import {Mp3_main_api} from '../../Api/mp3_main_api.js'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'


import './style.css'
class MusicBox_1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            music_box_1: Mp3_main_api,
            offset: 0,
            perPage: 8,
            currentPage: 0
         }

         this.handlePageClick = this.handlePageClick.bind(this);
    }
    receivedData() {
        const data = this.state.music_box_1
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)  
        const postData = slice.map(pd => <React.Fragment>
           <div className='drop_main_data'>
            <div className='drop_data' onClick={()=>{ 
                    localStorage.setItem('mp3_api_id',pd.id)
                    localStorage.setItem('mp3_api_name',pd.name)
                    localStorage.setItem('mp3_api_title',pd.title)
                    localStorage.setItem('mp3_api_head_Text_url',pd.head_Text_url)
                    localStorage.setItem('mp3_api_img',pd.img)
                    localStorage.setItem('mp3_api_head_Text',pd.head_Text)
                    localStorage.setItem('mp3_api_song_href',pd.song_href)
                    localStorage.setItem('mp3_api_date',pd.date)
                    localStorage.setItem('mp3_api_eye_seen',pd.eye_seen)
                    localStorage.setItem('mp3_api_music_type',pd.music_type)
                    localStorage.setItem('mp3_api_song_href',pd.song_href)
                    localStorage.setItem('mp3_api_about_Main',pd.about_Main)
                    localStorage.setItem('mp3_api_social_on_image',pd.social_on_image)


                    const musicParamsUrl = {
                        name: pd.name,
                        info: pd.head_Text_url,
                        on_image: pd.social_on_image
                    }
                    const queryMusicParams = require('query-string')

                    const passMusicParams = queryMusicParams.stringify(musicParamsUrl)
                    
                    window.location = `/music/${pd.head_Text_url}?${passMusicParams}`
                    }}>
                    <section className='drop_data_info_main'>
                        <div className='data_drop_info_box_1'>
                        <img src={pd.img}/>
                    </div>
                    <div className='data_drop_info_box_2'>
                        <h3>Download: {pd.name} mp3</h3>
                        <p>Title: {pd.title}</p>
                        <button className='btn btn-danger'>Download</button>
                    </div>
                </section>

                </div>
           </div>
        </React.Fragment>)
        this.setState({
         pageCount: Math.ceil(data.length / this.state.perPage),
        
         postData
     })

     }

     handlePageClick = (e) => {
         const selectedPage = e.selected;
         const offset = selectedPage * this.state.perPage;
 
         this.setState({
             currentPage: selectedPage,
             offset: offset
         }, () => {
             this.receivedData()
         });
 
     };
     componentDidMount(){
        this.receivedData()
     }
    render() { 
        return ( 
            <div className='music_box_1'>
                    <h1>Music Box On Fire</h1>
                <section className="box_music_1_main">
                    {this.state.postData}
                <section className='check_pagination'>
                <ReactPaginate
                    previousLabel={"prev"}
                    nextLabel={"next"}
                    breakLabel={"..."}
                    breakClassName={"break-me"}
                    pageCount={this.state.pageCount}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={5}
                    onPageChange={this.handlePageClick}
                    containerClassName={"pagination"}
                    subContainerClassName={"pages pagination"}
                    activeClassName={"active"}/>
                </section>
                </section>
            </div>
         );
    }
}
 
export default MusicBox_1;