import React, { Component } from 'react';
import {Mp3_main_api} from '../../Api/mp3_main_api'
import ReactPaginate from 'react-paginate';

import './style.css'
class MusicBox_1 extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            music_box_1: Mp3_main_api,
            offset: 0,
            perPage: 2,
            currentPage: 0
         }

         this.handlePageClick = this.handlePageClick.bind(this);
    }
    receivedData() {
        const data = this.state.music_box_1
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)  
        const postData = slice.map(pd => <React.Fragment>
            <div className='drop_data' onClick={()=>{
                 localStorage.setItem('mp3_api_id',pd.id)
                 localStorage.setItem('mp3_api_name',pd.name)
                 localStorage.setItem('mp3_api_title',pd.title)
                 localStorage.setItem('mp3_api_img',pd.img)
                 localStorage.setItem('mp3_api_head_Text',pd.head_Text)
                 localStorage.setItem('mp3_api_song_href',pd.song_href)
                 localStorage.setItem('mp3_api_date',pd.date)
                
                  window.location = `/music_link_box/${pd.head_Text_url}`
            }}>
            <h3>{pd.head_Text}</h3>
            <img src={pd.img}/>
            <p>{pd.text}</p>
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
        console.log(this.state.music_box_1)
        return ( 
            <div className='music_box_1'>
                <section className="box_music_1_main">
                    <h1>Music Box On Fire</h1>
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