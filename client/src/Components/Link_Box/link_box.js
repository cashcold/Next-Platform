import React, { Component } from 'react';
import './link_box.css'
import { Helmet } from 'react-helmet';
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
                 <Helmet>
                    <base />
                    <title>Next-Platform LinkBox</title>
                    <meta name="description" content="React helment is useful for seo for dynamically changing head information" />
                    <link rel="canonical" href="somelink" />
                </Helmet>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.facebook.com/yellowcardapp'>
                    <img src={require('../../AllInOne/img2/273451231_5677950762231699_7917947454472796315_n.jpg')}/>
                    <h3> ®️Sign up today to start enjoying the best rates when 🤑 buying and selling digital assets on Yellow Card! 👍
                    Use promo Code 🎁YCGH to get 🥰15GHC.  <br/> Don't miss out!!!👉</h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>  
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://signup.bayportghana.com/payroll_loan/?utm_source=facebook&utm_medium=cpm&utm_campaign=L4_VP_PAYROLL_MAN%20DESK%20NEW_14.02.2022&utm_content=MAN%20DESK%20NEW&utm_term=23849943086460210%20Facebook_Desktop_Feed&fbclid=IwAR2CTgJwpiFBpCxDnPKpIiU2RMwup0qfl6hIqczAUtJ46srNEmRV0ymEFOI'>
                    <img src={require('../../AllInOne/img2/273851525_23849943095780210_177150845390722455_n.jpg')}/>
                    <h3> Get a loan up to Ghc 🤑200,000 with just a call!📱
                    At Bayport we have a financial solution for you🤟.
                    For CAGD government workers only⚠️.  <br/> Don't miss out!!!👉</h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>  
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.facebook.com/Edu-continues-103700362219243/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/272380624_23849541340040519_2329179721995487364_n.png?stp=cp0_dst-jpg_p526x296_q90_spS444&_nc_cat=104&ccb=1-5&_nc_sid=68ce8d&_nc_ohc=vv1IyijfmCkAX8rRM0o&_nc_ht=scontent.facc8-1.fna&oh=00_AT8aXACHLf44O3bcbChFi4ezjbIuxKJmB33YXQ_WAjuVOQ&oe=621F3F45'/>
                    <h3> This scheme is open to all 🧑‍🎓students who are can't  afford  due to fininacial💰 reasons afford laptops in their level of education  <br/> Don't miss out!!!👉</h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>  
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.mpowerfinancing.com/'>
                    <img src={require('../../AllInOne/img2/49270406_2317460395206848_5994933837296041984_n.png')}/>
                    <h3> Our 🧑‍🤝‍🧑student loans help you achieve your education goals. MPOWER’s loans have fixed interest rates with flexible loan amounts up to US$100,000 that can be used to cover tuition, school🏫 supplies, and living✔️ expenses for future semesters or past due balances. 👫We also support all majors and degrees with no requirement for a cosigner, collateral, or existing credit history.<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://autochek.africa/en/gh'>
                    <img src={require('../../AllInOne/img2/243195594_23848694616780294_3443146564760435547_n.jpg')}/>
                    <h3> Find a car you love 👍 <br/>Apply for a car loan. 👍<br/>
                         Get the best rates on Autochek. 👍
                        Think Cars Think Autochek👌<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://cardvest.ng/'>
                    <img src={require('../../AllInOne/img2/274034570_499353405080470_3857785958542022341_n.jpg')}/>
                    <h3> SELL 🎁GIFT CARDS📇 at best rates<br/>
                     Most profitable and customer-focused gift card trading platform in Nigeria and Ghana.
                    Stop trading your giftcard at a loss!<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://superforex.com/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/196212934_23847791751840216_2548333905321734010_n.jpg?stp=cp0_dst-jpg_p526x296_q75_spS444&_nc_cat=105&ccb=1-5&_nc_sid=de7202&_nc_eui2=AeFk_bnTH-IMjl_K4Wo5IzRXFADSg_b3Zp0UANKD9vdmnWcOjb-vu2lM3pdzHtmfV0t1W89QEB88v6vZ8tQCu0r1&_nc_ohc=-1bDZF-DDRYAX9_q4tm&_nc_ht=scontent.facc8-1.fna&oh=00_AT9TQaIIEaQXZbOTohrmUWR5W_VwAfQeh8IrZT8lOtsWbA&oe=621C0732'/>
                    <h3> We are excited to offer an exclusive trading account in Ghanaian cedi 👏
                    By opening a free account at SuperForex you choose a licensed broker. Be sure to install our mobile app.
                    GHS will be used for deposit and withdrawal transfers without conversion to the USD, saving you some extra cash.
                    👇<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://uptrendapp.io/'>sss
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/269684603_23849292829280018_4815344622737263801_n.jpg?stp=cp0_dst-jpg_p526x296_q75_spS444&_nc_cat=105&ccb=1-5&_nc_sid=68ce8d&_nc_eui2=AeEwGLoo4hXY-5EorHrVmdXL9tf8mVuN2Kf21_yZW43Yp4-CWD4CWWT8PAihCpBMVs6dI8u3ePonWAPtPBP5Wohb&_nc_ohc=Ck-hxXasTAcAX-oaMZA&_nc_ht=scontent.facc8-1.fna&oh=00_AT9n8QzNXR_JJntRDVWAzH_UCSnwaGNLh7noLcBJs6-Zxg&oe=621B3AAF'/>
                    <h3> Join the TREND movement 📲
                    Sign up to the Uptrend Telegram for the latest updates on TREND Token.<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.xm.com/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/271911259_23849251277790751_4736910237507740726_n.png?stp=cp0_dst-jpg_p526x296_q90_spS444&_nc_cat=100&ccb=1-5&_nc_sid=e84a38&_nc_eui2=AeGCBlQX1eUzJ_LN7vDz_Fn4C0eCh-KYV2ALR4KH4phXYM6DPvkVHCqLTG1jcEhpLesS75_hScgq8XGj6F36gk6r&_nc_ohc=PTr8JAI25asAX_szF8Z&tn=CrG_bAVXfnDePAKQ&_nc_ht=scontent.facc8-1.fna&oh=00_AT-vUhZwVbxEjn5pxDggBny27LsBoks3FN1tHGf4gG0p3A&oe=621B0093'/>
                    <h3> XM's Trade and Win🎐 promo is giving away over 💰$30,000 in cash prizes. Register now for the chance to win big! T&Cs apply.<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://transfy.io/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/272367713_23850426724370321_4567014968893609488_n.jpg?stp=cp0_dst-jpg_p526x296_q75_spS444&_nc_cat=111&ccb=1-5&_nc_sid=68ce8d&_nc_eui2=AeETopgs0i52Gzim8SQdoUHL0TP4qGBzgpfRM_ioYHOClxSYuKKT53IwTmXLkttkCQlrD5qI7Id8kyV8x_ZxT0ft&_nc_ohc=rTWY5eXU_pAAX9ElSoZ&_nc_ht=scontent.facc8-1.fna&oh=00_AT9odbWzX3FhQOLuglQxZavXsiEuWBEgfkpEMmN77gB_Gg&oe=621BCCC0'/>
                    <h3> Send, receive, hold and exchange your local African currency to any of our supported currencies.
                    Sign up Now<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://www.cloudatcost.com/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t39.30808-6/242721993_257909806260665_1476713798573711313_n.jpg?stp=dst-jpg_p526x296&_nc_cat=105&ccb=1-5&_nc_sid=2c4854&_nc_eui2=AeGb_LI0MaA_wCpupDj1APffdy3m9ixLRy13Leb2LEtHLVt4LzM3dqUiIELTK9zgT0NQLdV8CPyc1ljKX6WUfroj&_nc_ohc=QzCr6oBVK08AX9Xiw5P&_nc_ht=scontent.facc8-1.fna&oh=00_AT-RUAyIMLH9r8u70bne913VoUGnTOoFReCbo37u_3ofjA&oe=621D10DF'/>
                    <h3> 🆓Free Virtual 🚀Mining! 
                    Register, login and choose a free miner on the order page. Learn how to start<br/> Don't miss out!!! 👉 </h3>ss
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
                <section className="next_watch_section_1">
                    <a target='_blank' href='https://bima.com.gh/'>
                    <img src='https://scontent.facc8-1.fna.fbcdn.net/v/t45.1600-4/96785960_23844785669600253_3281976358472777728_n.jpg?stp=cp0_dst-jpg_p526x296_q75_spS444&_nc_cat=105&ccb=1-5&_nc_sid=67cdda&_nc_eui2=AeEoZr3vdQCKTXx17voN5T7JjBAZ_F1UDjaMEBn8XVQONmf-K4o9sXjGc0rd9tZJOMPHhFFWBYVKD-iHr2OQJLsf&_nc_ohc=MsCd86rvo-oAX8cG1BR&_nc_ht=scontent.facc8-1.fna&oh=00_AT9_f4GfNRfDcvhZZAfZZDA2BdRsMQYycgtINk7zyvsoZA&oe=621CA1CE'/>
                    <h3>Kojo gets GHs 15 Medication Support to buy prescribed medicine<br/> Don't miss out!!! 👉 </h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>
            </div>
         );
    }
}
 
export default LinkBoxMain;