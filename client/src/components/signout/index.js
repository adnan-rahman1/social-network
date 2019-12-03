import React from 'react';
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { ac_userSignOut } from "../../redux/actions-creator/user";

import { toast } from 'react-toastify';
toast.configure();

const isSignOut = (props) => {
  props.ac_userSignOut();
}

const signOut = (props) => {
  const { isAuthenticated } = props.r_boolean;
  if (isAuthenticated) {
    isSignOut(props);
  }
  return <Redirect to="/signin" />
}

const mapStateToProps = (state) => ({
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_userSignOut })(signOut);