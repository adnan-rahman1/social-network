import React, { Component } from "react";
import { withRouter } from 'react-router-dom';
import {
MDBNavbar, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavLink, MDBNavbarToggler, MDBCollapse
} from "mdbreact";

import axios from 'axios';

import { toast } from 'react-toastify';
toast.configure()


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

  componentDidMount = async () => {
    console.log("Calling from the navbar js...");
    const token = localStorage.getItem('token');

    try {
      const res = await axios.post("http://localhost:5000/auth", {
      }, { headers: {"Authorization" : `Bearer ${token}` }});
      toast.success(res.data.msg, { autoClose: 2000, position: "bottom-right" });
      this.props.isSignedIn();
    } catch (err) {
        toast.info(err.response.data.msg, { autoClose: 2000, position: "bottom-right" });
    }
  }
  
  render() {
    const { pathname } = this.props.location;

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
                this.props.isAuthenticated ? 
                <MDBNavItem>
                  <MDBNavLink to="/signout">Sign out</MDBNavLink>
                </MDBNavItem> :
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

export default withRouter(NavBar);