import React from "react";
import { Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow
} from "mdbreact";
import { connect } from "react-redux";
import { ac_getAllUsers } from "../../redux/actions-creator/user";


class User extends React.Component {

  componentDidMount = async () => {
    await this.props.ac_getAllUsers();
  }

  getAllUserData(user) {
    let avater = Buffer.from(user.avater.data).toString("base64");
    return (
      <MDBCol md="4">
        <MDBCard className="rounded">
          <MDBCardImage
            className="w-25 mt-3 img-thumbnail mx-auto rounded"
            src={
              user.avater
                ? `data:image/jpeg;base64,${avater}`
                : "https://tinyurl.com/srnc4qu"
            }
          />
          <MDBCardBody>
            <MDBCardTitle>{user.name}</MDBCardTitle>
            <MDBCardText>
              Email: { user.email }
              <br />
              Joined at: {new Date(user.createdAt).getFullYear()}
            </MDBCardText>
            <MDBBtn href="#" size="sm" color="primary">
              view profile
            </MDBBtn>
          </MDBCardBody>
        </MDBCard>
      </MDBCol>
    )
  }
  
  render() {
    const { all_user } = this.props.r_user;

    if (!this.props.r_boolean.isAuthenticated) {
      return <Redirect to="/" />
    }

    return (
      <MDBContainer className="mt-5 text-center">
        <MDBRow>
          { all_user.map(user => this.getAllUserData(user)) }
        </MDBRow>
      </MDBContainer>
    )
  }
}

const mapStateToProps = state => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_getAllUsers })(User)