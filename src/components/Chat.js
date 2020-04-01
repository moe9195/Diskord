import React, { Component } from "react";
import { fetchMessages, postMessage } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

class Chat extends Component {
  state = {
    messages: { message: "" },
    channelID: this.props.match.params.channelID,
    refresh: true
  };

  componentDidMount() {
    this.props.fetchMessages(this.state.channelID);
    this.interval = setInterval(
      () => this.props.fetchMessages(this.state.channelID),
      1500
    );
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchMessages(channelID);
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.props.fetchMessages(channelID),
        1500
      );
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  clearForm = () => {
    this.setState({ messages: { message: "" } });
  };

  handleChange = event =>
    this.setState({
      messages: {
        message: event.target.value
      }
    });

  onSubmit = event => {
    event.preventDefault();
    this.props.postMessage(
      this.props.match.params.channelID,
      this.state.messages
    );
    this.clearForm();
  };

  render() {
    if (!this.props.user) {
      return <Redirect to="/welcome" />;
    }
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
              value={this.state.messages.message}
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
