import React, { Component } from "react";
import { fetchMessages, postMessage } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
class Chat extends Component {
  state = {
    messages: { message: "" },
    channelID: this.props.match.params.channelID,
    refresh: true,
    showEmojis: false
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
  showEmojis = e => {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  closeMenu = e => {
    console.log(this.emojiPicker);
    if (this.emojiPicker !== null && !this.emojiPicker.contains(e.target)) {
      this.setState(
        {
          showEmojis: false
        },
        () => document.removeEventListener("click", this.closeMenu)
      );
    }
  };
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
  addEmoji = e => {
    // console.log(e.native);
    let emoji = e.native;
    this.setState({
      messages: { message: this.state.messages.message + emoji }
    });
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
            {this.state.showEmojis ? (
              <span
                style={styles.emojiPicker}
                ref={el => (this.emojiPicker = el)}
              >
                <Picker
                  onSelect={this.addEmoji}
                  emojiTooltip={true}
                  title="weChat"
                />
              </span>
            ) : (
              <p style={styles.getEmojiButton} onClick={this.showEmojis}>
                {String.fromCodePoint(0x1f60a)}
              </p>
            )}
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

const styles = {
  container: {
    padding: 20,
    borderTop: "1px #4C758F solid",
    marginBottom: 20
  },
  form: {
    display: "flex"
  },
  input: {
    color: "inherit",
    background: "none",
    outline: "none",
    border: "none",
    flex: 1,
    fontSize: 16
  },
  getEmojiButton: {
    cssFloat: "right",
    border: "none",
    margin: 0,
    cursor: "pointer"
  },
  emojiPicker: {
    position: "absolute",
    bottom: 10,
    right: 0,
    cssFloat: "right",
    marginLeft: "200px"
  }
};

const customEmojis = [
  {
    name: "Octocat",
    short_names: ["octocat"],
    text: "",
    emoticons: [],
    keywords: ["github"],
    imageUrl: "https://assets-cdn.github.com/images/icons/emoji/octocat.png?v7"
  }
];
