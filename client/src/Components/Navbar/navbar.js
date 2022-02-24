import React, { Component } from 'react';
import './style.css'
import 'animate.css'
import {Carousel,Container,Nav} from 'react-bootstrap'
import {TimelineLite} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger'
import Other__NavBar from '../other_Navbar/other_nav';
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            clientId: '7274681e5f564e29b6246893ed62f20a',
            redirectUri: 'http://localhost:3000/music',
         }
    }




    componentDidMount(){
         window.addEventListener('scroll',()=>{
            const header = document.querySelector('.navMain')
            header.classList.toggle('sticky',window.scrollY > 0);
        })
      
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
                            <ul className='links'>
                                <li><a className='btn btn-two' href='/' style={{color: "red"}}>HOME </a></li>
                                <li><a className='btn btn-two' href='/music'>MUSIC</a></li>
                                <li><a className='btn btn-two' href='/link_box'>LinkBox</a></li>
                                <li><a className='btn btn-two' href='/product-main'>PRODUCTS</a></li>
                                <li><a className='btn btn-two' href='/sport-main-home'>SPORT</a></li>
                                <li><a className='btn btn-two' href='/watch_next'>WATCH NEXT</a></li>
                                <li><a className='btn btn-two' href='/tranding'>TRANDING</a></li>
                                <li><a className='btn btn-two' href='/food-main-home'>FOOD</a></li>
                                <li><a className='btn btn-two' href='/drinks-main'>Drinks</a></li>
                                <li><a className='btn btn-two' href='/about-us'>ABOUT US</a></li>
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
                     {/* <marquee className='marqueeText'>
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit ut ab accusamus doloremque facilis temporibus modi numquam repudiandae doloribus debitis?</p>
                           <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae, vel.</p>
                           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Alias ea voluptatem dolore hic ab et?</p>
                       </marquee> */}
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
                                    <h3 className='top_form_capt_h3'>PEPSI COFFEE</h3>
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
             
            </div>
         );
    }
}
 
export default Navbar;