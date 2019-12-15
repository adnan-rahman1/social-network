import React from "react";
import { Redirect } from "react-router-dom";
import {
  MDBContainer,
  MDBCardHeader,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBCol,
  MDBRow,
  MDBModal, MDBModalBody, MDBModalHeader, MDBModalFooter,
  MDBMask,
  MDBView,
  MDBDropdown,
  MDBBtnGroup,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem
} from "mdbreact";



import { connect } from "react-redux";
import { 
  ac_userProfileUpdate, 
  ac_getSingleUser, 
  ac_deleteUser,
  ac_userFollowAndUnfollow 
} from "../../../redux/actions-creator/user";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      _id: "",
      name: "",
      email: "",
      fileName: "Choose photo",
      photo: null,
      modal14: false,
      redirect: false,
    };
  }

  componentDidMount = async () => {
    
    const { _id, name, email } = this.props.r_user.user; // auth state only used for update information
    this.setState({
      _id,
      name,
      email,
    });

  }
  
  static getDerivedStateFromProps = async (nextProps, prevState) => {
    if (nextProps.match.params.id !== nextProps.r_user.single_user._id) {
      await nextProps.ac_getSingleUser(nextProps.match.params.id);
    }
  }

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  fileChange = e => {
    let name =
      e.target.files[0] === undefined ? "Choose photo" : e.target.files[0].name;
    this.setState({ photo: e.target.files[0], fileName: name });
  };

  onSubmitForm = async (props, e) => {
    e.preventDefault();
    e.target.reset();

    const { name: formName, email: formEmail, photo } = this.state;
    const { _id, name, email, avater } = props.r_user.user;

    // console.log(Buffer.from(avater));
    const user = {
      _id,
      name: formName || name,
      email: formEmail || email,
      photo: photo || avater
    };
    await props.ac_userProfileUpdate(user);
    this.setState({ photo: null, fileName: "Choose photo" });
  };

  onFollow = async (followerId, followingId) => {
    await this.props.ac_userFollowAndUnfollow(followerId, followingId);
  }
  
  deleteUser = async id => {
    await this.props.ac_deleteUser(id);
    this.setState({ redirect: true });
  }

  toggle = nr => () => {
    let modalNumber = 'modal' + nr
    this.setState({
      [modalNumber]: !this.state[modalNumber]
    });
  }

  userProfile = () => {
    const { name: form_Name, email: form_email } = this.state;
    const {
      _id,
      name,
      email,
      createdAt,
      updatedAt,
      avater
    } = this.props.r_user.single_user;

    const { following: followings } = this.props.r_user.user;

    let following = (this.props.r_user.user._id !== _id) && followings.filter(following => following._id === _id).length > 0;

    return (
      <MDBContainer className="mt-5">
        <MDBRow center>
          <MDBCol md="6" className="mb-3 text-center">
            <MDBCard className="rounded">
              <MDBCardHeader color="blue-gradient">
                PROFILE INFORMATION
              </MDBCardHeader>
              <MDBView hover>
                <MDBCardImage
                  className="w-25 mt-3 mx-auto img-thumbnail rounded"
                  src={
                    avater
                    ? `data:image/jpeg;base64,${avater}`
                    : "https://tinyurl.com/srnc4qu"
                  }
                />
                <MDBMask 
                  style={{cursor:'pointer'}} 
                  className="w-25 mt-3 mx-auto rounded flex-center" 
                  overlay="black-strong"
                  onClick={() => console.log("Hello world")}
                >
                  <p className="white-text">View Photo</p>
                </MDBMask>
              </MDBView>
              <MDBCardBody>
                <MDBCardTitle>{name}</MDBCardTitle>
                <MDBCardText>
                  Email: {email}
                  <br />
                  Created at: {new Date(createdAt).toLocaleDateString()}
                  <br />
                  Updated at:{" "}
                  {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A"}
                  
                </MDBCardText>
                { this.props.r_user.user._id !== _id ? 
                <MDBBtnGroup>
                  <MDBBtn onClick={() => this.onFollow(this.props.r_user.user._id, _id)} size="sm" style={{ marginRight: 0 }} color="success" disabled={following}>
                    { following ? "Following" : "Follow" }
                  </MDBBtn>
                  <MDBDropdown size="sm">
                    <MDBDropdownToggle style={{ borderRadius:0, marginLeft: 0, padding:5, paddingRight:8 }} caret color="success" />
                    <MDBDropdownMenu color="success">
                      <MDBDropdownItem>Unfollow</MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBBtnGroup> 
                : "" }
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          { this.props.r_user.user._id === this.props.r_user.single_user._id ? 
          <MDBCol md="6">
            <form
              method="put"
              onSubmit={e => this.onSubmitForm(this.props, e)}
              enctype="multipart/form-data"
            >
              <p className="h5 text-center mb-4">UPDATE</p>
              <div className="grey-text">
                <MDBInput
                  name="name"
                  label="Name"
                  icon="user"
                  group
                  type="text"
                  value={form_Name}
                  onChange={this.inputChange}
                  autocomplete="name"
                />
                <MDBInput
                  name="email"
                  label="Email"
                  icon="envelope"
                  group
                  type="email"
                  value={form_email}
                  onChange={this.inputChange}
                  autocomplete="email"
                />
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span
                      className="input-group-text"
                      id="inputGroupFileAddon01"
                    >
                      Upload
                    </span>
                  </div>
                  <div className="custom-file">
                    <input
                      name="photo"
                      onChange={this.fileChange}
                      type="file"
                      className="custom-file-input"
                      id="inputGroupFile01"
                      aria-describedby="inputGroupFileAddon01"
                    />
                    <label
                      className="custom-file-label"
                      htmlFor="inputGroupFile01"
                    >
                      {this.state.fileName}
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <MDBBtn
                  size="sm"
                  className="float-right"
                  type="submit"
                  color="primary"
                >
                  Update
                </MDBBtn>
                <MDBBtn size="sm" className="float-left" color="danger" onClick={this.toggle(14)}>
                  Delete
                </MDBBtn>
              </div>
            </form>
          </MDBCol>
          : 
          "" }
        </MDBRow>
        <MDBModal isOpen={this.state.modal14} toggle={this.toggle(14)} centered>
          <MDBModalHeader toggle={this.toggle(14)}>Delete Account</MDBModalHeader>
          <MDBModalBody>
            You are about to delete your account. Are you sure you want to delete your account?
            <MDBCardImage
                className="mt-3 img-thumbnail mx-auto rounded"
                src={
                  avater
                    ? `data:image/jpeg;base64,${avater}`
                    : "https://tinyurl.com/srnc4qu"
                }
              />
          </MDBModalBody>
          <MDBModalFooter>
            <MDBBtn color="primary" onClick={this.toggle(14)}>No</MDBBtn>
            <MDBBtn color="danger" onClick={() => this.deleteUser(_id)}>Yes</MDBBtn>
          </MDBModalFooter>
        </MDBModal>
      </MDBContainer>
    );
  };
  render() {
    const { isAuthenticated } = this.props.r_boolean;
    if (this.state.redirect) return <Redirect to="/signout" />

    if (isAuthenticated) return this.userProfile();

    return <Redirect to="/" />;
  }
}
const mapStateToProps = state => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean
});

export default connect(mapStateToProps, { 
  ac_userProfileUpdate, 
  ac_getSingleUser, 
  ac_userFollowAndUnfollow,
  ac_deleteUser 
})(Profile);
