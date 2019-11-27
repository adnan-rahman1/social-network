import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';

import { toast } from 'react-toastify';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

toast.configure()
const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;

class SignUp extends Component {
  
  constructor(props) {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      redirect: false,
      loading: false,
    };
  }

  componentDidMount() {
    console.log("Calling the api from signup...");
  }

  inputHandleChange = e => this.setState({ [e.target.name]: e.target.value });

  resetFormField() {
    this.setState({
      name: "",
      email: "",
      password: "",
      loading: false,
    });
  }

  onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const res = await axios.post("http://localhost:5000/user/signup", { ...this.state });
      toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
      this.setState({ redirect: true });
    } catch (err) {
      toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
      this.resetFormField();
    }
  }

  isLoading () {
    return (
      <div className='sweet-loading'>
        <BarLoader
          css={override}
          height={6}
          width={200}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    )
  }

  signUpForm(name, email, password) {
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
    )
  }

  render() {
    let { name, email, password, redirect, loading } = this.state;

    if (redirect)
      return <Redirect to="/signin" />

    return (
      loading ? this.isLoading() : this.signUpForm(name, email, password)
    );  
  }
}

export default SignUp;