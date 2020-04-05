import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logout, clearChannels, clearMessages } from "../../redux/actions";

// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSignOutAlt,
  faSignInAlt,
  faUserPlus
} from "@fortawesome/free-solid-svg-icons";

const AuthButton = ({
  user,
  logout,
  clearChannels,
  clearMessages,
  darkmode
}) => {
  const logoutAndClearChannels = () => {
    clearChannels();
    clearMessages();
    logout();
  };

  let buttons = [
    <li key="loginButton" className="nav-item">
      <Link to="/login" className="nav-link">
        <FontAwesomeIcon icon={faSignInAlt} /> Login
      </Link>
    </li>,
    <li key="signupButton" className="nav-item">
      <Link to="/signup" className="nav-link">
        <FontAwesomeIcon icon={faUserPlus} /> Signup
      </Link>
    </li>
  ];

  if (user) {
    buttons = (
      <>
        <span className={darkmode ? "navbar-text" : "navbar-text light"}>
          {user.username}
        </span>
        <li className="nav-item">
          <span className="nav-link" onClick={logoutAndClearChannels}>
            <div className={darkmode ? "" : "light"}>
              <FontAwesomeIcon icon={faSignOutAlt} /> Logout
            </div>
          </span>
        </li>
      </>
    );
  }

  return <ul className="navbar-nav ml-auto">{buttons}</ul>;
};

const mapStateToProps = state => {
  return {
    user: state.user,
    darkmode: state.manager.darkmode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    logout: () => dispatch(logout()),
    clearChannels: () => dispatch(clearChannels()),
    clearMessages: () => dispatch(clearMessages())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthButton);
