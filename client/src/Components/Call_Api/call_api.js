import React, { Component } from 'react';
import './style.css'
import {sport_api} from '../Api/sport_api'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import { Helmet } from 'react-helmet';


class Call_Api extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            sport_api: sport_api,
             ListDataByDate: [],
             offset: 0,
             data: sport_api,
             perPage: 2,
             currentPage: 0
            
         }
         this.handlePageClick = this.handlePageClick.bind(this);
       
        }
        receivedData() {
           const data = this.state.data
           const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
           const postData = slice.map(pd => <React.Fragment>
               <div className='drop_data' onClick={()=>{
                    localStorage.setItem('sport_api_id',pd.id)
                    localStorage.setItem('sport_api_head_Text',pd.head_Text)
                    localStorage.setItem('sport_api_head_Text_url',pd.head_Text_url)
                    localStorage.setItem('sport_api_text',pd.text)
                    localStorage.setItem('sport_api_img',pd.img)
                    localStorage.setItem('sport_api_date',pd.date)
                    localStorage.setItem('sport_api_date_1',pd.date_1)


                    window.location = `/reveived_api/${pd.head_Text_url}`
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



   

     const Typing = ()=>{
            const typedTextSpan = document.querySelector(".typed-text");
            const cursorSpan = document.querySelector(".cursor");



            const headLineLisks = [this.state.sport_api.map(user => user.head_Text)]

            const textArray = [`${headLineLisks}`];
            const typingDelay = 200;
            const erasingDelay = 100;
            const newTextDelay = 2000; // Delay between current and next text
            let textArrayIndex = 0;
            let charIndex = 0;

            function type() {
            if (charIndex < textArray[textArrayIndex].length) {
                if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
                typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
                charIndex++;
                setTimeout(type, typingDelay);
            } 
            else {
                cursorSpan.classList.remove("typing");
                setTimeout(erase, newTextDelay);
            }
            }

            function erase() {
            if (charIndex > 0) {
            if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
            charIndex--;
            setTimeout(erase, erasingDelay);
            } 
            else {
            cursorSpan.classList.remove("typing");
            textArrayIndex++;
            if(textArrayIndex>=textArray.length) textArrayIndex=0;
            setTimeout(type, typingDelay + 1100);
            }
            }

            document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
            if(textArray.length) setTimeout(type, newTextDelay + 250);
            });
        }
    Typing()
      
    }
    render() { 
       
        return ( 
            <div className='call_api_main'>
                 <Helmet>
                    <base />
                    <title>Top Trending</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
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
                <section className='typing'>
                    <div class="container">
                    <p><h1>NEWS<span class="typed-text"></span><span class="cursor">&nbsp;</span></h1></p>
                    </div>
                </section>
            </div>
         );
    }
}
 
export default Call_Api;