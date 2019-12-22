import React from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../loading";
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
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
  MDBModalFooter,
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
  ac_getSingleUser,
} from "../../../redux/actions-creator/user";


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }



  // when user click on update button this code will execute
  onSubmitForm = async (props, e) => {
    e.preventDefault();
    e.target.reset();

  };


  createPost = () => {

    return (
      <MDBContainer className="mt-5">
        <MDBRow center>
            <MDBCol md="6">
              <form
                method="put"
                onSubmit={e => this.onSubmitForm(this.props, e)}
                enctype="multipart/form-data"
              >
                <p className="h5 text-center mb-4">Create Post</p>
                <div className="grey-text">
                  <MDBInput
                    name="title"
                    label="Title"
                    icon="user"
                    group
                    type="text"
                    // _value={form_Name} 
                    // _onChange={this.inputChange} 
                    autocomplete="title"
                  />
                  <MDBInput
                    name="body"
                    type="textarea"
                    rows="2"
                    label="Body"
                    group
                    icon="pencil-alt"
                    autocomplete="textarea"
                  />
                </div>
                <div className="mt-3">
                  <MDBBtn
                    size="sm"
                    className="float-right"
                    type="submit"
                    color="primary"
                  >
                    Create post
                  </MDBBtn>
                </div>
              </form>
            </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  };
  render() {
    const { isAuthenticated } = this.props.r_boolean;
    if (this.state.redirect) return <Redirect to="/signout" />;
    
    if (!isAuthenticated) {
      return <Redirect to="/signin" />;
    }
    return this.createPost();

  }
}

const mapStateToProps = state => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean
});

export default connect(mapStateToProps, { })(CreatePost);