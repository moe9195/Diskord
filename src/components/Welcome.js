import React from "react";
import { Link, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const Welcome = ({ user, darkmode }) => (
  <header className="masthead d-flex">
    {user ? <Redirect to="/secret" /> : <></>}
    <div className="container text-center my-auto z-1">
      <h1 className="mb-1">WELCOME TO CHATR</h1>
      <h3 className="mb-5">
        <em>You're gonna need to login to see the messages</em>
      </h3>
      {!user ? (
        <Link
          to="/login"
          className={
            darkmode ? "btn btn-primary btn-lg" : "btn btn-primary btn-lg light"
          }
        >
          Login
        </Link>
      ) : (
        <></>
      )}
    </div>
    <div className="overlay z-0" />
  </header>
);

const mapStateToProps = state => ({
  user: state.user,
  darkmode: state.manager.darkmode
});

export default connect(mapStateToProps)(Welcome);
