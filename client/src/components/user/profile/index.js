import React from 'react';
import { MDBContainer, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';
import userProfile from "../../../r_components/user/profile.controller";

const onSubmitForm = async (id, setUser, e) => {
  e.preventDefault();
  const [ firstName, lastName ] = e.target.username.value.split(" ");
  const user = {
    id,
    firstName,
    lastName,
    email: e.target.email.value
  }
  const updatedUser = await userProfile.updateUserProfile(user);
  setUser(updatedUser);
}
const Profile = ({user, setUser}) => {
  return (
    <MDBContainer className="mt-5">
      <MDBRow>
        <MDBCol md="6">
          <MDBCard style={{ width: "22rem" }}>
            <MDBCardImage className="img-fluid" src="https://mdbootstrap.com/img/Photos/Others/images/43.jpg" waves />
            <MDBCardBody>
              <MDBCardTitle>{ `${user.firstName} ${user.lastName}`}</MDBCardTitle>
              <MDBCardText>
                Email: { user.email }<br/>
                Created at: { new Date(user.createdAt).toLocaleDateString() }
              </MDBCardText>
              <MDBBtn href="#">MDBBtn</MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
        <MDBCol md="6">
          <form onSubmit={(e) => onSubmitForm(user._id, setUser, e)}>
            <p className="h5 text-center mb-4">Edit Profile</p>
            <div className="grey-text">
              <MDBInput
                name="username"
                label={`${user.firstName} ${user.lastName}`}
                icon="user"
                group
                type="text"
                validate
                error="wrong"
                success="right"
              />
              <MDBInput
                name="email"
                label={ user.email }
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

export default Profile;