import React from 'react';
import Router from './components/router';

import { css } from '@emotion/core';
import BarLoader from 'react-spinners/BarLoader';

import { connect } from "react-redux";
import { ac_userAuthentication } from "./redux/actions-creator/user";

const override = css`
    display: block;
    margin: 150px auto;
    border-color: red;
`;

class App extends React.Component {
  
  componentDidMount = async () => {
    await this.props.ac_userAuthentication();
  }

  loading = () => {
    return (
      <div className='sweet-loading'>
        <BarLoader
          css={override}
          height={6}
          width={200}
          color={'#123abc'}
          loading={true}
          />
      </div>
    )
  }

  render() {
    const { isLoading } = this.props.r_boolean;
    return (
      isLoading ? this.loading() : <Router />
    )
  }
}

const mapStateToProps = (state) => ({
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_userAuthentication })(App);