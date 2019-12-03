import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
  MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse,
  MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem
} from "mdbreact";

import { connect } from "react-redux";
import { ac_userAuthentication } from "../../redux/actions-creator/user";
  
import { toast } from 'react-toastify';
toast.configure();



class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      site_name: "<{ AR }>",
      isOpen: false,
    };
    
  }
  
  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }

  isActive = (history) => {
    console.log(history);
  }

  render() {
    const { pathname } = this.props.location;
    const { isAuthenticated } = this.props.r_boolean;
    const { firstName, lastName } = this.props.r_user.user;

    return (
        <MDBNavbar color="blue-gradient" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">{this.state.site_name}</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
            <MDBNavbarNav left>
              <MDBNavItem active={ pathname === "/" && "active" }>
                <MDBNavLink to="/">Home</MDBNavLink>
              </MDBNavItem>
              { 
                isAuthenticated ? 
                <MDBNavItem>
                  <MDBDropdown>
                    <MDBDropdownToggle nav caret>
                      { `${firstName} ${lastName}` }
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                      <MDBDropdownItem>
                        <MDBNavLink className="blue-text" to="/profile">Your profile</MDBNavLink>
                      </MDBDropdownItem>
                      <MDBDropdownItem>
                        <MDBNavLink className='blue-text' to="/signout">Sign Out</MDBNavLink>
                      </MDBDropdownItem>
                    </MDBDropdownMenu>
                  </MDBDropdown>
                </MDBNavItem>
                  :
                <React.Fragment>
                  <MDBNavItem active={ pathname === "/signin" && "active" }>
                    <MDBNavLink to="/signin">Sign In</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem active={ pathname === "/signup" && "active" }>
                    <MDBNavLink to="/signup">Register</MDBNavLink>
                  </MDBNavItem>
                </React.Fragment>
              }
            </MDBNavbarNav>
          </MDBCollapse>
        </MDBNavbar>
      );
    }
  }

const mapStateToProps = (state) => ({
  r_user: state.r_user,
  r_boolean: state.r_boolean,
});
export default connect(mapStateToProps, { ac_userAuthentication })(withRouter(NavBar))