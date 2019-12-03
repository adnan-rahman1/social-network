import React from 'react';
import { Redirect } from 'react-router-dom';
import Loading from "../loading";

import { connect } from "react-redux";
import { ac_userSignOut } from "../../redux/actions-creator/user";

import { toast } from 'react-toastify';
toast.configure();

const isSignOut = async (props) => {
  await props.ac_userSignOut();
}

const signOut = (props) => {

  let { isLoading, isAuthenticated } = props.r_boolean;

  if(isAuthenticated) {
    isSignOut(props);
    return <Loading isLoading={isLoading} />
  }
  else {
      return <Redirect to="/signin" />
  }

}

const mapStateToProps = (state) => ({
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_userSignOut })(signOut);