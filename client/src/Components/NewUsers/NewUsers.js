import React, { Component } from 'react';
import axios from 'axios';
import './NewUsers.css'; // Import the updated CSS file

class NewUsers extends Component {
  state = {
    users: [],
    loading: true
  };

  componentDidMount() {
    // Dynamic API URL for Vercel production vs local development
    const API_URL = process.env.REACT_APP_API_URL || '';

    // Fetch new users when the component is mounted
    axios.get(`${API_URL}/users/newusers`)
      .then(response => {
        // Handle variations in API payload structure safely
        const rawData = response.data;
        const userList = Array.isArray(rawData) 
          ? rawData 
          : (rawData && Array.isArray(rawData.users) ? rawData.users : []);

        this.setState({ users: userList, loading: false });
      })
      .catch(error => {
        console.error('There was an error fetching the users!', error);
        // Fall back to empty array to prevent render crashes
        this.setState({ users: [], loading: false });
      });
  }

  render() {
    const { users, loading } = this.state;

    return (
      <div className="NewUsers">
        <h2>Our Top Users For The Week</h2>

        {loading ? (
          <p>Loading top users...</p>
        ) : Array.isArray(users) && users.length > 0 ? (
          <ul>
            {users.map((user, index) => (
              <li key={user._id || user.id || index}>
                <img src={user.image} alt={user.username || "profile"} />
                <p>Username: {user.username}</p>
                <p>Country: {user.country}</p>
                <p>Gender: {user.gender}</p>
                <p className={`status ${user.status === 'online' ? 'online' : 'offline'}`}>
                  Status: {user.status}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No users available at this time.</p>
        )}
      </div>
    );
  }
}

export default NewUsers;