import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

import { toast } from 'react-toastify';
import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

toast.configure();
const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;

class SignOut extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      loading: true,
    };
  }
  
  isSignOut = async () => {
    let res = await axios.get("http://localhost:5000/user/signout");
    if (res.status === 200) {
        localStorage.removeItem("token");
        toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
        this.setState({ redirect: true, loading: false })
    }
    this.props.isAuthenticate("", false);
  }

  isLoading () {
    return (
      <div className='sweet-loading'>
        <BarLoader
          css={override}
          height={6}
          width={200}
          color={'#123abc'}
          loading={this.state.loading}
        />
      </div>
    )
  }
  componentDidMount() {
    this.isSignOut();
  }

  render() {
    let { loading, redirect } = this.state;
    
    if (redirect)
        return <Redirect to="/signin" />
    return loading && this.isLoading();

  }
}

export default SignOut;