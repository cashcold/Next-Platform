import React, { Component } from "react";
import { Container } from "react-bootstrap";

const AUTH_URL = 
"https://accounts.spotify.com/authorize?client_id=7274681e5f564e29b6246893ed62f20a&response_type=code&redirect_uri=http://localhost:3000/Next-Platform-with-Sportify&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state";

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
