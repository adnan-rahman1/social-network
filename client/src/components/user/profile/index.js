import React from 'react';
import { Redirect } from "react-router-dom";
import { MDBContainer ,MDBCardHeader, MDBInput, MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol, MDBRow } from 'mdbreact';


import { connect } from 'react-redux';
import { ac_userProfileUpdate } from "../../../redux/actions-creator/user";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      fileName: "Choose photo",
      photo: null,
    }
  }

  componentDidMount() {
    const { firstName, lastName, email } = this.props.r_user.user;
    this.setState({
      name: `${firstName} ${lastName}`,
      email,
    })
  }

  inputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }
  fileChange = (e) => {
    let name = e.target.files[0] === undefined ? "Choose photo" : e.target.files[0].name;
    this.setState({ photo: e.target.files[0], fileName: name })
  }

  onSubmitForm = async (props, e) => {
    e.preventDefault();
    let [ firstName, lastName ] = this.state.name.split(" ");
    lastName = lastName || "";
    const { _id } = props.r_user.user;
    e.target.reset();
    const user = {
      _id,
      firstName,
      lastName,
      email: this.state.email,
      photo: this.state.photo,
    }
    await props.ac_userProfileUpdate(user);
    this.setState({ name: "", email: "", photo: null });
  }
  
  userProfile = () => {
    const { name: form_name, email: form_email } = this.state;
    const { firstName, lastName, email, createdAt, updatedAt, avater } = this.props.r_user.user;
    return (
      <MDBContainer className="mt-5">
        <MDBRow center>
          <MDBCol md="6" className="mb-3 text-center">
            <MDBCard className="rounded">
              <MDBCardHeader color="blue-gradient">PROFILE INFORMATION</MDBCardHeader>
              <MDBCardImage className="w-25 mt-3 img-thumbnail mx-auto rounded" src={ avater ? `data:image/jpeg;base64,${avater}` : "https://mdbootstrap.com/img/Photos/Avatars/avatar-1.jpg"} />
              <MDBCardBody>
                <MDBCardTitle>{`${firstName} ${lastName}`}</MDBCardTitle>
                <MDBCardText>
                  Email: { email }<br/>
                  Created at: { new Date(createdAt).toLocaleDateString() }<br />
                  Updated at: {updatedAt ? new Date(updatedAt).toLocaleDateString() : "N/A" }
                </MDBCardText>
                <MDBBtn href="#" size="sm" color="primary">More</MDBBtn>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol md="6">
            <form method="put" onSubmit={(e) => this.onSubmitForm(this.props, e)} enctype="multipart/form-data">
              <p className="h5 text-center mb-4">UPDATE</p>
              <div className="grey-text">
                <MDBInput
                  name="name"
                  label="Name"
                  icon="user"
                  group
                  type="text"
                  value={form_name}
                  onChange={this.inputChange}
                  required
                />
                <MDBInput
                  name="email"
                  label="Email"
                  icon="envelope"
                  group
                  type="email"
                  value={form_email}
                  onChange={this.inputChange}
                  required
                />
                <div className="input-group">
                  <div className="input-group-prepend">
                    <span className="input-group-text" id="inputGroupFileAddon01">
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
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                      { this.state.fileName }
                    </label>
                  </div>
                </div>
              </div>
              <div className="mt-3">
                <MDBBtn size="sm" className="float-right" type="submit" color="primary">Update</MDBBtn>
                <MDBBtn size="sm" className="float-left" color="danger">Delete</MDBBtn>
              </div>
            </form>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    )
}
  render() {
    const { isAuthenticated } = this.props.r_boolean; 

    if(isAuthenticated)
      return this.userProfile()
    
    return <Redirect to="/" />
  }
}
const mapStateToProps = (state) => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean,
});
  
export default connect(mapStateToProps, { ac_userProfileUpdate })(Profile);