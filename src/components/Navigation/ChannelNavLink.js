import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import {
  getCurrentChannel,
  clearMessages,
  toggleLoading
} from "../../redux/actions";
import ReactImageFallback from "react-image-fallback";

class ChannelNavLink extends Component {
  state = { clicked: false };

  currentChannel = () => {
    this.props.clearMessages();
    this.props.toggleLoading();
    this.props.getCurrentChannel(this.props.channel);
    this.setState({ clicked: !this.state.clicked });
  };

  render() {
    return (
      <div>
        <li
          className="nav-item"
          data-toggle="tooltip"
          data-placement="right"
          title={`Name: ${this.props.channel.name}\nOwner: ${this.props.channel.owner}`}
          style={
            this.props.currentChannel === this.props.channel
              ? { background: "#2c2f33" }
              : {}
          }
        >
          <NavLink
            onClick={() => this.currentChannel()}
            className={this.props.darkmode ? "nav-link" : "nav-link light"}
            to={`/channels/${this.props.channel.id}`}
          >
            <ReactImageFallback
              src={this.props.channel.image_url}
              style={{
                width: "40px",
                height: "40px",
                overflow: "hidden"
              }}
              fallbackImage="https://raw.githubusercontent.com/moe9195/Chatr2.0-UI/master/src/assets/no-image-box.png"
              initialImage="loader.gif"
              alt={this.props.channel.name}
              className="channel-img"
            />

            <span className="nav-link-text">
              &nbsp;{this.props.channel.name}
            </span>
          </NavLink>
        </li>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChannel: state.manager.currentChannel,
    darkmode: state.manager.darkmode
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentChannel: channel => dispatch(getCurrentChannel(channel)),
    clearMessages: () => dispatch(clearMessages()),
    toggleLoading: () => dispatch(toggleLoading())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNavLink);
