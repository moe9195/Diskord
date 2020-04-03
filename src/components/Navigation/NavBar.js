import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAdjust } from "@fortawesome/free-solid-svg-icons";
import { toggleDarkMode } from "../../redux/actions";

// Components
import SideNav from "./SideNav";
import AuthButton from "./AuthButton";

class NavBar extends Component {
  state = {
    darkmode: false,
  };
  changeMode = () => {
    this.props.toggleDarkMode(this.state.darkmode);
    this.setState({ darkmode: !this.state.darkmode });
  };

  render() {
    return (
      <nav
        className={
          this.props.darkmode
            ? "navbar navbar-expand-lg navbar-dark fixed-top"
            : "navbar navbar-expand-lg navbar-dark fixed-top light"
        }
        id="mainNav"
      >
        <Link className="navbar-brand" to="/welcome">
          <div className={this.props.darkmode ? "" : "light"}>Diskord</div>
        </Link>
        <FontAwesomeIcon icon={faAdjust} /> &nbsp;&nbsp;&nbsp;
        <div class="custom-control custom-switch">
          <input
            type="checkbox"
            class="custom-control-input"
            id="customSwitches"
          />
          <label
            class="custom-control-label light"
            for="customSwitches"
            onClick={() => this.changeMode()}
          ></label>
        </div>
        <h6 style={{ paddingLeft: "5vh" }}>
          {this.props.currentChannel ? (
            <div style={{ fontSize: "13px" }}>
              Channel : &nbsp;{this.props.currentChannel.name} <br></br>{" "}
              Owner&nbsp;&nbsp; &nbsp;: &nbsp;
              {this.props.currentChannel.owner}
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
  }
}

const mapStateToProps = (state) => {
  return {
    currentChannel: state.manager.currentChannel,
    darkmode: state.manager.darkmode,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleDarkMode: (mode) => dispatch(toggleDarkMode(mode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
