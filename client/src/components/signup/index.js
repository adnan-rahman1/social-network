import React from "react";
import axios from 'axios';
import { Redirect } from 'react-router-dom';

const userRegistered = async (props, e) => {
    e.preventDefault();
    try {
        const res = await axios.post("http://localhost:5000/user/signup", {
            firstName: e.target.firstName.value,
            lastName: e.target.lastName.value,
            email: e.target.email.value,
            password: e.target.password.value,
        });
        props.setMsg(res.data.msg);
        if(res.data.redirect) {
            props.setRedirect();
        }
    } catch (err) {
        props.setMsg("Something went wrong");
    }
}

const SignUp = (props) => (
    <div>
        <h2>Sign Up</h2>
        <p>{ props.msg || "Please sign up to continue"  }</p>
        <form onSubmit={e => userRegistered(props, e)}>
            <input type="text" name="firstName" placeholder="First Name" required/><br/>
            <input type="text" name="lastName" placeholder="Last Name" required/><br/>
            <input type="email" name="email" placeholder="Email" required/><br/>
            <input type="password" name="password" placeholder="Password" required/><br/>
            <button>Sign Up</button>
        </form>
        { 
            props.isLoggedIn ? <Redirect to="/" /> :
            ( props.redirect && <Redirect to={{ pathname: "/signin", redirect: props.setRedirect() }} /> )
        }
    </div>
)

export default SignUp;