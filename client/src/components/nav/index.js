import React from 'react';
import Header from "../header";
import { NavLink } from 'react-router-dom';



const NavBar = (props) => {
    return (
    <nav>
        <Header />
        <ul>
            <li><NavLink exact to="/" activeStyle={{ fontWeight: "bold", color: "blue" }}>Home</NavLink></li>
            <li><NavLink to="/todo" activeStyle={{ fontWeight: "bold", color: "blue" }}>Todo</NavLink></li>
            <li><NavLink to="/profile" activeStyle={{ fontWeight: "bold", color: "blue" }}>Profile</NavLink></li>
            {   
                props.isLoggedIn ?
                    <li><NavLink to="/" onClick={props.signOut}>Sign Out</NavLink></li>
                : <span>
                    <li><NavLink to="/signin" onClick={() => props.setMsg("")} activeStyle={{ fontWeight: "bold", color: "blue" }}>Sign In</NavLink></li>
                    <li><NavLink to="/signup" onClick={() => props.setMsg("")} activeStyle={{ fontWeight: "bold", color: "blue" }}>Sign Up</NavLink></li>
                </span>
            }
        </ul>
    </nav>
    )
}

export default NavBar;