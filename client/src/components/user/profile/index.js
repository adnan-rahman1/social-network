import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';

import { connect } from 'react-redux';
import { ac_userProfileUpdate } from "../../../redux/actions-creator/user";

const onSubmitForm = async (props, e) => {
  e.preventDefault();
  const [ firstName, lastName ] = e.target.username.value.split(" ");
  const { _id } = props.r_user.user;
  const user = {
    _id,
    firstName,
    lastName,
    email: e.target.email.value
  }
  await props.ac_userProfileUpdate(user);
}
const profile = (props) => {
  const { firstName, lastName, email, createdAt, updatedAt } = props.r_user.user;
  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="6">
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>{ `${firstName} ${lastName}`}</MDBCardTitle>
              <MDBCardText>
                Email: { email }<br/>
                Created at: { new Date(createdAt).toLocaleDateString() }<br />
                Updated at: {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A" }
              </MDBCardText>
              <MDBBtn href="#">MDBBtn</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="6">
          <form onSubmit={(e) => onSubmitForm(props, e)}>
            <p className="h5 text-center mb-4">Update Profile</p>
            <div className="grey-text">
              <MDBInput
                name="username"
                label="Name"
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                name="email"
                label="Email"
                icon="envelope"
                group
                type="email"
                validate
                error="wrong"
                success="right"
              />
            </div>
            <div className="text-center">
              <MDBBtn type="submit" color="primary">Update</MDBBtn>
            </div>
          </form>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}
const mapStateToProps = (state) => ({
  r_user: state.r_user,
});
  
export default connect(mapStateToProps, { ac_userProfileUpdate })(profile);