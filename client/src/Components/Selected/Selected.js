import React, { Component } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import {Card,Button} from 'react-bootstrap'
import './style.css'
import {TimelineLite, TimelineMax} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger'

class Selected extends Component {
    constructor(props) {
        super(props);
        this.state = { 
        currency: '',
        home_url: ''
        }
    }

   componentDidMount(){
       const home_url =  window.location.origin
        localStorage.setItem('home_url',home_url)
        
        this.setState({
            home_url
        })
      
       setTimeout(()=>{
        toast.dark(
            <div className='logoImg animate__animated animate__slower animate__flash welcome_trans_h4'>
                <h1> <h4>HARMONIZE FT DIAMOND</h4></h1>
                <Card>
                    <Card.Header as="h5">Featured</Card.Header>
                    <Card.Body>
                        <Card.Title>Special title treatment</Card.Title>
                        <Card.Text>
                        <img src={require('../../AllInOne/next_platform_img/ab67616d0000b2736a1f5bea27488489a5c6d604.jpg')} alt='pic'/>
                        With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Find More</Button>
                    </Card.Body>
                    </Card>
            </div>, {
            position: "top-center",
            autoClose: 15000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
            // 40000
       },40000)
       setTimeout(()=>{
        toast.dark(
            <div className='logoImg animate__animated animate__slower animate__rubberBand welcome_trans_h4'>
                <h1> <h4>BASE ON THE MOMENT PLATFORM FOCUSE ON POINT AFRICA TALENT</h4></h1>
                <Card>
                    <Card.Header as="h5">ABOUT NEXT-PLATFORM</Card.Header>
                    <Card.Body>
                        <Card.Title>FOCUSE</Card.Title>
                        <Card.Text>
                        <img src={require('../../AllInOne/next_platform_img/images.jpg')} alt='pic'/>
                        With supporting text below as a natural lead-in to additional content.
                        </Card.Text>
                        <Button variant="primary">Find More</Button>
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
        // gsap.registerPlugin(ScrollTrigger)
        // const RegisterparallaxTrigger = () =>{
        //     const check_parallax_main = document.querySelector('.check_parallax_main')
        //     const para_box_1 = document.querySelector('.para_box_1')
        //     const para_box_2 = document.querySelector('.para_box_2')
        //     const para_box_3 = document.querySelector('.para_box_3')
        //     const para_box_4 = document.querySelector('.para_box_4')
        //     const para_box_5 = document.querySelector('.para_box_5')

        //     const check_parallax_bar_ATl  =  new TimelineLite({
        //         ScrollTrigger: {
        //             trigger:  check_parallax_main,
        //             start: "50% 100%",
        //             scrub: 1,
        //             toggleActions: "restart none none none",
        //             pin: para_box_1, para_box_2, para_box_3, para_box_4, para_box_5,
                    
                    
        //         }
        //     }) 
        //     check_parallax_bar_ATl.from(para_box_1,{opacity: 0, duration: 1.8, ease: "none", x:'-2000', }) 
        //     check_parallax_bar_ATl.from(para_box_2,{opacity: 0, duration: 1.8, ease: "none", y:'2000', }) 
        //     check_parallax_bar_ATl.from(para_box_3,{opacity: 0, duration: 1.8, ease: "none", x:'-2000', }) 
        //     check_parallax_bar_ATl.from(para_box_4,{opacity: 0, duration: 1.8, ease: "none", y:'-2000', }) 
        //     check_parallax_bar_ATl.from(para_box_5,{opacity: 0, duration: 1.8, ease: "none", x:'2000', }) 
        // }

        // RegisterparallaxTrigger()

     
   }
   

    render() { 
        
        return ( 
            <div className='SelectedMain'>
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
                <section className='chanceMain'>
                        <div className='subHead'>
                            <h1> <span class="typed-text"></span><span class="cursor">&nbsp;</span></h1>
                        </div>
                    <div className='chance__now'>
                        <h2>Answere Our Random Qustion and Win Free PES</h2>
                        <a href='' className='btn btn-success
                        '>GET START</a>
                        <img src={require('../../VR__Pic/Playstation-VR-Wallpapers.jpg')} alt='pic'/>
                        
                    </div>
                </section>
                <section className='check_para'>
                    <section className='div-container '  id="section-beaches"> 
                        <div className="parallax parallax1">
                            <div id="div-span-beaches" className="text">
                            Amazing Beaches
                            </div>
                        </div>
                    </section>
                    <section className='div-container '  id="section-civilization">
                        <div className="parallax parallax2">
                            <div id="div-span-beaches" className="text">
                            Rich Ancient Civilization
                            </div>
                        </div>
                    </section>
                    <section className='div-container '  id="section-places">
                        <div className="parallax parallax3">
                            <div id="div-span-beaches" className="text">
                            Wonderful Places to GO
                            </div>
                        </div>
                    </section>
                </section>
                {/* <section className='check_parallax_main'>
                    <div className="parallax_box_main">
                        <div className="div-container">
                             <div className="parallax para_box_1">1</div>
                        </div>
                        <div className="div-container">
                             <div className="parallax para_box_2">2</div>
                        </div>
                        <div className="div-container">
                             <div className="parallax para_box_3">3</div>
                        </div>
                        <div className="div-container">
                             <div className="parallax para_box_4">4</div>
                        </div>
                        <div className="div-container">
                             <div className="parallax para_box_5">5</div>
                        </div>
                    </div>
                </section> */}
                {/* <section className='pes__soccer__main'>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/wp6963865.jpg')} alt='pic'/>
                        
                    </div>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/331212e60a5a281b46d47e7d05d15f8f.jpg')} alt='pic'/>
                    </div>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/wp3144431.jpg')} alt='pic'/>
                    </div>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/wp8181191.jpg')} alt='pic'/>
                    </div>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/2cf5c6a8332a22bf6f06c32f32b5b6f0.jpg')} alt='pic'/>
                    </div>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/Free-Fire-feature-3-1024x576.jpg')} alt='pic'/>
                    </div>
                    <div className='pesSoccer boxCard'>
                        <img src={require('../../VR__Pic/thumb-1920-516677.jpg')} alt='pic'/>
                    </div>
                </section> */}
                <section className='game__ads'>
                     <div className='game__A'>
                        <div className='game__text'>
                            <h1>PlayStation.VR</h1>
                            <h2>Immerse yourself in incredible virtual reality games and experiences</h2>
                            <p>Slip on your VR headset. Grab your PlayStation controller. And immerse yourself in the thrill of live sporting action as you’ve never experienced it before. Sport comes alive with silk-smooth visuals, social connectivity and sports data insight. It’s like being right there at the match, only more so.</p>
                            <a href='' className='btn btn-warning'>FREE TRAILS</a>
                        </div>
                        <div className='game__img_main'>
                            <img src={require('../../VR__Pic/Playstation-VR-Desktop.jpg')} alt='pic'/>
                        </div>
                    </div>
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
                        <div className='controller__img'>
                            <img src={require('../../VR__Pic/61yV1psEMRL._SL1001_.jpg')} alt='pic'/>
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
                            <img src={require('../../VR__Pic/71r3bTcTzJL._AC_SL1500_.jpg')} alt='pic'/>
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
                            <img src={require('../../VR__Pic/norbert-levajsics-dUx0gwLbhzs-unsplash.jpg')} alt='pic'/>
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
                            <img src={require('../../VR__Pic/psvr-accessories-move-controllers-two-column-02-ps4-en-01jul19.png')} alt='pic'/>
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
                            <img src={require('../../VR__Pic/61BufB-e62L._AC_SL1000_.jpg')} alt='pic'/>
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
                            <img src={require('../../VR__Pic/playstation-5-with-dualsense-front-product-shot-01-ps5-en-30jul20.png')} alt='pic'/>
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
                        <div className='img__me__tag_img img__me__tag_img__height'>
                            <img src={require('../../VR__Pic/wp7938849.jpg')} alt='pic'/>
                        </div>
                        <div className='img__me__tag_img img__me__tag_img '>
                            <img src={require('../../VR__Pic/Playstation-VR-4K (1).jpg')} alt='pic'/>
                        </div>
                   </div>
                </section>
                 <section className='free__shippment'>
                    <div className='freeShippment'>
                        <h1>FREE SHIPPMENT </h1>
                        <img src={require('../../VR__Pic/denise-jans-HoqYAnwR-1g-unsplash.jpg')} alt='pic'/>
                        <h2>$80.00</h2>
                        <a href='' className='btn btn-success'>BUY NOW</a>
                    </div>
                    <div className='freeShippment'>
                        <h1>FREE SHIPPMENT </h1>
                        <img src={require('../../VR__Pic/Playstation-VR-Computer-Wallpaper.jpg')} alt='pic'/>
                        <h2>$280.00</h2>
                        <a href='' className='btn btn-success'>BUY NOW</a>
                    </div>
                </section>
                <section className='free__shippment'>
                    <div className='freeShippment'>
                        <h1>FREE SHIPPMENT </h1>
                        <img src={require('../../VR__Pic/norbert-levajsics-dUx0gwLbhzs-unsplash.jpg')} alt='pic'/>
                        <h2>$100.00</h2>
                        <a href='' className='btn btn-success'>BUY NOW</a>
                    </div>
                    <div className='freeShippment'>
                        <h1>FREE SHIPPMENT </h1>
                        <img src={require('../../VR__Pic/Playstation-VR-Pictures.jpg')} alt='pic'/>
                        <h2>$300.00</h2>
                        <a href='' className='btn btn-success'>BUY NOW</a>
                    </div>
                </section>
                <section className='bitcoin__main'>
                    <div className='bitcoinTrade'>
                        <h3>THE BEST PLACE TO</h3>
                        <h1>Buy, Sell and Pay with Crypto</h1>
                        <div className='bitImg'>
                            <img src={require('../../VR__Pic/google-play-and-apple-app-store.jpg')} alt='pic'/>
                        </div>
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