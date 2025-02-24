import React, { Component } from 'react';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import './SignUpPage.css'; // Importing the CSS file

class SignUpPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_Name: '',
      email: '',
      password: '',
      confirm_password: '',
      phone: '',
      country: '',
      referrer: '',
      refferReward: 0,
      offer: 0,
      accountBalance: 50,
    };
  }

  componentDidMount() {
    const referrer = localStorage.getItem('referrer')

    this.setState({referrer: referrer})
  }

  handleInputChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(this.state);

      const SaveNewUser = {      
        user_Name: this.state.user_Name,
        password: this.state.password,
        confirm_password: this.state.confirm_password,
        email: this.state.email,
        phone: this.state.phone,
        country: this.state.country,
        accountBalance: this.state.accountBalance,
        referrer: this.state.referrer,
        refferReward: this.state.refferReward,
        offer: this.state.offer,
        // date: this.state.date
        
    }

  if(SaveNewUser.user_Name.length < 6){
    toast.warn('User name  must be at lest 6 characters')
    return false
    }
    if(SaveNewUser.password.length < 8){
        toast.warn('password is must be at lest 8')
        return false
    }
    
    if(SaveNewUser.password != SaveNewUser.confirm_password){
        toast.warn('password do not match')
        return false
    }
  
    if(!SaveNewUser.user_Name || !SaveNewUser.phone || !SaveNewUser.password || !SaveNewUser.confirm_password  || !SaveNewUser.email  || !SaveNewUser.country){
        toast.error('Please Fill All Field')
        return false;
    }
    // if(!SaveNewUser.checkBox){ 
    //     toast.warn('Please agree with Terms and conditions')     
    //     return false
    // }
  axios.post("http://localhost:8000/users/registerNewUser/",SaveNewUser).then(res => {toast.success("Register Successful")}).then(res => setTimeout(()=>{
        window.location="/login"
    }),8000).catch(err => {toast.error(err.response.data)})

  console.log(SaveNewUser)


    }

  render() {
    const { referrer } = this.state; // Destructure referrer from state

    return (
      <div className="signup-container">
        <div className="signup-header">
        <ToastContainer/>
          <h1 className="animate-h1">Gamify Your Experience</h1>
          <p className="reward-text">🎁 Sign up today and receive a $5 reward!</p>
          <p className="animate-text">Sign up now to start earning points, badges, and rewards!</p>
          {referrer && (
            <p className="referrer-text">You were referred by <strong>{referrer}</strong></p>
          )}
        </div>
        
        <form className="signup-form" onSubmit={this.handleSubmit}>
          {/* Form fields */}
          <div className="form-group animate-div">
            <label>Username</label>
            <input 
              type="text" 
              name="user_Name" 
              value={this.state.user_Name} 
              onChange={this.handleInputChange}
              placeholder="Enter your username" 
            />
          </div>
          
          <div className="form-group animate-div">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={this.state.email} 
              onChange={this.handleInputChange}
              placeholder="Enter your email" 
            />
          </div>

          <div className="form-group animate-div">
            <label>Password</label>
            <input 
              type="password" 
              name="password" 
              value={this.state.password} 
              onChange={this.handleInputChange}
              placeholder="Enter your password" 
            />
          </div>
          <div className="form-group animate-div">
            <label>Confirm Password</label>
            <input 
              type="password" 
              name="confirm_password" 
              value={this.state.confirm_password} 
              onChange={this.handleInputChange}
              placeholder="Confirm Password" 
            />
          </div>

          <div className="form-group animate-div">
            <label>Phone Number</label>
            <input 
              type="tel" 
              name="phone" 
              value={this.state.phone} 
              onChange={this.handleInputChange}
              placeholder="Enter your phone number" 
            />
          </div>

          <div className="form-group animate-div">
            <label>Country</label>
            <select 
              name="country" 
              value={this.state.country} 
              onChange={this.handleInputChange}
            >
            <option value="">Select your country</option>
            <option value="Afghanistan">Afghanistan</option>
            <option value="Albania">Albania</option>
            <option value="Algeria">Algeria</option>
            <option value="Andorra">Andorra</option>
            <option value="Angola">Angola</option>
            <option value="Antigua and Barbuda">Antigua and Barbuda</option>
            <option value="Argentina">Argentina</option>
            <option value="Armenia">Armenia</option>
            <option value="Australia">Australia</option>
            <option value="Austria">Austria</option>
            <option value="Azerbaijan">Azerbaijan</option>
            <option value="Bahamas">Bahamas</option>
            <option value="Bahrain">Bahrain</option>
            <option value="Bangladesh">Bangladesh</option>
            <option value="Barbados">Barbados</option>
            <option value="Belarus">Belarus</option>
            <option value="Belgium">Belgium</option>
            <option value="Belize">Belize</option>
            <option value="Benin">Benin</option>
            <option value="Bhutan">Bhutan</option>
            <option value="Bolivia">Bolivia</option>
            <option value="Bosnia and Herzegovina">Bosnia and Herzegovina</option>
            <option value="Botswana">Botswana</option>
            <option value="Brazil">Brazil</option>
            <option value="Brunei">Brunei</option>
            <option value="Bulgaria">Bulgaria</option>
            <option value="Burkina Faso">Burkina Faso</option>
            <option value="Burundi">Burundi</option>
            <option value="Cabo Verde">Cabo Verde</option>
            <option value="Cambodia">Cambodia</option>
            <option value="Cameroon">Cameroon</option>
            <option value="Canada">Canada</option>
            <option value="Central African Republic">Central African Republic</option>
            <option value="Chad">Chad</option>
            <option value="Chile">Chile</option>
            <option value="China">China</option>
            <option value="Colombia">Colombia</option>
            <option value="Comoros">Comoros</option>
            <option value="Congo (Congo-Brazzaville)">Congo</option>
            <option value="Costa Rica">Costa Rica</option>
            <option value="Croatia">Croatia</option>
            <option value="Cuba">Cuba</option>
            <option value="Cyprus">Cyprus</option>
            <option value="Czech Republic">Czech Republic</option>
            <option value="Denmark">Denmark</option>
            <option value="Djibouti">Djibouti</option>
            <option value="Dominica">Dominica</option>
            <option value="Dominican Republic">Dominican Republic</option>
            <option value="Ecuador">Ecuador</option>
            <option value="Egypt">Egypt</option>
            <option value="El Salvador">El Salvador</option>
            <option value="Equatorial Guinea">Equatorial Guinea</option>
            <option value="Eritrea">Eritrea</option>
            <option value="Estonia">Estonia</option>
            <option value="Eswatini">Eswatini</option>
            <option value="Ethiopia">Ethiopia</option>
            <option value="Fiji">Fiji</option>
            <option value="Finland">Finland</option>
            <option value="France">France</option>
            <option value="Gabon">Gabon</option>
            <option value="Gambia">Gambia</option>
            <option value="Georgia">Georgia</option>
            <option value="Germany">Germany</option>
            <option value="Ghana">Ghana</option>
            <option value="Greece">Greece</option>
            <option value="Grenada">Grenada</option>
            <option value="Guatemala">Guatemala</option>
            <option value="Guinea">Guinea</option>
            <option value="Guinea-Bissau">Guinea-Bissau</option>
            <option value="Guyana">Guyana</option>
            <option value="Haiti">Haiti</option>
            <option value="Honduras">Honduras</option>
            <option value="Hungary">Hungary</option>
            <option value="Iceland">Iceland</option>
            <option value="India">India</option>
            <option value="Indonesia">Indonesia</option>
            <option value="Iran">Iran</option>
            <option value="Iraq">Iraq</option>
            <option value="Ireland">Ireland</option>
            <option value="Israel">Israel</option>
            <option value="Italy">Italy</option>
            <option value="Jamaica">Jamaica</option>
            <option value="Japan">Japan</option>
            <option value="Jordan">Jordan</option>
            <option value="Kazakhstan">Kazakhstan</option>
            <option value="Kenya">Kenya</option>
            <option value="Kiribati">Kiribati</option>
            <option value="Kuwait">Kuwait</option>
            <option value="Kyrgyzstan">Kyrgyzstan</option>
            <option value="Laos">Laos</option>
            <option value="Latvia">Latvia</option>
            <option value="Lebanon">Lebanon</option>
            <option value="Lesotho">Lesotho</option>
            <option value="Liberia">Liberia</option>
            <option value="Libya">Libya</option>
            <option value="Liechtenstein">Liechtenstein</option>
            <option value="Lithuania">Lithuania</option>
            <option value="Luxembourg">Luxembourg</option>
            <option value="Madagascar">Madagascar</option>
            <option value="Malawi">Malawi</option>
            <option value="Malaysia">Malaysia</option>
            <option value="Maldives">Maldives</option>
            <option value="Mali">Mali</option>
            <option value="Malta">Malta</option>
            <option value="Mauritania">Mauritania</option>
            <option value="Mexico">Mexico</option>
            <option value="Monaco">Monaco</option>
            <option value="Morocco">Morocco</option>
            <option value="Mozambique">Mozambique</option>
            <option value="Myanmar">Myanmar</option>
            <option value="Namibia">Namibia</option>
            <option value="Nepal">Nepal</option>
            <option value="Netherlands">Netherlands</option>
            <option value="New Zealand">New Zealand</option>
            <option value="Nicaragua">Nicaragua</option>
            <option value="Niger">Niger</option>
            <option value="Nigeria">Nigeria</option>
            <option value="Norway">Norway</option>
            <option value="Oman">Oman</option>
            <option value="Pakistan">Pakistan</option>
            <option value="Panama">Panama</option>
            <option value="Peru">Peru</option>
            <option value="Philippines">Philippines</option>
            <option value="Poland">Poland</option>
            <option value="Portugal">Portugal</option>
            <option value="Qatar">Qatar</option>
            <option value="Romania">Romania</option>
            <option value="Russia">Russia</option>
            <option value="Saudi Arabia">Saudi Arabia</option>
            <option value="South Africa">South Africa</option>
            <option value="Spain">Spain</option>
            <option value="Sweden">Sweden</option>
            <option value="Switzerland">Switzerland</option>
            <option value="Thailand">Thailand</option>
            <option value="Turkey">Turkey</option>
            <option value="United Kingdom">United Kingdom</option>
            <option value="United States">United States</option>
            <option value="Venezuela">Venezuela</option>
            <option value="Vietnam">Vietnam</option>
            <option value="Yemen">Yemen</option>
            <option value="Zimbabwe">Zimbabwe</option>

            </select>
          </div>
          
          <button type="submit" className="signup-button">Sign Up</button>
          <div className="signup-link animate-text">
          <p>You have an account? <a href="login">Login </a></p>
        </div>
        </form>
      </div>
    );
  }
}

export default SignUpPage;
