import React from 'react';
import { Redirect } from "react-router-dom";
import { MDBContainer, MDBRow, MDBCol, MDBBtn, MDBInput } from 'mdbreact';

import { toast } from 'react-toastify';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';


import { connect } from "react-redux";
import { ac_notification } from "../../redux/actions-creator/notification";
import { ac_registerUser } from "../../redux/actions-creator/user";
import { ac_loading } from "../../redux/actions-creator/loading";

toast.configure()
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
  props.ac_loading(true);
  await props.ac_registerUser(user);
  props.ac_loading(false);
  props.ac_notification("");
}

const signUpForm = (props) => {

  let { msg } = props.r_notification;

  if (msg !== "") {
    toast.info(msg)
  }
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


const isLoading = () => {
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


const SignUp = (props) => {
  
  if (false)
    return <Redirect to="/signin" />
  
  return(
    props.r_loading.isLoading ? isLoading() : signUpForm(props)
  );  
}
  
const mapStateToProps = (state) => ({
  r_registerUser: state.r_registerUser,
  r_notification: state.r_notification,
  r_loading: state.r_loading,
});
  
export default connect(mapStateToProps, { ac_registerUser, ac_loading, ac_notification })(SignUp);