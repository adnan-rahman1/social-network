import React from "react";
import { Redirect } from "react-router-dom";
import Loading from "../../loading";
import {
  MDBContainer,
  MDBInput,
  MDBBtn,
  MDBCol,
  MDBRow,

} from "mdbreact";

import { connect } from "react-redux";
import {
  ac_createPost
} from "../../../redux/actions-creator/post";


class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
  }

  // when user click on update button this code will execute
  onSubmitForm = async (props, e) => {
    e.preventDefault();
    e.target.reset();
    const createPostData = {
      title: e.target.title.value,
      body: e.target.body.value,
    }
    this.props.ac_createPost(createPostData);
  };

  inputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };


  createPost = () => {

    let { title, body } = this.state;

    return (
      <MDBContainer className="mt-5">
        <MDBRow center>
            <MDBCol md="6">
              <form
                method="post"
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
                    value={title} 
                    onChange={this.inputChange} 
                    autocomplete="title"
                  />
                  <MDBInput
                    name="body"
                    type="textarea"
                    rows="2"
                    label="Body"
                    group
                    icon="pencil-alt"
                    value={body}
                    onChange={this.inputChange}
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
    // if (this.state.redirect) return <Redirect to="/signout" />;
    
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

export default connect(mapStateToProps, { ac_createPost })(CreatePost);