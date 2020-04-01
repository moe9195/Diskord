import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { getCurrentChannel } from "../../redux/actions";
import ReactImageFallback from "react-image-fallback";

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
            <ReactImageFallback
              src={this.props.channel.image_url}
              style={{
                borderRadius: "50%",
                width: "30px",
                height: "30px",
                overflow: "hidden"
              }}
              fallbackImage="https://raw.githubusercontent.com/moe9195/Chatr2.0-UI/master/src/assets/noimage.jpg"
              initialImage="loader.gif"
              alt="this.props.channel.name"
              className="my-image"
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
    currentChannel: state.manager.currentChannel
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getCurrentChannel: channel => dispatch(getCurrentChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChannelNavLink);
