import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleLeft,
  faAngleRight,
  faPlusCircle
} from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import AddChannelModal from "../AddChannelModal";
import { fetchChannels } from "../../redux/actions";

class SideNav extends React.Component {
  state = { collapsed: false, loading: true };

  // componentDidMount = () => {
  //   if (this.props.user) {
  //     this.props.fetchChannels();
  //   }
  // };

  componentDidUpdate = () => {
    if (this.state.loading) {
      this.setState({ loading: false });
      this.props.fetchChannels();
    }
  };

  render() {
    const channelLinks = this.props.channels.map(channel => (
      <ChannelNavLink key={channel.id} channel={channel} />
    ));

    return (
      <div>
        <ul className="navbar-nav navbar-sidenav" id="exampleAccordion">
          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <AddChannelModal />
          </li>
          {this.props.user ? (
            <div
              className="card text-left"
              style={{ width: "15rem", border: "none" }}
            >
              {channelLinks}
            </div>
          ) : (
            <></>
          )}
        </ul>
        <ul className="navbar-nav sidenav-toggler">
          <li className="nav-item">
            <span
              className="nav-link text-center"
              id="sidenavToggler"
              onClick={() =>
                this.setState(prevState => ({
                  collapsed: !prevState.collapsed
                }))
              }
            >
              <FontAwesomeIcon
                icon={this.state.collapsed ? faAngleRight : faAngleLeft}
              />
            </span>
          </li>
        </ul>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.channels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
