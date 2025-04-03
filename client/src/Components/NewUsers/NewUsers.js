import React, { Component } from 'react';
import axios from 'axios';
import './NewUsers.css'; // Import the updated CSS file

class NewUsers extends Component {
  state = {
    users: []
  };

  componentDidMount() {
    // Fetch new users when the component is mounted
    axios.get('/users/newusers')
      .then(response => {
        this.setState({ users: response.data });
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
      });
  }

  render() {
    return (
      <div className="NewUsers">
        <h2>Our Tops Users For The Week</h2>
        <ul>
          {this.state.users.map((user, index) => (
            <li key={index}>
              <img src={user.image} alt="profile" />
              <p>Username: {user.username}</p>
              <p>Country: {user.country}</p>
              <p>Gender: {user.gender}</p>
              <p 
              className={`status ${user.status === 'online' ? 'online' : 'offline'}`}
            >
              Status: {user.status}
            </p> {/* Change color based on status */}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default NewUsers;
