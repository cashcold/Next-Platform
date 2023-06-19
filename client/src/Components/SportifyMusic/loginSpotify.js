import React, { Component } from "react";
import { Container } from "react-bootstrap";

const AUTH_URL =
"https://accounts.spotify.com/authorize?client_id=4e2ccdd89a0847bc992b541f5e5e6f73&response_type=code&redirect_uri=http://localhost:3000/Next-Platform-with-Sportify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

class LoginSpotify extends Component {
  render() {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ minHeight: "100vh" }}
      >
        <a className="btn btn-success btn-lg" href={AUTH_URL}> 
          Login To Next-platform Music Chart Box 
        </a> 
      </Container>
    );
  }
}

export default LoginSpotify;
