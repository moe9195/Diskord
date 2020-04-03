import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

const NavBar = ({ currentChannel }) => (
  <nav className="navbar navbar-expand-lg navbar-dark fixed-top" id="mainNav">
    <Link className="navbar-brand" to="/welcome">
      Chatr2.0
    </Link>
    <h6 style={{ paddingLeft: "5vh" }}>
      {currentChannel ? (
        <div style={{ fontSize: "14px" }}>
          Channel : &nbsp;{currentChannel.name} <br></br> Owner&nbsp;&nbsp;
          &nbsp;: &nbsp;
          {currentChannel.owner}
        </div>
      ) : (
        ""
      )}
    </h6>
    <button
      className="navbar-toggler navbar-toggler-right"
      type="button"
      data-toggle="collapse"
      data-target="#navbarResponsive"
      aria-controls="navbarResponsive"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarResponsive">
      <SideNav />
      <AuthButton />
    </div>
  </nav>
);

const mapStateToProps = state => {
  return {
    currentChannel: state.manager.currentChannel
  };
};

export default connect(mapStateToProps)(NavBar);
