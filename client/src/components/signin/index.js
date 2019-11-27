import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';
import axios from 'axios';

import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

import { toast } from 'react-toastify';
toast.configure()
const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;

class SignIn extends Component {
  
  constructor(props) {
    super();
    this.state = {
      email: "",
      password: "",
      redirect: false,
      loading: false,
    };
  }

  componentDidMount() {
    console.log("Calling the api from singin...");
  }

  inputHandleChange = e => this.setState({ [e.target.name]: e.target.value });

  resetFormField() {
    this.setState({
      email: "",
      password: "",
      loading: false,
    });
  }
  
  onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      this.setState({ loading: true });
      const res = await axios.post("http://localhost:5000/user/signin", { ...this.state });
      if (res.status === 200) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
        this.setState({ redirect: true})
        this.props.isSignedIn();
      }
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

  signInForm(email, password) {
    return (
      <MDBContainer className="mt-5">
        <MDBRow center>
          <MDBCol md="4">
            <form onSubmit={this.onSubmitForm}>
              <p className="h5 text-center mb-4">Sign in</p>
              <div className="grey-text">
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
                <MDBBtn type="submit" gradient="blue">Sign in</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
  }

  render() {
    let { email, password, redirect, loading } = this.state;
    
    if (redirect)
      return <Redirect to="/" />

    return (
      loading ? this.isLoading() : this.signInForm(email, password)
    );
  }
}

export default SignIn;