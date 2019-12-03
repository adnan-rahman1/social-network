import React from 'react';
import { Redirect } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import { toast } from 'react-toastify';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';


import { connect } from "react-redux";
import { SIGN_UP } from "../../redux/actions";
import { ac_userSignInSignOut } from "../../redux/actions-creator/user";


toast.configure();
const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;

const onSubmitForm = async (e, props) => {
  e.preventDefault();
  const user = {
    name: e.target.name.value,
    email: e.target.email.value,
    password: e.target.password.value,
  }
  await props.ac_userSignInSignOut(user, SIGN_UP);
}

const signUpForm = (props) => {

  return (
    <MDBContainer className="mt-5">
      <MDBRow center>
        <MDBCol md="4">
          <form onSubmit={(e) => onSubmitForm(e, props)}>
            <p className="h5 text-center mb-4">Sign up</p>
            <div className="grey-text">
              <MDBInput
                name="name"
                label="Your name"
                icon="user"
                group
                type="text"
                />
              <MDBInput
                name="email"
                label="Your email"
                icon="envelope"
                group
                type="email"
                />
              <MDBInput
                name="password"
                label="Your password"
                icon="lock"
                group
                type="password"
                />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" gradient="blue">Register</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

const loading = () => {
  return (
    <div className='sweet-loading'>
      <BarLoader
        css={override}
        height={6}
        width={200}
        color={'#123abc'}
        loading={true}
        />
    </div>
  )
}

const signUp = (props) => {
  const { isLoading, isAuthenticated } = props.r_boolean;
  
  if (isAuthenticated)
    return <Redirect to="/" />
  
  return (
    isLoading ? loading() : signUpForm(props)
  );  
}
  
const mapStateToProps = (state) => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean,
});
  
export default connect(mapStateToProps, { ac_userSignInSignOut })(signUp);