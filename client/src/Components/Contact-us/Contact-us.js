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
                <div className='bothAll'>
                        <div className='bothSupportA'>
                            <div className='bothMenu bothMenuCount1' >
                                <div className='supportInfo'>
                                    <h1> <i class="fas fa-envelope-square fa-3x"></i></h1>
                                    <h4>OUR E-MAIL</h4>
                                    <p>nextplatfrom2@gmail.com</p>
                                </div>
                            </div>
                            <div className='bothMenu bothMenuCount2' >
                                <div className='supportInfo'>
                                    <h1><i class="fas fa-phone fa-3x"></i></h1>
                                    <h4>PHONE NUMBER </h4>
                                    <p>+16692544417</p>
                                    <p>+12812319819</p>
                                </div>
                            </div>
                            <div className='bothMenu bothMenuCount3'>
                                <div className='supportInfo'>
                                <h1><i class="fas fa-address-card fa-3x"></i></h1>
                                    <h4>ADDRESS LINE</h4>
                                    <p>State: New York</p>
                                    <p>City: BRONX</p>
                                    <p>Street: 2340  Jerry Dove Drive</p>
                                </div>
                            </div>  
                        </div>
                        <div className='bothSupportB'>
                            <div className='supportLine'>
                                <div className='supportNow'>
                                    <div className='lineSupport'>
                                        <h1>SEND US A MESSAGE</h1>
                                        <p>Get in touch with us any time you need an assistance. We are available 24/7 to answer your queries, We are here to guide you with anything you need.</p>
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
                                            <a href='' className='btn btn-warning contactBtn'>Send</a>
                                        </form>
                                   </div>
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