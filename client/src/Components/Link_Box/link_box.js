import React, { Component } from 'react';
import './link_box.css'
import axios from 'axios'

class LinkBoxMain extends Component {
    constructor(props) {
        super(props);
    }

    
    componentDidMount(){
        
        
       
    }
    render() { 
        return ( 
            <div className='watch_next_main'>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.facebook.com/yellowcardapp'>
                    <img src='https://scontent.facc8-2.fna.fbcdn.net/v/t39.30808-6/273451231_5677950762231699_7917947454472796315_n.jpg?_nc_cat=107&ccb=1-5&_nc_sid=2c4854&_nc_eui2=AeFTECg4-loQ_oJHfcIuSPPxKGfIWEGT3ckoZ8hYQZPdyRYlsH0fmWZhNTRz__IjmzNStJeRsYfZNVakf9kf-j96&_nc_ohc=vi9ok8fCaswAX-lY_Di&_nc_ht=scontent.facc8-2.fna&oh=00_AT-Wxj-IqSZJHL-Ps7ICvNACC7HsjeXQZdv-VOzk9kCoCg&oe=62195162'/>
                    <h3> ®️Sign up today to start enjoying the best rates when 🤑 buying and selling digital assets on Yellow Card! 👍
                    Use promo Code 🎁YCGH to get 🥰15GHC.  <br/> Don't miss out!!!👉</h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>  
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.mpowerfinancing.com/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t39.30808-6/273715674_3227024697583742_5980608295611256206_n.jpg?_nc_cat=108&ccb=1-5&_nc_sid=730e14&_nc_eui2=AeHPgUTO0wDIhfvYBzYxY4U5FQjXgYxLQPwVCNeBjEtA_H4S_WWCAAvuBPbVgiI4m1f7NAUkgzs50BBtLVUPck_x&_nc_ohc=d6D-KkkNCe0AX-4GYAP&_nc_ht=scontent.facc8-1.fna&oh=00_AT8OfKri-NAfU0V9LmmAhgTOotZ2uS2jSJgkf0jdesmjWQ&oe=62191F1C'/>
                    <h3> Our 🧑‍🤝‍🧑student loans help you achieve your education goals🥅. MPOWER’s loans have fixed interest rates with flexible🆓 loan amounts up to US$100,000 that can be used to cover tuition, school🏫 supplies, and living✔️ expenses for future semesters or past due balances. 👫We also support all majors and degrees with no requirement for a cosigner, collateral, or existing credit history.<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
            </div>
         );
    }
}
 
export default LinkBoxMain;