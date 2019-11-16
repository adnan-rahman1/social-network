import React from 'react';
import { Redirect } from 'react-router-dom';

const UserProfile = ({ isLoggedIn,firstName, lastName }) => (
    <div>
        { isLoggedIn ? <h2>Profile</h2> : <Redirect to="/signin" /> }
        <p>First Name: {firstName}</p>
        <p>Last Name: {lastName}</p>
    </div>
);

export default UserProfile;