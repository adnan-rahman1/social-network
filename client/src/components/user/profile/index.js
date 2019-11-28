import React from 'react';
import { MDBContainer, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol } from 'mdbreact';

const Profile = ({user}) => {
  console.log(typeof user.createdAt);
  return (
    <MDBContainer className="mt-5">
    <MDBCol>
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
    </MDBContainer>
  )
}

export default Profile;