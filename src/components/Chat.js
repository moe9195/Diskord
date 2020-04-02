import React, { Component } from "react";
import { fetchMessages } from "../redux/actions";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import "emoji-mart/css/emoji-mart.css";
import ChatBar from "./ChatBar";

class Chat extends Component {
  state = {
    messages: { message: "" },
    channelID: this.props.match.params.channelID,
    refresh: true,
    showEmojis: false
  };
  //LIFECYCLE
  componentDidMount() {
    let timestamp = "";

    this.props.fetchMessages(this.state.channelID, timestamp);
    this.interval = setInterval(() => {
      const messages = this.props.messages;
      if (messages.length) {
        timestamp = messages[messages.length - 1].timestamp;
      }
      this.props.fetchMessages(this.state.channelID, timestamp);
    }, 5000);
  }

  componentDidUpdate(prevProps) {
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const messages = this.props.messages;
        let timestamp = "";
        if (messages.length) {
          timestamp = messages[messages.length - 1].timestamp;
        }
        console.log(timestamp);
        this.props.fetchMessages(channelID, timestamp);
      }, 5000);
    }
    this.scrollToBottom();
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  };

  clearForm = () => {
    this.setState({ messages: { message: "" } });
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
              <br />
              <img src={`${message.message}`} alt="image" />
              <br />
              <br />
            </div>
          );
        }
      }
      return this.props.user.username !== message.username ? (
        <div className="yours messages">
          <div className="message">
            <div style={{ fontSize: 16, color: "#7289DA" }}>
              {message.username}
            </div>
            <div style={{ fontSize: 13 }}> {message.message}</div>
          </div>
        </div>
      ) : (
        <div className="mine messages">
          <div align="right">
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
        <ChatBar channelID={this.state.channelID} />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (channelID, timestamp) =>
      dispatch(fetchMessages(channelID, timestamp))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
