import React, { Component } from 'react';
import './link_box.css'
import { Helmet } from 'react-helmet';
import {LinkBoxApi} from '../Api/linkBoxApi'
import ReactPaginate from 'react-paginate'; 
import {Card,Button} from 'react-bootstrap'
import axios from 'axios'

class LinkBoxMain extends Component {
    constructor(props) {
        super(props);
        this.state = {
            linkBox_api: LinkBoxApi,
            offset: 0,
            perPage: 1,
            currentPage: 0
        }

        this.handlePageClick = this.handlePageClick.bind(this);
    }
    receivedData() {
        const data = this.state.linkBox_api
        const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)  
        const postData = slice.map(pd => <React.Fragment>
           <div className='drop_main_data'>
            <div className='drop_data' onClick={()=>{ 
                    localStorage.setItem('linkBox_api_id',pd.id)
                    localStorage.setItem('linkBox_api_title',pd.title)
                    localStorage.setItem('linkBox_api_name',pd.name)
                    localStorage.setItem('linkBox_api_personalLinks',pd.personalLinks)
                    localStorage.setItem('linkBox_api_img',pd.img)
                    localStorage.setItem('linkBox_api_description',pd.description)
                    localStorage.setItem('linkBox_api_social_on_image',pd.social_on_image)


                    const musicParamsUrl = {
                        name: pd.name,
                        info: pd.title,
                        on_image: pd.display_social_imag
                    }
                    const queryMusicParams = require('query-string')

                    const passMusicParams = queryMusicParams.stringify(musicParamsUrl)
                    
                    window.location = `/link_box/${pd.title}?${passMusicParams}`
                    }}>
                    <section className='link_data_info_main'>
                        <div className='data_link_info_box_1'>
                        <img src={pd.img}/>
                    </div>
                    <div className='data_link_info_box_2'>
                        <h3>{pd.title}</h3>
                        <p>{pd.description}</p>
                    </div>
                    <span className='btn btn-warning'>read More</span>
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
            <div className='watch_next_main'>
                 <Helmet>
                    <base />
                    <title>Next-Platform LinkBox</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                  <section className="linkbox_main">
                  {this.state.postData}
                 </section>
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
            </div>
         );
    }
}
 
export default LinkBoxMain;