import React, { Component } from 'react';
import './style.css'
import 'animate.css'
import {Carousel,Container,Nav} from 'react-bootstrap'
import {TimelineLite} from 'gsap'
import {gsap} from 'gsap'
import{ScrollTrigger} from 'gsap/ScrollTrigger'
class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
        return ( 
            <div className=' navbarMain'>
               <section className='navMain '>
                   <nav>
                       <div className='logoImg animate__animated animate__slower animate__flash'>
                         <h1>NEXT-PLATFORM</h1>
                       </div>
                       <div className='nav__links animate__animated animate__slower animate__bounceInDown'>
                           <ul className='links'>
                               <li><a href='/' style={{color: "red"}}>HOME </a></li>
                               <li><a href='/about-us'>ABOUT US</a></li>
                               <li><a href='/faqs'>FAQS</a></li>
                               <li><a href='/faqs'>FAQS</a></li>
                               <li><a href='/agent-form'>SUPPORT</a></li>
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
                                <img className="d-block w-100"  src={require('../../AllInOne/fresh_on/maxresdefault-1.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3 className='top_form_capt_h3'>JOIN IPHONE PROMO!!!</h3>
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
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/photo-1621428674699-90ec7bae03c9.jpg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>CORONA EXTRA</h3>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className="d-block w-100"  src={require('../../AllInOne/next_platform_img/Crayon.jpeg')}
                                    alt="First slide"
                                />
                                <Carousel.Caption>
                                    <h3>CRAYON</h3>
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