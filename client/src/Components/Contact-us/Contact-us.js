import React, { Component } from 'react';
import './style.css'
class ContactMain extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className='mainContact'>
                <section className='contactNow'>
                    <h1><span>CONTACT WITH US</span></h1>
                <div className='bothAll'>
                             <div className='bothSupportB'>
                            <div className='supportLine'>
                                <div className='supportNow'>
                                    <div className='lineSupport'>
                                        <h1>SEND <span>US MAIL</span></h1>
                                        <p>Taking care of our customers is important at Next-platform. So we've made it easy for you to find help when you need it online 24/7.</p>
                                    </div>
                                </div>
                                <div className='contactDiv'>
                                   <div className='formA'>
                                        <form className='myFormControl'>
                                            <div className='myForms'>
                                                <input type='text' name='name' placeholder='Name'/>
                                            </div>
                                            <div className='myForms'>
                                                <input type='email' name='name' placeholder='Email'/>
                                            </div>
                                            <div className='myForms'>
                                                <textarea name='message' placeholder='Message Us'></textarea>
                                            </div>
                                            <a href='' className='btn btn-danger contactBtn'>Send</a>
                                        </form>
                                   </div>
                                </div>
                            </div>
                        </div>
                        <div className='bothSupportA'>
                            <div className='bothMenu bothMenuCount1' >
                                <div className='supportInfo'>
                                    <h1> <i class="fas fa-envelope-square fa-3x"></i></h1>
                                    <h4>OUR <span>E-MAIL</span></h4>
                                    <p>next-platform@gmail.com</p>
                                </div>
                            </div>
                            <div className='bothMenu bothMenuCount2' >
                                <div className='supportInfo'>
                                    <h1><i class="fas fa-phone fa-3x"></i></h1>
                                    <h4>PHONE <span>NUMBER</span> </h4>
                                    <p>0203808479</p>
                                    <p>0268253787</p>
                                </div>
                            </div>
                            <div className='bothMenu bothMenuCount3'>
                                <div className='supportInfo'>
                                <h1><i class="fas fa-address-card fa-3x"></i></h1>
                                    <h4>ADDRESS <span>INFO</span></h4>
                                    <p>Country:  Ghana</p>
                                    <p>City: Arcca Tema</p>
                                    <p>Tema Comm. 10 SOS, 114 Apple avneu</p>
                                </div>
                            </div>  
                        </div>

                    </div>
                </section>
            </div>
         );
    }
}
 
export default ContactMain;