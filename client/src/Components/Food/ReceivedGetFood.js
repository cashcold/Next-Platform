import React, { Component } from 'react';
import './ReceivedGetFood.css'
import axios from 'axios'
class ReceiveGetdFood extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            receiveGetFood_id: '',
            receiveGetFood_id_display: [],
            receiveGetFood_id_ingredient: [],
            getFood_api_strMealThumb: '',
            getFood_api_strMeal: '',
         }
    }

    componentDidMount(){
        
        const getFood_api_id = localStorage.getItem('getFood_api_id')
        const getFood_api_strMealThumb = localStorage.getItem('getFood_api_strMealThumb')
        const getFood_api_strMeal = localStorage.getItem('getFood_api_strMeal')

        this.setState({
            getFood_api_strMealThumb,
            getFood_api_strMeal

        })

        axios.get(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${getFood_api_id}`)
        .then((data)=>{
            this.setState({
                receiveGetFood_id_display: data.data.meals
            })
        })
      
    }
    render() { 
        console.log(this.state.receiveGetFood_id_display)
        return ( 
            <div className='received_get_food'>
                <section className="receive_section_box_1">
                    <h1 className='review_order'>Review order</h1>
                   <div className="orderNowText">
                   <img src={this.state.getFood_api_strMealThumb}/>
                   <h3>{this.state.getFood_api_strMeal}hey</h3>
                   </div>
                   <div className="ingredientOrderText">
                   {this.state.receiveGetFood_id_display.map(data => {
                            return(
                                <div>
                                    <h2 className='span_color span_color_order'>Ingredient</h2>
                                    <ul className='displayList'>
                                        <li><h3>{data.strIngredient1}</h3></li>
                                        <li><h3>{data.strIngredient2}</h3></li>
                                        <li><h3>{data.strIngredient3}</h3></li>
                                        <li><h3>{data.strIngredient4}</h3></li>
                                        <li><h3>{data.strIngredient5}</h3></li>
                                        <li><h3>{data.strIngredient6}</h3></li>
                                        <li><h3>{data.strIngredient7}</h3></li>
                                        </ul>
                                    
                                    </div>
                            )
                        })}
                   </div>
                </section>
                <section className="receive_section_box_2">
                   
                </section>
            </div>
         );
    }
}
 
export default ReceiveGetdFood;