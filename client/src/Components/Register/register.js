import React, { Component } from 'react';
import './style.css'
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';


class RegisterMain extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            full_name: '',
            user_Name: '',
            email: '',
            phone: '',
            password: '',
            confirm_password: '',
            ip_address: '',
            checkBox: '',
            date: '',
            refferReward: '',
            referrer: '',
            restartLinkPassword: ''
         }

        this.handleChange = this.handleChange.bind(this)
        this.onSubmit = this.onSubmit.bind(this)
    }

    handleChange = input => (event)=>{
        this.setState({[input]: event.target.value})
        
    }

    componentDidMount(){

        const  referrer = localStorage.getItem('reffer')
        this.setState({
            referrer
        })

        const DateTime = new Date().toString()
        this.setState({
            date: DateTime
        })
        
        fetch('http://api.ipify.org/?format=json').then(res => res.json()).then(data => this.setState({
            ip_address: data.ip
        }))

    }

    onSubmit = (event)=>{ 
        event.preventDefault()
        const SaveNewUser = {
            full_name: this.state.full_name,
            user_Name : this.state.user_Name,
            password: this.state.password,
            email: this.state.email,
            phone: this.state.phone,
            refferReward: this.state.refferReward,
            referrer: this.state.referrer,
            ip_address: this.state.ip_address,
            checkBox: this.state.checkBox,
            date: this.state.date
            
        }

        console.log(`this is new user register ${SaveNewUser}`)

       if(SaveNewUser.full_name.length < 6){
        toast.warn('Full Name  must be at lest 6')
        return false
        }
       if(SaveNewUser.user_Name.length < 4){
        toast.warn('User Name  must be at lest 4')
        return false
        }
        if(SaveNewUser.password.length < 6){
            toast.warn('password is must be at lest 6')
            return false
        }
       
        if(!SaveNewUser.full_name || !SaveNewUser.user_Name || !SaveNewUser.phone || !SaveNewUser.password || !SaveNewUser.confirm_password  || !SaveNewUser.email){
            toast.error('Please Fill All Field')
            return false;
        }
        if(SaveNewUser.password != SaveNewUser.confirm_password){
            toast.warn('password do not match')
            return false
        }
        if(!SaveNewUser.checkBox){ 
            toast.warn('Please agree with Terms and conditions on Next-platform')
            return false
        }
    //    axios.post("users/register/",SaveNewUser).then(res => {toast.success("Register Successful")}).then(res => setTimeout(()=>{
    //         window.location="/login"
    //     }),8000).catch(err => {toast.error(err.response.data)})

    }


    render() { 
        return ( 
            <div className='login__main'>
                <section className='login__section_1 login__section_1_register'>
                <ToastContainer/>
                    <div className="login__box_1">
                        {/* <h1><span>Sign</span> up</h1> */}
                        <h3>NEXT-PLATFORM MEMBERSHIP</h3>
                        <div className="login__forms">
                            <div className='myForms'>
                                <input type='text' name='fullName' placeholder='Full Name' onChange={this.handleChange('full_name')}/>
                            </div>
                            <div className='myForms'>
                                <input type='text' name='user_Name' placeholder='User Name' onChange={this.handleChange('user_Name')}/>
                            </div>
                            <div className='myForms'>
                                <input type='email' name='email' placeholder='Email' onChange={this.handleChange('email')}/>
                            </div>
                            <div className='myForms'>
                                <input type='tel' name='phone' placeholder='Phone Number' onChange={this.handleChange('phone')}/>
                            </div>
                            <div className='myForms'>
                                 <input type='password' name='password' placeholder='Password' onChange={this.handleChange('password')} />
                            </div>
                            <div className='myForms'>
                                 <input type='password' name='password' placeholder='Confirm Password'  onChange={this.handleChange('confirm_password')}/>
                            </div>
                          
                        </div>
                        <div className="log__btn">
                             <div className='upfont'>
                                 <p> referrer:<br/> {this.state.referrer} </p>
                                <p><input type='radio' name='checkbox'  onChange={this.handleChange('checkBox')}/> I agree with Terms and conditions</p>
                                <a href='' className='btn btn-warning' onClick={this.onSubmit}>CREATE ACCOUNT</a>
                             </div>
                        </div>
                    </div>
                </section>
                {/* <section className='login_section_2'>
                    <img src={require('../../images/cryptocurrency-3305671_1920.jpg')}/>
                </section> */}
            </div>
         );
    }
}
 
export default RegisterMain;