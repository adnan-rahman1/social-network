import React, { Component } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';
import { toast } from 'react-toastify';

toast.configure()

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
    try {
      const res = await axios.post("http://localhost:5000/user/signup", { ...this.state });
      this.setState({ msg: res.data.msg });
      toast.success(this.state.msg, { autoClose: 2000, position: "bottom-right" });
    } catch (err) {
      this.setState({ msg: err.response.data.msg });
      toast.warn(this.state.msg, { autoClose: 2000, position: "bottom-right" });
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
          <MDBCol md="4">
            <form onSubmit={this.onSubmitForm}>
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
                />
                <MDBInput
                  name="email"
                  label="Your email"
                  icon="envelope"
                  group
                  type="email"
                  onChange={this.inputHandleChange}
                  value={email}
                />
                <MDBInput
                  name="password"
                  label="Your password"
                  icon="lock"
                  group
                  type="password"
                  onChange={this.inputHandleChange}
                  value={password}
                />
              </div>
              <div className="text-center">
                <MDBBtn type="submit" onClick={this.formControl} gradient="blue">Register</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  }
}

export default SignUp;