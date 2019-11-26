import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';


class SignUp extends Component {
  
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      msg: "",
    };
  }

  inputHandleChange = e => this.setState({ [e.target.name]: e.target.value });

  onSubmitForm = async (e) => {
    e.preventDefault();
    const { email, password } = this.state
    const [ firstName, lastName ] = this.state.name.split(" ");
    try {
      const res = await axios.post("http://localhost:5000/user/signup", {
        firstName,
        lastName,
        email,
        password
      });
      this.setState({ msg: res.data.msg });
    } catch (err) {
      this.setState({ msg: err.response.data.msg });
    }
    this.setState({ 
        name: "",
        email: "",
        password: "",
    });
  }

  render() {
    let { name, email, password } = this.state;
    return (
      <MDBContainer className="mt-5">
        <MDBRow center>
          <MDBCol md="6">
            <form id="form" onSubmit={this.onSubmitForm}>
              <p className="h5 text-center mb-4">Sign up</p>
              <div className="grey-text">
                <MDBInput
                  name="name"
                  label="Your name"
                  icon="user"
                  group
                  type="text"
                  onChange={this.inputHandleChange}
                  value={name}
                  required
                />
                <MDBInput
                  name="email"
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  onChange={this.inputHandleChange}
                  value={email}
                  required
                />
                <MDBInput
                  name="password"
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  onChange={this.inputHandleChange}
                  value={password}
                  required
                />
              </div>
              <div className="text-center">
                <MDBBtn type="submit" onClick={this.formControl} color="primary">Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SignUp;