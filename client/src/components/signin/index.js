import React from 'react';
import { Redirect } from 'react-router-dom';
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import { connect } from "react-redux";
import { ac_userSignInSignOut } from "../../redux/actions-creator/user";

import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

import { toast } from 'react-toastify';
import { SIGN_IN } from '../../redux/actions';


toast.configure()
const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;


const onSubmitForm = async (e, props) => {
  e.preventDefault();
  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  }
  await props.ac_userSignInSignOut(user, SIGN_IN);
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

const signInForm = (props) => {
  return (
    <MDBContainer className="mt-5">
      <MDBRow center>
        <MDBCol md="4">
          <form onSubmit={(e) => onSubmitForm(e, props)}>
            <p className="h5 text-center mb-4">Sign in</p>
            <div className="grey-text">
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
              <MDBBtn type="submit" gradient="blue">Sign in</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

const signIn = (props) => {

  const { isLoading, isAuthenticated } = props.r_boolean;
  
  if (isAuthenticated)
    return <Redirect to="/" />

  return (
    isLoading ? loading() : signInForm(props)
  );
}

const mapStateToProps = (state) => ({
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_userSignInSignOut })(signIn);