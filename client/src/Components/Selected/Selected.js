import React, { Component } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {Card,Button} from 'react-bootstrap'
import './style.css'
import {TimelineLite, TimelineMax} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger.js'
import { Helmet } from 'react-helmet';

class Selected extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        currency: '',
        home_url: '',
        // Spotify_CoolForNow_name: [ ]
        
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
    }

   componentDidMount(){
    gsap.registerPlugin(ScrollTrigger)

    const RegisterSelectedMainTrigger = ()=>{
       


       
    }
    RegisterSelectedMainTrigger()

       const home_url =  window.location.origin
        localStorage.setItem('home_url',home_url)
        
        this.setState({
            home_url
        })
      
       setTimeout(()=>{
        toast.dark(
            <div className='logoImg animate__animated animate__slower animate__rubberBand welcome_trans_h4'>
               
                <Card style={{backgroundColour: 'black', color: 'white'}}>
                    <Card.Header as="h5" style={{backgroundColour: 'black', color: 'white'}} >PROMOTIONS</Card.Header>
                    <Card.Body>
                        <Card.Text>
                        <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/fb0d02a0-ad92-45a0-87cd-428ddcf5e552"><img src="https://kol.jumia.com/banners/NptL4I34RN5sLlBJEgx8YZuO4KSOqaiOGkwAzGMK.jpeg" alt="Mobile Category"/></a>
                        </Card.Text>
                    </Card.Body>
                    </Card>
            </div>, {
            position: "top-center",
            autoClose: false,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
       },20000)
   
    //    setTimeout(()=>{
    //        toast.success("PROMOTE YOUR BUSINESS")
    //    },20000)
   
    // let SlideIndex = 0;
    // const SlideDiv = ()=>{
    //     var i ;
    //     var slideDiv = document.querySelectorAll('.boxCard')
    //     var dot = document.querySelectorAll('.dot')
    //     for(i = 0; i < slideDiv.length; i++){
    //         slideDiv[i].style.display='none'
    //     }
    //     SlideIndex++;
    //     if(SlideIndex > slideDiv.length){SlideIndex = 1}
    //     for(i = 0; i < dot.length; i++){
           
    //     }
    //     slideDiv[SlideIndex-1].style.display= "block";

    //     setTimeout(SlideDiv,4000)

    // }
    // SlideDiv()
     
    const Typing = ()=>{
        const typedTextSpan = document.querySelector(".typed-text");
        const cursorSpan = document.querySelector(".cursor");

        const textArray = ["STAND A CHANCE TO WIN FREE PES PRODUCT EVERY WEEK!!!!", "PES 2021 LITE gives you unrestricted access to all the features of myClub mode", "The full version 'eFootball PES 2021 SEASON UPDATE' is also available.", "The free-to-play version of the 'eFootball PES 2021 SEASON UPDATE' is now available for download."];
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
        gsap.registerPlugin(ScrollTrigger)
        const RegisterparallaxTrigger = () =>{
            const parallax1_box_1 = document.querySelector('.parallax1_box_1')
            const parallax1 = document.querySelector('.parallax1')
            const parallax2 = document.querySelector('.parallax2')
            const parallax3 = document.querySelector('.parallax3')

            const check_parallax_bar_ATl  =  new TimelineLite({
                ScrollTrigger: {
                    trigger:  parallax1_box_1,
                    start: "top top",
                    scrub: 1,
                    toggleActions: "restart none none none",
                    pin: true,
                    
                    
                }
            }) 
            check_parallax_bar_ATl.from(parallax1,{opacity: 0, ease: "none", x:'-2000', }) 
            check_parallax_bar_ATl.from(parallax2,{opacity: 0, ease: "none", y:'2000', }) 
            check_parallax_bar_ATl.from(parallax3,{opacity: 0, ease: "none", x:'-2000', }) 
        }

        RegisterparallaxTrigger()

     
   }
   

    render() { 
        
        return ( 
            <div className='SelectedMain'>
            <Helmet>
            <base />
            <title> Next-Platform-Home</title>
            <meta name="desscription" content='Next-Platform-All Bind' />
            <meta property="og:title" content='Join The next PlatForm' />
            <meta property="og:description" content='Next-Platform-All Bind Join The next PlatForm' />
            <meta property="og:image" content="https://nest-platform.herokuapp.com/static/media/A2%20STICKER-01%20(1).f946bff1c9648de93e5b.jpg" />
            <link rel="canonical" href={window.location.href} />
        </Helmet>
                <ToastContainer 
                position="top-center"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
                <div className='cerrency__now'></div>
                <section className='feature_videos'>
                    <h3 className='feature_h3'>FEATURED VIDEOS</h3>
                    <div className="feature_videos_list">
                        <div className="feature_vides_row iframe-container">
                             <iframe src="https://www.youtube.com/embed/M6PJp1p6BLg?vq=hd1080&color=white" width="560" height="315" frameborder="0"></iframe>
                        </div>
                        <div className="feature_vides_row iframe-container">
                             <iframe src="https://www.youtube.com/embed/3M_5oYU-IsU?vq=hd1080&color=white" width="560" height="315" frameborder="0"></iframe>
                        </div>
                        <div className="feature_vides_row iframe-container">
                            <iframe src="https://www.youtube.com/embed/YRnEY4znKp0?vq=hd1080&color=white" width="560" height="315" frameborder="0"></iframe>
                        </div>
                        <div className="feature_vides_row iframe-container">
                            <iframe src="https://www.youtube.com/embed/RJrPdBgirMY?vq=hd1080&color=white" width="560" height="315" frameborder="0"></iframe>
                        </div>
                    </div>
                </section>
                <div className="btc_shark">
                <a target='_blank' href='tel:+233203808479'>
                <img className="d-block w-100"  src={require('../../AllInOne/BTC_SHARK/A2 STICKER-01 (1).jpg')}
                    alt="First slide" />
                </a>
                
                </div>
                <div className="1x_bet bet_1X">
                    <a href="https://www.betway.com.gh/?btag=P89215-PR24497-CM76661-TS1948036" target="_blank" rel="nofollow"><img src="https://secure.betwaypartnersafrica.com/imagehandler/6ddbbca8-c8e2-4a02-a90b-7632674cf6bf/" border="0"  alt="" /></a>
                    </div>
                <section className='chanceMain'>
                        <div className='subHead'>
                            <h1> <span class="typed-text"></span><span class="cursor">&nbsp;</span></h1>
                        </div>
                    <div className='chance__now'>
                    <a target="_blank" href="https://kol.jumia.com/api/click/link/924b85fc-3cd4-45d5-8564-65b9d930d422/2ae79bea-a7cd-4fc0-9dbb-09204a6bcb66"><img src="https://kol.jumia.com/banners/fYNATNCzPGG6M9z5RQtIxtF2yM3PW4XVoUgQWYlF.jpeg" alt="Games Category"/></a>
                    </div>
                </section>
                <section className="check_music_name">
                    <ul>
                        {/* <li>{this.state.Spotify_CoolForNow_name.map(data => data.name)}</li> */}
                    </ul>
                </section>
               
               
                <section className='game__ads'>
                    <section className='about__game'>
                        <div className='about_game_text'>
                            <h1>All In One Boost</h1>
                            <h2>Play incredible games like Astro Bot Rescue Mission,Spider-Man,God of War, Blood and Truth and Dreams VR. etc</h2>
                        </div>
                        <div className='game__ads_start'>
                            <img src={require('../../VR__Pic/46f24237e05ea9d2fb80f4064225732a.jpg')} alt='pic'/>
                        </div>
                    </section>
                </section>
              
                <section className='pes5__family-main'>
                   <div className='famil__family'>
                        <div className='famil__family__text'>
                            <h1>Family Game boost</h1>
                            <h2>Enjoy faster and smoother frame rates in select PS4 and PS VR games.</h2>
                            <a href='' className='btn btn-warning'>Find More<i class="fas fa-arrow-circle-right"></i></a>
                        </div>
                        <div className='famil__family__img'>
                            <img src={require('../../VR__Pic/ps5-family-image-block-01-en-16sep20.png')} alt='pic'/>
                        </div>
                   </div>
                   <div className='family_info_img_other'>
                       <div className='other__img__text'>
                           <h2>Thrilling PS VR games and experiences</h2>
                       </div>
                        <img src={require('../../VR__Pic/psvr-overview-experiences-image-block-01-ps4-en-20oct20.png')} alt='pic'/>
                   </div>
                </section>
                {/* <section className='game__controller'>
                    <div className='controller__1'>
                        <div className='controller__img'>
                            <img src={require('../../VR__Pic/81JIRkv7mxL._SL1500_.jpg')} alt='pic'/>
                            <p>Rating</p>
                            <div className='icon'>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            </div>
                            <a href='' className='btn btn-warning'> free trial</a>
                        </div>
                        <div className='controller__img'>
                            <img src={require('../../VR__Pic/psvr-accessories-aim-controller-two-column-02-ps4-en-01jul19.png')} alt='pic'/>
                            <p>Rating</p>
                            <div className='icon'>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            <i class="fas fa-star"></i>
                            </div>
                            <a href='' className='btn btn-warning'> free trial</a>
                        </div>
                    </div>
                </section> */}
                <section className='other__brand'>
                    <h1>ACTION</h1>
                    <div className='brand__info'>
                        <div className='brand_info_img brand_img__radius'>
                            <img src={require('../../VR__Pic/young-woman-using-vr-glasses-with-neon-lights.jpg')} alt='pic'/>
                        </div>
                        <div className='brand_info_img brand_img__radius'>
                            <img src={require('../../VR__Pic/young-woman-wearing-vr-glasses.jpg')} alt='pic'/>
                        </div>
                        <div className='brand_info_img'>
                            <img src={require('../../VR__Pic/portrait-young-woman-playing-with-vr-headset-glasses-virtual-reality-isolated-studio-vr-headset-glasses-device-technology-concept.jpg')} alt='pic'/>
                        </div>
                        <div className='brand_info_img brand_img__radius'>
                            <img src={require('../../VR__Pic/young-man-s-pointing-using-vr-glasses-neon-light-gradient.jpg')} alt='pic'/>
                        </div>
                    </div>
                </section>
                <section className='img__adv__me'> 
                    <h1>Immerse yourself in incredible virtual reality games and experiences</h1>
                   <div className='both__adv_tag'>
                        <div className='img__me__tag_img img__me__tag_img_1 img__me__tag_img__height'>
                            <img src={require('../../VR__Pic/wp7938849.jpg')} alt='pic'/>
                        </div>
                        <div className='img__me__tag_img img__me__tag_img_2 img__me__tag_img '>
                            <img src={require('../../VR__Pic/Playstation-VR-4K (1).jpg')} alt='pic'/>
                        </div>
                   </div>
                </section>
                <section className='bitcoin__main'>
                    <div className='bitcoinTrade'>
                        <h3>THE BEST PLACE TO</h3>
                        <h1>Buy, Sell and Pay with Crypto</h1>
                        <div className='bitImg'>
                            <img src={require('../../VR__Pic/google-play-and-apple-app-store.jpg')} alt='pic'/>
                        </div>
                        <coingecko-coin-market-ticker-list-widget  coin-id="bitcoin" currency="usd" locale="en"></coingecko-coin-market-ticker-list-widget>
                    </div>
                </section>
                <section className='exchangeRate'>
                    <div className='exchangeNow'>
                        <div className='excahnge__text'>
                            <h1>Exchange</h1>
                            <h2>Powered by CRO, with Deep Liquidity, Low Fees and Best Execution Prices</h2>
                            <a href='' className='btn btn-warning'>SIGN-UP</a>
                        </div>
                        <div className='excahnge__img'>
                            <img src={require('../../VR__Pic/exchange-630a5df1.webp')} alt='pic'/>
                        </div>
                    </div>
                </section>
                <section className='exchangeRate_info'>
                    <div className='exchangeNow exchangeNow__mobile'>
                        <div className='excahnge__img excahnge__img__mobile'>
                            <img src={require('../../VR__Pic/index_wallet_iphonex-52a60db3.webp')} alt='pic'/>
                        </div>
                        <div className='excahnge__text excahnge__text__mobile'>
                            <h1>App</h1>
                            <h2>Buy 90+ Coins at True Cost No fees, No markups</h2>
                            <a href='' className='btn btn-warning'>Learn More</a>
                        </div>
                    </div>
                </section>
                <section className='bitCard'>
                    <div className='card__bit__text'>
                        <h1>Cards</h1>
                        <h2>Metal Visa Card with up to 8% back on spending</h2>
                        <p>Now availabe in South Africa, Ghana, Nigeria</p>
                        <a href='' class='btn btn-warning'>Learn More</a>
                    </div>
                    <div className='card__bit__img'>
                         <img src={require('../../VR__Pic/91cbedf77655c5c540e52b604972062c.jpg')} alt='pic'/>
                    </div>
                </section>
                <section className='section__section'>
                    <section className='Earn__main '>
                        <div className='earn__now__img'>
                            <img src={require('../../VR__Pic/index_earn_iphonex-311bdf2e.webp')} alt='pic'/>
                        </div>
                        <div className='earn__now__text'>
                            <h1>Earn</h1>
                            <h2>Deposit crypto, earn interest paid weekly in crypto</h2>
                            <a href='' className='btn btn-warning'>Learn More</a>
                        </div>
                    </section>
                    <section className='Earn__main'>
                        <div className='earn__now__text'>
                            <h1>Credit</h1>
                            <h2>Deposit crypto, get an instant loan</h2>
                            <a href='' className='btn btn-warning'>Learn More</a>
                        </div>
                        <div className='earn__now__img'>
                            <img src={require('../../VR__Pic/index_credit_iphonex-6b80aab8.webp')} alt='pic'/>
                        </div>
                    </section>
                </section>
            </div>
         );
    }
}
 
export default Selected;