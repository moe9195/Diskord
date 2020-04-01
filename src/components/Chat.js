import React, { Component } from "react";
import { fetchMessages, postMessage } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import messages from "../redux/reducers/messages";
import { faPaperPlane, faGrin } from "@fortawesome/free-solid-svg-icons";
class Chat extends Component {
  state = {
    messages: { message: "" },
    channelID: this.props.match.params.channelID,
    refresh: true,
    showEmojis: false
  };
  //LIFECYCLE
  componentDidMount() {
    this.props.fetchMessages(this.state.channelID);
    this.interval = setInterval(
      () => this.props.fetchMessages(this.state.channelID),
      5000
    );
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      this.props.fetchMessages(channelID);
      clearInterval(this.interval);
      this.interval = setInterval(
        () => this.props.fetchMessages(channelID),
        5000
      );
    }
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  };
  showEmojis = e => {
    this.setState(
      {
        showEmojis: true
      },
      () => document.addEventListener("click", this.closeMenu)
    );
  };

  closeMenu = e => {
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
    let emoji = e.native;
    this.setState({
      messages: { message: this.state.messages.message + emoji }
    });
  };
  validURL = string => {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  };
  checkImageURL(url) {
    return url.match(/.(jpeg|jpg|gif|png)$/) != null;
  }
  render() {
    if (!this.props.user) {
      return <Redirect to="/welcome" />;
    }
    const messagesCards = this.props.messages.map(message => {
      if (this.validURL(message.message)) {
        if (this.checkImageURL(message.message)) {
          return (
            <div>
              <div className="yours messages">
                <p className="message">{message.username}: </p>
              </div>
              <img src={`${message.message}`} alt="image" />
              <br />
              <br />
            </div>
          );
        }
      }
      return (
        <div>
          {this.props.user.username !== message.username ? (
            <div className="yours messages">
              <div className="message">
                <div style={{ fontSize: 16, color: "#7289DA" }}>
                  {message.username}
                </div>
                <div style={{ fontSize: 13 }}> {message.message}</div>
              </div>
            </div>
          ) : (
            <div
              className="mine messages"
              style={{
                padding: "8px 15px",
                marginTop: "0px",
                marginBottom: "0px"
              }}
            >
              <div
                className="message"
                style={{
                  padding: "8px 15px",
                  marginTop: "0px",
                  marginBottom: "0px"
                }}
              >
                <div style={{ fontSize: 13 }}> {message.message}</div>
              </div>
            </div>
          )}
        </div>
      );
    });

    return (
      <div className="container chatholder">
        <div className="container chatbox">
          {this.props.channelID}
          {messagesCards}
          <div
            style={{ float: "left", clear: "both" }}
            ref={el => {
              this.messagesEnd = el;
            }}
          ></div>
        </div>
        <div className="chat-box-margin"></div>
        <form onSubmit={this.onSubmit}>
          <div className="right-inner-addon">
            <div className="input-group mb-3">
              <div className="input-group-prepend">
                {this.state.showEmojis ? (
                  <span
                    style={styles.emojiPicker}
                    ref={el => (this.emojiPicker = el)}
                  >
                    <Picker
                      onSelect={this.addEmoji}
                      emojiTooltip={true}
                      theme="dark"
                      title=" "
                    />
                  </span>
                ) : (
                  <></>
                )}
                <div
                  className="btn btn-primary emoji-button"
                  onClick={this.showEmojis}
                >
                  <FontAwesomeIcon icon={faGrin} />
                </div>
              </div>

              <input
                type="text"
                placeholder="Message..."
                className="form-control chat-box-borders"
                name="message"
                value={this.state.messages.message}
                onChange={this.handleChange}
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  data-toggle="false"
                  value="message"
                  className="btn btn-primary send-button"
                >
                  {" "}
                  <FontAwesomeIcon icon={faPaperPlane} />
                </button>
              </div>
            </div>
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
    bottom: 30,
    right: 10,
    cssFloat: "left",
    marginLeft: "200px",
    color: "black"
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
