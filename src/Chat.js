import React, { Component } from "react";
import { fetchMessages, postMessage } from "./redux/actions";
import { connect } from "react-redux";

class Chat extends Component {
  state = {
    messages: { message: "help" },
    channelID: this.props.match.params.channelID,
    refresh: true
  };

  componentDidMount() {
    this.props.fetchMessages(this.state.channelID);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchMessages(channelID);
      //clearInterval(this.interval);
      //   this.interval = setInterval(
      //     () => this.props.fetchMessages(channelID),
      //     2000
      //   );
    }

    //
  }

  handleChange = event =>
    this.setState({ messages: { message: event.target.value } });

  onSubmit = event => {
    event.preventDefault();
    this.props.postMessage(
      this.props.match.params.channelID,
      this.state.messages
    );
    // this.props.fetchMessages(this.props.match.params.channelID);
  };

  render() {
    // if (this.state.channelID !== this.props.match.params.channelID) {
    //   this.setState({
    //     channelID: this.props.match.params.channelID
    //   });
    //   this.props.fetchMessages(this.props.match.params.channelID);
    // }

    const messagesCards = this.props.messages.map(message => (
      <p>
        {message.username}: {message.message}
      </p>
    ));

    return (
      <div className="container">
        {messagesCards}

        <form onSubmit={this.onSubmit}>
          <div className="input-group mb-3">
            <div className="input-group-prepend"></div>
            <input
              type="text"
              placeholder="Message..."
              className="form-control"
              name="message"
              value={this.state.message}
              onChange={this.handleChange}
            />
            <button
              type="submit"
              data-toggle="false"
              value="message"
              className="btn btn-primary"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    channels: state.channels,
    messages: state.messages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: channelID => dispatch(fetchMessages(channelID)),
    postMessage: (channelID, message) =>
      dispatch(postMessage(channelID, message))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
