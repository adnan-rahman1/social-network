import React from 'react';
import { Redirect } from "react-router-dom";
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer,MDBCardImage } from "mdbreact";

import { connect } from "react-redux";
import {
  ac_getAllPost
} from "../../../redux/actions-creator/post";

class GetAllPosts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount = () => {
    this.props.ac_getAllPost();
  }

  getAllPosts = (post) => {
    let avater = post.postedBy.avater && Buffer.from(post.postedBy.avater.data).toString("base64");
    return (
      <MDBContainer>
        <MDBCard className="card-body" style={{ width: "50em", marginTop: "1rem" }}>
          <div className="mb-2">
            <a href="#" className="mr-2 float-left d-inline-block">
              <MDBCardImage
                className="rounded-circle"
                style={{ width: "3rem" }}
                src={
                  post.postedBy.avater
                    ? `data:image/jpeg;base64,${avater}`
                    : "https://tinyurl.com/srnc4qu"
                }
              />
            </a>
            <a className="d-inline-block" href="#">{ post.postedBy.name }</a>
            <small className="d-block">Published at: {new Date(post.createdAt).toLocaleDateString()}</small>
          </div>
          <MDBCardTitle>{ post.title }</MDBCardTitle>
          <MDBCardText>
            { post.body }
          </MDBCardText>
          <div className="flex-row">
            <a href="#!">MDBCard link</a>
            <a href="#!" style={{ marginLeft: "1.25rem" }}>Another link</a>
          </div>
        </MDBCard>
      </MDBContainer>
    )
  }

  render() {

    const { isAuthenticated } = this.props.r_boolean;
    const { posts } = this.props.r_post;

    if (!isAuthenticated) {
      return <Redirect to="/signin" />;
    }
    return (
      posts.map(post => this.getAllPosts(post))
    )
  }
};

const mapStateToProps = state => ({
  r_user: state.r_user,
  r_post: state.r_post,
  r_boolean: state.r_boolean
});

export default connect(mapStateToProps, { ac_getAllPost })(GetAllPosts);