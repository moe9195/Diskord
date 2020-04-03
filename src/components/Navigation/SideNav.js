import React from "react";
import { connect } from "react-redux";
// Fontawesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";

// Components
import ChannelNavLink from "./ChannelNavLink";
import AddChannelModal from "../AddChannelModal";
import SearchBar from "../SearchBar";
import { fetchChannels } from "../../redux/actions";

class SideNav extends React.Component {
  state = {
    collapsed: false,
    loading: true,
    query: ""
  };

  componentDidMount = () => {
    if (this.state.loading) {
      this.setState({ loading: false });
      this.props.fetchChannels();
    }
  };

  setQuery = query => this.setState({ query });

  filterChannels = () => {
    const query = this.state.query.toLowerCase();
    return this.props.channels.filter(channel => {
      return `${channel.name}`.toLowerCase().includes(query);
    });
  };

  render() {
    let channels = this.filterChannels();

    channels.sort(function(a, b) {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    });

    const channelLinks = channels.map(channel => (
      <ChannelNavLink key={channel.id} channel={channel} />
    ));

    return (
      <div>
        <ul
          className={
            this.props.darkmode
              ? "navbar-nav navbar-sidenav"
              : "navbar-nav navbar-sidenav light"
          }
          id="exampleAccordion"
        >
          <br></br>
          {!this.state.collapsed ? (
            <>
              <SearchBar onChange={this.setQuery} />
            </>
          ) : (
            <></>
          )}

          <li className="nav-item" data-toggle="tooltip" data-placement="right">
            <AddChannelModal />
          </li>
          <br></br>

          {this.props.user ? (
            <div
              className="card text-left"
              style={{ width: "15.6rem", border: "none" }}
            >
              {channelLinks}
            </div>
          ) : (
            <></>
          )}
        </ul>
        <ul
          className={
            this.props.darkmode
              ? "navbar-nav sidenav-toggler"
              : "navbar-nav sidenav-toggler light"
          }
        >
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
    channels: state.channels,
    darkmode: state.manager.darkmode
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchChannels: () => dispatch(fetchChannels())
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(SideNav);
