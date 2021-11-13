import React from 'react'
import './style.css'

class Footer extends React.Component{
    render(){
        return(
            <div className='footer'>
                <section className='section__A'>
                    <div className='subsc'>
                        <h2><span className='styleText'>SUBSCRIBE & FOLLOW</span> TO GET UPDATE FROM <span className='styleName'>NEXTPLATFORM</span></h2>
                    </div>
                    <div className='link-input'>
                            <button className='btn btn-success '><input placeholder='Email'/></button>
                            <a href='/subscribe'><button className='btn btn-warning btnEmail'>SUBSCRIBE NOW</button></a>
                        </div>
                </section>
                <section className='advShop__main'>
                    <div className='advShopNow'>
                        <div className='textMe'>
                            <p><h1 >CHECK MARKET </h1>
                                <ul>
                                    <li>347067- Hit In Best BUY ( 1500$ ) </li>
                                    <li>571642- Hit In Home Depot ( 1000$ ) </li>
                                    <li>571642- Hit In Walmart ( 2k ) </li>
                                    <li>414700- Hit In Target (1k) </li>
                                    <li>414720- Hit In CVS ( 900$ )  </li>
                                    <li>414709- Hit In Walmart ( 2k )  </li>
                                    <li>546638- Hit In CVS ( 900$ ) </li>
                                    <li>546636- Hit In Target (1k)  </li>
                                    <li>546616- Hit In Target (1k) </li>
                                    <li>601100- Hit In Walmart ( 2k ) </li>
                                </ul>
                            </p>
                            </div>
                            <div className='textMe'>
                            <h1>ONLINE TOPUP</h1>
                                <ul>
                                    <li><span>BITCOIN TOPUP</span></li>
                                    <li><span>PAYPAL TOPUP</span></li>
                                    <li><span>CASH APP</span></li>
                                    <li><span>SKRILL TRANSFER</span></li>
                                    <li><span>WORLD REMIT TRANSFER </span></li>
                                </ul>
                            </div>
                            <div className='textMe'>
                            <h1 >PREMIUM ACCOUNT(UNLIMITED)</h1>
                            <ul>
                                <li><span>Pay Dating Site</span></li>
                                <li><span>Unlimited Netflix Account</span></li>
                                <li><span>Amazon Sellers Acc</span></li>
                                <li><span>Unlimited Internet Bundle</span></li>
                                <li><span>Unlimited DSTV Breakdown</span></li>
                                <li><span>Disney</span></li>
                                <li><span>Pay Apps</span></li>
                            </ul>
                        </div>
                    </div>
                </section>
                <section className='fixed__rate'>
                    <div className='fixedRate'>
                        <div className='product-A'>
                                <h1>SHOPPING RATES IN UK</h1>
                                <p>- Uk (Visa,Master) = 10$ per 1 
                                    <br/>
                                    - Uk (Amex,Dis) = 15$ per 1 
                                    <br/>
                                    - Uk Bin 15$ , UK Dob 20$ 
                                    <br/>
                                    - Uk fullz info = 30$ per 1
                                </p>
                            </div>
                            <div className='product-A'>
                            <h1>SHOPPING RATES IN CANADA</h1>
                                <p>-  Ca (Visa,Master) = 15$ per 1 
                                    <br/>
                                    - Ca (Amex,Dis) = 20$ per 1  
                                    <br/>
                                    - Ca Bin 15$ , CA Dob 20$
                                    <br/>
                                    - Ca fullz info = 30$ per 1
                                </p>
                            </div>
                            <div className='product-A'>
                            <h1>SHOPPING RATES IN AUSTRIAL</h1>
                                <p>- Au (Visa,Master) = 15$ per 1 
                                    <br/>
                                    - Au (Amex,Dis) = 20$ per 1  
                                    <br/>
                                    - Au Bin 17$ , AU Dob 25$
                                    <br/>
                                    - Au fullz info = 30$ per 1 
                                </p>
                            </div>
                            <div className='product-A'>
                            <h1>SHOPPING RATES IN FRANCE</h1>
                                <p>- Fr (Visa,Master) = 20$ per 1
                                    <br/>
                                    - Fr (Amex,Dis) = 23$ per 1  
                                    <br/>
                                    - Fr Bin 25$ , AU Dob 30$
                                    <br/>
                                    - Fr fullz info = 40$ per 1 
                                </p>
                        </div>
                    </div>
                </section> 
                <section className='lastFooter'>
                    <div className='footerMsg'>
                    <p>&copy; COPYRIGHT  || DEVELOP BY FRANK JUNGLE CASHCOLD || PRIVACY POLICY || TERMS OF USE || AD CHOICES || COOKIE POLICY || COOKIE SETTINGS</p>
                    </div>
                </section>
            </div>
        )
    }
}

export default Footer;