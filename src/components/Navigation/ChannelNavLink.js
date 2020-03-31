import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentChannel } from "../../redux/actions";

// FontAwesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHashtag } from "@fortawesome/free-solid-svg-icons";

class ChannelNavLink extends Component {
  state = { clicked: false };

  currentChannel = () => {
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
          title={this.props.channel.name}
          style={
            this.props.currentChannel === this.props.channel
              ? { background: "#2c2f33" }
              : {}
          }
        >
          <NavLink
            onClick={() => this.currentChannel()}
            className="nav-link"
            to={`/channels/${this.props.channel.id}`}
          >
            <FontAwesomeIcon icon={faHashtag} />
            <span className="nav-link-text">{this.props.channel.name}</span>
          </NavLink>
        </li>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    currentChannel: state.manager.currentChannel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentChannel: channel => dispatch(getCurrentChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNavLink);
