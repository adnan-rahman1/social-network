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
import { ac_getAllUsers, ac_getSingleUser } from "../../redux/actions-creator/user";

class User extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      showUserPublicProfile: false,
    }
  }

  componentDidMount = async () => {
    await this.props.ac_getAllUsers();
  }

  viewUserProfileHandler = async (id) => {
    await this.props.ac_getSingleUser(id);
    this.props.history.push(`/user/profile/${id}`);
    this.setState({ showUserPublicProfile: true });
  }

  getAllUserData(user) {
    let avater = Buffer.from(user.avater.data).toString("base64");
    return (
      <MDBCol md="4" className="mt-3">
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
            <MDBBtn size="sm" color="primary" onClick={() => this.viewUserProfileHandler(user._id)}>
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

    if (this.state.showUserPublicProfile) {
      return (
        <div>
          <h1>Hello world</h1>
        </div>
      )
    }
    else {
      return (
        <MDBContainer className="text-center">
          <MDBRow>
            { all_user.map(user => this.getAllUserData(user)) }
          </MDBRow>
        </MDBContainer>
      )
    }
  }
}

const mapStateToProps = state => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_getAllUsers, ac_getSingleUser })(User)