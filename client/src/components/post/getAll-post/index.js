import React from 'react';
import { MDBCard, MDBCardTitle, MDBCardText, MDBContainer } from "mdbreact";

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

  render() {
    return (
      <MDBContainer>
        <MDBCard className="card-body" style={{ width: "22rem", marginTop: "1rem" }}>
          <MDBCardTitle>Panel Title</MDBCardTitle>
          <MDBCardText>
            Some quick example text to build on the panel title and make up the
            bulk of the panel's content.
          </MDBCardText>
          <div className="flex-row">
            <a href="#!">MDBCard link</a>
            <a href="#!" style={{ marginLeft: "1.25rem" }}>Another link</a>
          </div>
        </MDBCard>
      </MDBContainer>
    );
  }
};

const mapStateToProps = state => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean
});

export default connect(mapStateToProps, { ac_getAllPost })(GetAllPosts);