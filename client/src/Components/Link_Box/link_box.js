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
                    <a target='_blank' href='tel:+233203808479'>
                    <img src={require('../../AllInOne/BTC_SHARK/A2 STICKER-01 (1).jpg')}/>
                    <h3>Are you from Uganda🇺🇬, Kenya🇰🇪 Nigeria🇳🇬  Ghana🇬🇭 Tanzania🇹🇿 Botswana🇧🇼 Rwanda🇷🇼 USA🇺🇸 Libirea🇱🇷 Zambia🇿🇲 Zimbabwe🇿🇼, South Africa🇿🇦 Cameroon🇨🇲 Kuwait🇰🇼 UAE🇪🇭 Philippines 🇵🇭 China🇨🇳 U.K🇬🇧 INDONESIA🇮🇩  Brazil🇧🇷 Jamaica🇯🇲 Ethiopia🇪🇹, KOREA🇰🇷 Ecuador🇻🇪
                    Lebanon🇦🇹 Japan🇯🇵 Saudi Arabia🇸🇦 Honduras🇳🇮 Singapore🇲🇹  Bahrain🇧🇭 Thailand🇨🇷 Qatar🇶🇦  Italy🇮🇹 Canada🇨🇦 india🇮🇳 Vietnam🇲🇦  Malaysia🇲🇾
                    Germany🇩🇪 and Pakistan🇵🇰. Good news to you all🔅🔅
                    Just by bitcoin investment you can make good profits each 24hours from every investment you make, 
                    all that is required is a valid email address and a valid Blockchain with wallet address. 👍<br/> Don't miss out!!!👉</h3>
                    <h4 className='btn btn-warning'>Find More</h4>
                    </a>
                </section>  
                <section className="next_watch_section_1">.
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
              
            </div>
         );
    }
}
 
export default LinkBoxMain;