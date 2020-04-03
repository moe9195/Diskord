import React, { Component } from "react";
import { postMessage, getCurrentChannel } from "../redux/actions";
import { connect } from "react-redux";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane, faGrin } from "@fortawesome/free-solid-svg-icons";

class ChatBar extends Component {
  state = {
    messages: { message: "" },
    showEmojis: false
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
    this.props.onSubmit(this.state.messages);
    this.clearForm();
  };
  addEmoji = e => {
    let emoji = e.native;
    this.setState({
      messages: { message: this.state.messages.message + emoji }
    });
  };

  render() {
    return (
      <div>
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
                placeholder="Message.."
                className="form-control chat-box-borders"
                name="message"
                value={this.state.messages.message}
                onChange={this.handleChange}
                autocomplete="off"
              />
              <div className="input-group-append">
                <button
                  type="submit"
                  data-toggle="false"
                  value="message"
                  className="btn btn-primary send-button btn-static"
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
    messages: state.messages,
    currentChannel: state.manager.currentChannel,
    channels: state.channels
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postMessage: (channelID, message) =>
      dispatch(postMessage(channelID, message)),
    getCurrentChannel: channel => dispatch(getCurrentChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ChatBar);

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
