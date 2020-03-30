import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { resetErrors } from "../redux/actions"; // <-- unnecessary import

/*
 *
 * You don't need to check for user in the ternary
 * operator around the Login link.
 *
 */

const Welcome = ({ user }) => (
  <header className="masthead d-flex">
    {user ? <Redirect to="/secret" /> : <></>}
    <div className="container text-center my-auto z-1">
      <h1 className="mb-1">WELCOME TO CHATR</h1>
      <h3 className="mb-5">
        <em>You're gonna need to login to see the messages</em>
      </h3>
      {!user ? (
        <Link to="/login" className="btn btn-primary btn-lg">
          Login
        </Link>
      ) : (
        <></>
      )}
    </div>
    <div className="overlay z-0" />
  </header>
);

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(Welcome);
