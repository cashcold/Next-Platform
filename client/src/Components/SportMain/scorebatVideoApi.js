import React, { Component } from 'react';
import './scorebatVideoApi.css'
import axios from 'axios'
import ReactPaginate from 'react-paginate';
import {Card,Button} from 'react-bootstrap'
import moment from 'moment'

class ScoreBatVideoApi extends Component {
    constructor(props) {
        super(props);
        this.state = { 
             scorebat: [],
             offset: 0,
             data: [],
             perPage: 12,
             currentPage: 0,
             loading: []
         }
         this.handleChange = this.handleChange.bind(this)
         this.handlePageClick = this.handlePageClick.bind(this);
    }
  
   
    handlePageClick = (e) => {
         window.scrollTo(0, 0)
        const selectedPage = e.selected;
        const offset = selectedPage * this.state.perPage;

        this.setState({
            currentPage: selectedPage,
            offset: offset
        }, () => {
            this.receivedData()
        });

    };
    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }
    receivedData() {
        axios
            .get(`https://www.scorebat.com/video-api/v3/`)
            .then(data => {
                data = data.data.response
                const slice = data.slice(this.state.offset, this.state.offset + this.state.perPage)
                const postData = slice.map(pd => <React.Fragment>
                    <div className="food_box_main_in">
                        <div className="food_box" onClick={()=>{
                            //   localStorage.setItem('scoreBat_matchviewUrl',pd.matchviewUrl)
                            // window.location =`/${pd.matchviewUrl}`
                        }}>
                            {/* <img src={pd.strMealThumb}/>
                            <h3 className='styleTextName'>{pd.strMeal}</h3>
                            <a href='#' className='btn btn-warning'>Order Now</a> */}
                              <Card classMame='card_sport' style={{backgroundColor: "black", color: 'white', padding: '2em 0em'}}>
                                            
                                    <Card.Img src={pd.thumbnail} />
                                    <h5><i class="fa fa-clock-o fa-3x" aria-hidden="true"></i> <span>{moment(pd.date).format('LLLL')}</span></h5>
                                    <Card.Body>
                                        <Card.Text>
                                            
                                        <span>{pd.videos[0].title}
                                            <img className='loading_svg' src={require('../../AllInOne/img2/Ellipsis-1.3s-214px.svg')}/>
                                         </span>
                                        <h4>{pd.competition}</h4>
                                        <p>{pd.title}</p>
                                        </Card.Text>
                                        <a target="_blank" href={pd.matchviewUrl}  className='btn btn-warning'> Watch <i class="fas fa-arrow-circle-right"></i></a>
                                        {/* <a href={pd.matchviewUrl} className='btn btn-warning'> Watch <i class="fas fa-arrow-circle-right"></i></a> */}
                                    </Card.Body>
                                </Card>
                        </div>
                    </div>
                  
                </React.Fragment>)
                // const postData = slice.map(pd => <React.Fragment>
                //     <h3>{pd.strMeal}</h3>
                //  <img src={pd.strMealThumb}/>
                // </React.Fragment>)

                this.setState({
                    pageCount: Math.ceil(data.length / this.state.perPage),
                   
                    postData
                })
            });
    }
    componentDidMount(){
        

        axios.get(`https://www.scorebat.com/video-api/v3/`)
      .then((data)=>{
          this.setState({
              scorebat: data.data.response
          })
      })
        axios.get(`https://www.scorebat.com/video-api/v3/`)
      .then((data)=>{
          this.setState({
              scorebat: data.data.response
          })
      })

      this.receivedData()
  }
    render() { 
        // console.log(this.state.scorebat)
        return ( 
            <div className='Scorenat_main_folder'>
                <section className='bat_score'>
                    <h1>Stream and Watch Sport HightLight</h1>
                </section>
                 <section className="ScoreBatVideoAPI_DataSection"> 
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
 
export default ScoreBatVideoApi;