import React, { Component } from 'react';
import './style.css'
import 'animate.css'
// import './nav'
import {Carousel,Container,Nav} from 'react-bootstrap'
import {TimelineLite} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger.js'
import Other__NavBar from '../other_Navbar/other_nav.js';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            clientId: '7274681e5f564e29b6246893ed62f20a',
            redirectUri: 'http://localhost:3000/music',
         }
    }




    componentDidMount(){

        const LinkBoxApi = [
            {
                id: 1, 
                img:`https://firebasestorage.googleapis.com/v0/b/next-platform02.appspot.com/o/Next-platform02%2FA2%20STICKER-01%20(1).jpg?alt=media&token=9ed5ea63-bda2-4f71-a054-96c7207367ec`,
                title: 'Buy Bitcoin And Invest Online',
                name: 'BTC_SHARK',
                description: `Are you from Uganda🇺🇬, Kenya🇰🇪 Nigeria🇳🇬  Ghana🇬🇭 Tanzania🇹🇿 Botswana🇧🇼 Rwanda🇷🇼 USA🇺🇸 Libirea🇱🇷 Zambia🇿🇲 Zimbabwe🇿🇼, South Africa🇿🇦 Cameroon🇨🇲 Kuwait🇰🇼 UAE🇪🇭 Philippines 🇵🇭 China🇨🇳 U.K🇬🇧 INDONESIA🇮🇩  Brazil🇧🇷 Jamaica🇯🇲 Ethiopia🇪🇹, KOREA🇰🇷 Ecuador🇻🇪
                Lebanon🇦🇹 Japan🇯🇵 Saudi Arabia🇸🇦 Honduras🇳🇮 Singapore🇲🇹  Bahrain🇧🇭 Thailand🇨🇷 Qatar🇶🇦  Italy🇮🇹 Canada🇨🇦 india🇮🇳 Vietnam🇲🇦  Malaysia🇲🇾
                Germany🇩🇪 and Pakistan🇵🇰. Good news to you all🔅🔅
                🔅 🔅                   Just by bitcoin investment you can make good profits each 24hours from every investment you make, 
                all that is required is a valid email address and a valid Blockchain with wallet address. 👍`,
                display_social_imag: `http://next-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg`,
        
                personalLinks: [
                   {
                    facebook: 'fb',
                    whatsapp: '0203808479',
                    call: '0203808479',
                    twitter: '',
                    site: 'http://next-platform.herokuapp.com'
                   }
                ]
            },
            {
                id: 2,
                img: `https://firebasestorage.googleapis.com/v0/b/next-platform02.appspot.com/o/Next-platform02%2F273451231_5677950762231699_7917947454472796315_n.jpg?alt=media&token=6c2fd709-b09d-4ca5-bdcc-036c41b5e0e4`,
                title: 'YellowCard  Use promo Code 🎁Cashcold to get 🥰300GHC.',
                name: 'YELLOWCARD',
                description: ` ®️Sign up today to start enjoying the best rates when 🤑 buying and selling digital assets on Yellow Card! 👍
                Use promo Code 🎁Cashcold to get 🥰300GHC..Are you following the official Yellow Card accounts? Unfortunately, fake Yellow Card accounts appear online from time to time, putting our users at risk.countries and regions are available on Yellow Card: ; Ghana Nigeria Kenya Cameroon Tanzania ; South Africa Botswana Uganda ...`,
                display_social_imag: `http://next-platform.herokuapp.com/static/media/273451231_5677950762231699_7917947454472796315_n.7e044df8e683568ad43c.jpg`,
        
                personalLinks: [
                    {
                     facebook: 'https://www.facebook.com/yellowcardapp',
                     whatsapp: 'xxxxxxxxx',
                     call: '020 xxxxxxxx',
                     twitter: 'xxxxxxxx',
                     site: 'https://www.facebook.com/yellowcardapp'
                    }
                 ]
            },
            {
                id: 3,
                img: `https://firebasestorage.googleapis.com/v0/b/next-platform02.appspot.com/o/Next-platform02%2F273851525_23849943095780210_177150845390722455_n.jpg?alt=media&token=3fff2c45-6457-48b2-bab0-ad010f65b514`,
                name: 'BAYPORT',
                title: ' Get a loan up to Ghc 🤑200,000 with just a call!',
                description: ` Get a loan up to Ghc 🤑200,000 with just a call!📱
                At Bayport we have a financial solution for you🤟.
                For CAGD government workers only⚠️,<br/>Whether you need a loan to consolidate all your debt, are considering starting your own business, or need to fund your family’s education, Bayport is here to help you apply for a personal loan to suit your needs and our customers enjoy a host of benefits You will need these documents when applying for your personal loan
                South African ID
                Proof of residence not older than 3 months
                Latest payslip
                Last 3 months’ bank statements
                Continue your application where you left off
                Upload your documents when you have them, anytime.
                We will hold onto your application details in the section where you left off - No need to start over!`,
                display_social_imag: `http://next-platform.herokuapp.com/static/media/273851525_23849943095780210_177150845390722455_n.90ec96e88f8612ec8dce.jpg`,
        
                personalLinks: [
                    {
                     facebook: 'https://signup.bayportghana.com/payroll_loan/?utm_source=facebook&utm_medium=cpm&utm_campaign=L4_VP_PAYROLL_MAN%20DESK%20NEW_14.02.2022&utm_content=MAN%20DESK%20NEW&utm_term=23849943086460210%20Facebook_Desktop_Feed&fbclid=IwAR2CTgJwpiFBpCxDnPKpIiU2RMwup0qfl6hIqczAUtJ46srNEmRV0ymEFOI',
                     whatsapp: '020xxxxx',
                     call: '020xxxx',
                     twitter: 'xxxxxx',
                     site: 'https://signup.bayportghana.com/payroll_loan/?utm_source=facebook&utm_medium=cpm&utm_campaign=L4_VP_PAYROLL_MAN%20DESK%20NEW_14.02.2022&utm_content=MAN%20DESK%20NEW&utm_term=23849943086460210%20Facebook_Desktop_Feed&fbclid=IwAR2CTgJwpiFBpCxDnPKpIiU2RMwup0qfl6hIqczAUtJ46srNEmRV0ymEFOI'
                    }
                 ]
            },
            {
                id: 4,
                img: `https://firebasestorage.googleapis.com/v0/b/next-platform02.appspot.com/o/Next-platform02%2F49270406_2317460395206848_5994933837296041984_n.png?alt=media&token=2929c708-2dd9-42f4-a9cd-fe30ffb55508`,
                title: ' Our 🧑‍🤝‍🧑student loans help you achieve your education goals.',
                name: 'MPOWER FINANCING',
                description: ` Our 🧑‍🤝‍🧑student loans help you achieve your education goals. MPOWER’s loans have fixed interest rates with flexible loan amounts up to US$100,000 that can be used to cover tuition, school🏫 supplies, and living✔️ expenses for future semesters or past due balances. 👫We also support all majors and degrees with no requirement for a cosigner, collateral, or existing credit history.`,
                display_social_imag: `http://next-platform.herokuapp.com/static/media/49270406_2317460395206848_5994933837296041984_n.85d8aa683728b68095e2.png`,
        
                personalLinks: [
                    {
                     facebook: '',
                     whatsapp: '020xxxxx',
                     call: '020xxxx',
                     twitter: 'xxxxxx',
                     site: 'https://www.mpowerfinancing.com/'
                    }
                 ]
            },
            {
                id: 5,
                img: `https://firebasestorage.googleapis.com/v0/b/next-platform02.appspot.com/o/Next-platform02%2F243195594_23848694616780294_3443146564760435547_n.jpg?alt=media&token=d90d4594-0a20-47b6-83b6-9938cbc720ad`,
                title: 'Find a car you love Driver and pay latere',
                name: 'AUTOCHEK',
                description: ` Find a car you love 👍 <br/>Apply for a car loan. 👍<br/>
                Get the best rates on Autochek. 👍
               Think Cars Think Autochek👌`,
                display_social_imag: `http://next-platform.herokuapp.com/static/media/243195594_23848694616780294_3443146564760435547_n.06260489ddd5b1b90b19.jpg`,
        
                personalLinks: [
                    {
                     facebook: '',
                     whatsapp: '020xxxxx',
                     call: '020xxxx',
                     twitter: 'xxxxxx',
                     site: 'https://autochek.africa/en/gh'
                    }
                 ]
            },
            {
                id: 6,
                img: `https://firebasestorage.googleapis.com/v0/b/next-platform02.appspot.com/o/Next-platform02%2F274034570_499353405080470_3857785958542022341_n.jpg?alt=media&token=c0186b9e-74c6-45bd-880f-e7e9de104db9`,
                title: 'SELL 🎁GIFT CARDS📇 at best rates',
                name: 'CARDVEST',
                description: ` SELL 🎁GIFT CARDS📇 at best rates, Most profitable and customer-focused gift card trading platform in Nigeria and Ghana.
                Stop trading your giftcard at a loss! <br/> Don't miss out!!! 👉`,
                display_social_imag: `http://next-platform.herokuapp.com/static/media/274034570_499353405080470_3857785958542022341_n.99023033571c2e49d1ec.jpg`,
                
        
                personalLinks: [
                    {
                     facebook: '',
                     whatsapp: '020xxxxx',
                     call: '020xxxx',
                     twitter: 'xxxxxx',
                     site: 'https://cardvest.ng/'
                    }
                 ]
            },
        ]
        
        
        
        let output = ''
        let i = 0
        for(i = 0; i < LinkBoxApi.length; i++){
            output +=  `<a href= ${LinkBoxApi[i].personalLinks[0].site}><p> ${LinkBoxApi[i].title} with ${LinkBoxApi[i].name} </p></a>`
        }
        
        
        
        document.querySelector('.title_checkk_up').innerHTML = `
            ${output}
        `
        document.querySelector('.marqueeText_4_mobile_title_checkk_up').innerHTML = `
            ${output}
        `
        
        

        //  window.addEventListener('scroll',()=>{
        //     const header = document.querySelector('.navMain')
        //     header.classList.toggle('sticky',window.scrollY > 0);
        // })
      
        const ToggleBtn = ()=>{
            const toggleBtn = document.querySelector('.toggle__bar')
            const links = document.querySelector('.nav__links')

            toggleBtn.addEventListener('click',()=>{
                if(links.style.display==='none'){
                    links.style.display='block';
                }
                else{
                    links.style.display='none'
                }
            })
            
        }
        ToggleBtn()

        const LogoRedirect = ()=>{
            document.querySelector('.logoImg').addEventListener('click',()=>{
                window.location = '/'
            })
        }
        LogoRedirect()

        const RegisterHomeTrigger = () =>{
           
            const navMain = document.querySelector('.navMain')
            const logoImg = document.querySelector('.logoImg')
            const toggle_1 = document.querySelectorAll('.toggle_1')
            const toggle_2 = document.querySelectorAll('.toggle_2')
            const toggle_3 = document.querySelectorAll('.toggle_3')
            const nav_img_h1_1 = document.querySelectorAll('.nav_img_h1_1')
            const nav_img_h1_2 = document.querySelectorAll('.nav_img_h1_2')

            
            const nav_bar_ATl  =  new TimelineLite({
                scrollTrigger: {
                    trigger:  navMain,
                    start: "20px 80%",
                    scrub: false,
                    toggleActions: "restart none none none",
                }
            })  
            
            nav_bar_ATl.from(logoImg,{opacity: 0, duration: 2.8, ease: "slow(0.4, 0.7, false)", x:'-9500', }) 
            nav_bar_ATl.from(toggle_1,{opacity: 0, duration: 1.8, ease: "slow(0.4, 0.7, false)", x:'800', }) 
            nav_bar_ATl.from(toggle_2,{opacity: 0, duration: 1.8, ease: "slow(0.4, 0.7, false)", y:'800', }) 
            nav_bar_ATl.from(toggle_3,{opacity: 0, duration: 1.8, ease: "slow(0.4, 0.7, false)", x:'-800', })
           

        }
        RegisterHomeTrigger()
       
       
        

        
    }
    render() { 
        const Music_Auth_url = `https://accounts.spotify.com/authorize?client_id=${this.state.clientId}&response_type=code&redirect_uri=${this.state.redirectUri}&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state`
        return ( 
            <div className='navbarMain'>
              
               <section className='navMain'>
                    <nav>
                    {/* <Other__NavBar/> */}
                        <div className='logoImg animate__animated animate__slower animate__flash'>
                            <h1 className='text-red blink-soft'>NEXT-PLATFORM</h1>
                        </div>
                        <div className='nav__links animate__animated animate__slower animate__bounceInDown'> 
                         <div class="flow_marq ">
                            <h3>Update News </h3>
                            <marquee className='marqueeText_T' onmouseover="this.stop()" onmouseout="this.start()">
                                <p class="title_checkk_up"></p>
                            </marquee>
                        </div>
                            <ul className='links'>
                                <li><a className='btn btn-two' href='/' style={{color: "red"}}>HOME </a></li>
                                <li><a className='btn btn-two' href='/movies_home_box'>MOVIES</a></li>
                                <li><a className='btn btn-two' href='/music'>MUSIC</a></li>
                                <li><a className='btn btn-two' href='/sport-main-home'>SPORT</a></li>
                                <li><a className='btn btn-two' href='/next-platform_RAWG_Video_Games_Main'>VIDEO GAMES</a></li>
                                <li><a className='btn btn-two' href='/link_box'>LinkBox</a></li>
                                <li><a className='btn btn-two' href='/product-main'>PRODUCTS</a></li>
                                <li><a className='btn btn-two' href='/food-main-home'>FOOD</a></li>
                                <li><a className='btn btn-two' href='/drinks-main'>Drinks</a></li>
                                <li><a className='btn btn-two' href='/contact-us'>ABOUT US</a></li>
                                {/* <li><a href='/contact-us'>SUPPORT</a></li> */}
                            </ul>
                        </div>
                        <div className='aboyt__toggle '>
                                <div className='toggle__bar animate__animated animate__slower animate__zoomInDown'>
                                    <div className='toggle toggle_1'></div>
                                    <div className='toggle toggle_2'></div>
                                    <div className='toggle toggle_3'></div>
                                </div>
                        </div>
                     </nav>
                     
               </section> 
               
                <section className='top_form'>
                 <div className="top_form_go">
                    <Carousel fade>
                            <Carousel.Item>
                            <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/125820a8-064d-413d-a2f7-18a949b33806"><img src="https://kol.jumia.com/banners/u9bRTR8VkARvQnShWOVcxhF8m7Qe1ZmgyCUi2H18.png" alt="Deal of the day"/></a>
                                  <Carousel.Caption>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/E-L.jpg')}
                                    alt="First slide"
                                />
                                  <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>EL</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/ab67616d0000b2736a1f5bea27488489a5c6d604.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>HARMONIZE FT DIAMOND</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/BTC_SHARK/A2 STICKER-01 (1).jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>BTC SHARK</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/big_shaq.jpeg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>BIG SHAQ</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/Augustine_Boakye.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>AUGUSTINE BOAKYE</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/d6900db9766fbea444d9709c16e664c99843e236c4989a62440786cf51f0851b.jpeg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>CONGRATULATIONS BY ADA EHI FT BUCH</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/fresh_on/maxresdefault-1.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>JOIN IPHONE PROMO!!!</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/Stonebwoy-prime-News-Ghana.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>STONE BWOY</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/Victor-Osimhen.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'> VICTOR OSIMHEN</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/7988ab7e47764d3e861de705f1bd4605.640x640x1.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'> P-SQUARE FT AWILO LONGOMBA</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                            <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/fb0d02a0-ad92-45a0-87cd-428ddcf5e552"><img src="https://kol.jumia.com/banners/NptL4I34RN5sLlBJEgx8YZuO4KSOqaiOGkwAzGMK.jpeg" alt="Mobile Category"/></a>
                                <Carousel.Caption>
                                  
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../VR__Pic/22160504-7785859-Two_to_taste_It_will_come_in_both_Original_and_Vanilla_varieties-a-4_1576171477322.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>GET PEPSI COFFEE  FREE FOR TRY</h3>
                                    <a href='#' btn btn-warning> Learn More</a>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/joe_mettle_raw7.jpg')}
                                    alt="First slide"
                                />
                                 <Carousel.Caption>
                                    <h3>JOE METTLE</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/img/m-star-bazaar.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>FREE VISACARD WITH $5</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/JOE-PRAIZE-JOY-OVERFLOW-LYRICS-MP3-DOWNLOAD.png')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>JOE-PRAIZE</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                             <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/CsyumB6XgAEUwc0.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>5 STAR ENERGY DRINK</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/kojo_vypa.jpg')}
                                    alt="First slide"
                                />
                                 <Carousel.Caption>
                                    <h3>KOJO VYPA</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/hearphones/Folding WIFI Wireless Bluetooth 4.1 Headphones Heads ....png')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>80,000 GIVEN AWAY GIFT FOR STEREO CUSTOMERS</h3>
                            </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/laptop/The Galaxy Book S Is the Most Exciting Samsung Laptop. Ever ....jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>The Galaxy Book S Is the Most Exciting Samsung Laptop. Ever </h3>
                            </Carousel.Caption>
                            </Carousel.Item>
                            
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/nest.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>NESTLE PRODUCT</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/sarkodie_album.0.jpeg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>SARKODIE</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/rebul-kolonya-cesitleri-270-ml-2-adet-sec-al__1502684239213670-e1584247166952.jpg')}
                                    alt="First slide"
                                />
                                 <Carousel.Caption>
                                    <h3>REBUL</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/moto_bike/71jk5jZAoPL._SL1440_.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>CHECK NEW RELEASE, AVALIABLE FOR SALES</h3>
                            </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/daddy_opanka.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>DADDY OPANKA</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/Reekado-banks-lucipost.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>REEKADO BANKS</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                    </Carousel>
                </div>
                </section>
                <section className="fow_mobile_marquee">
                <div class="marqueeText_4_mobile">
                            <h3>Update News </h3>
                            <marquee className='marqueeText_T marqueeText_4_mobile' onmouseover="this.stop()" onmouseout="this.start()">
                                <p class="marqueeText_4_mobile_title_checkk_up"></p>
                            </marquee>
                     </div>
                </section>
            </div>
         );
    }
}
 
export default Navbar;