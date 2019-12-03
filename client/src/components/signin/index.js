import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from "../loading";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import { connect } from "react-redux";
import { ac_userSignInSignUp } from "../../redux/actions-creator/user";


import { toast } from 'react-toastify';
import { SIGN_IN } from '../../redux/actions';


toast.configure()


const onSubmitForm = async (e, props) => {
  e.preventDefault();
  const user = {
    email: e.target.email.value,
    password: e.target.password.value,
  }
  await props.ac_userSignInSignUp(user, SIGN_IN);
}


const signInForm = (props) => {
  const { isLoading } = props.r_boolean;
  return (
    <MDBContainer className="mt-5">
      <MDBRow center>
        <MDBCol md="4">
          <form onSubmit={(e) => onSubmitForm(e, props)}>
            <p className="h5 text-center mb-4">
              <span>Sign in</span>
              <span>{ isLoading && <Loading isLoading={isLoading} /> }</span>
            </p>
              
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

  const { isAuthenticated } = props.r_boolean;
  
  if (isAuthenticated)
    return <Redirect to="/" />

  return (
    signInForm(props)
  );
}

const mapStateToProps = (state) => ({
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_userSignInSignUp })(signIn);