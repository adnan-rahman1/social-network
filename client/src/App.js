import React from 'react';
import Router from './components/router';
import Loading from "./components/loading";


import { connect } from "react-redux";
import { ac_userAuthentication } from "./redux/actions-creator/user";


class App extends React.Component {
  
  componentDidMount = async () => {
    await this.props.ac_userAuthentication();
  }

  render() {
    const { isPageLoading } = this.props.r_boolean;
    return (
      isPageLoading ? <Loading isLoading={isPageLoading} /> : <Router />
    )
  }
}

const mapStateToProps = (state) => ({
  r_boolean: state.r_boolean,
});

export default connect(mapStateToProps, { ac_userAuthentication })(App);