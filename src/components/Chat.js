import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

//Redux Actions
import { fetchMessages, postMessage, fetchCoronaData } from "../redux/actions";
//Componenets & packages
import "emoji-mart/css/emoji-mart.css";
import ChatBar from "./ChatBar";
import Loading from "./Loading";
import countryData from "../countries";
//Corona-Bot
const dictionary = countryData[1];
const countryArray = countryData[2];

class Chat extends Component {
  state = {
    messages: { message: "" },
    channelID: this.props.match.params.channelID,
    refresh: true,
    showEmojis: false,
    length: null,
    loading: true,
    coronaData: false,
    sumLoading: true,
    sum: 0
  };

  componentDidMount() {
    let timestamp = "";
    this.props.fetchCoronaData();
    this.props.fetchMessages(this.state.channelID, timestamp);
    this.interval = setInterval(() => {
      const messages = this.props.messages;
      if (messages.length) {
        timestamp = messages[messages.length - 1].timestamp;
      }
      this.props.fetchMessages(this.state.channelID, timestamp);
    }, 2000);
    this.scrollToBottom();
  }

  componentDidUpdate(prevProps) {
    if (this.props.corona.result.length > 0 && this.state.loading) {
      this.setState({ coronaData: this.cleanData(), loading: false });
    }
    if (this.state.coronaData && this.state.sumLoading) {
      let sum = 0;
      this.state.coronaData.map(country => (sum += country.confirmed));
      this.setState({ sum: sum, sumLoading: false });
    }
    const channelID = this.props.match.params.channelID;
    if (prevProps.match.params.channelID !== channelID) {
      clearInterval(this.interval);
      this.interval = setInterval(() => {
        const messages = this.props.messages;
        let timestamp = "";
        if (messages.length) {
          timestamp = messages[messages.length - 1].timestamp;
        }
        this.props.fetchMessages(channelID, timestamp);
      }, 1500);
    }

    let len = this.props.messages.length;

    if (this.state.length != len) {
      this.setState({ length: len });
      this.scrollToBottom();
    }
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
  //Scroll the page to bottom on start and whenever a new message is sent
  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  };
  //Clears the form
  clearForm = () => {
    this.setState({ messages: { message: "" } });
  };
  //excavate the data that arrives to the corona bot and make it ready for usage
  cleanData = () => {
    let cleaned = this.props.corona.result.map(country => {
      let countryName = Object.keys(country)[0];
      return {
        name: dictionary[countryName],
        confirmed: country[countryName].confirmed
      };
    });
    return cleaned;
  };
  //Checks for URL if Valid or not
  validURL = string => {
    try {
      new URL(string);
    } catch (_) {
      return false;
    }
    return true;
  };
  //Checks if the URL is an Image or not
  checkImageURL(url) {
    return url.match(/.(jpeg|jpg|gif|png)$/) != null;
  }
  //brings the day from the date
  dateToWeekday = (year, month, day) => {
    let y = parseInt(year),
      m = parseInt(month),
      d = parseInt(day);
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    d = new Date(y, --m, d);
    return d && days[d.getDay()];
  };
  //Sending messages Manager
  onSubmit = message => {
    this.props.postMessage(this.props.match.params.channelID, message);
    setTimeout(() => this.checkBot(message.message), 500);
  };
  //Corona-bot mind and logic
  checkBot = string => {
    if (string[0] !== "$") {
      return false;
    }
    let l = string.length;
    if (string.substring(0, 7) === "$corona") {
      if (string[7] === "-") {
        let country = string.substring(8, l);
        country = country[0].toUpperCase() + country.substr(1).toLowerCase();
        if (countryArray.indexOf(country) !== -1) {
          let found = this.state.coronaData.find(item => item.name === country);
          this.props.postMessage(this.props.match.params.channelID, {
            message: found.confirmed
          });
        } else {
          this.props.postMessage(this.props.match.params.channelID, {
            message: "Enter valid country!"
          });
        }
      } else {
        this.props.postMessage(this.props.match.params.channelID, {
          message: this.state.sum
        });
      }
    }
    return false;
  };

  render() {
    if (!this.props.user) {
      return <Redirect to="/welcome" />;
    }

    const messagesCards = this.props.messages.map(message => {
      const date = message.timestamp;
      let year = date.substring(0, 4);
      let month = date.substring(5, 7);
      let day = date.substring(8, 10);

      let weekDay = this.dateToWeekday(year, month, day);
      if (
        this.validURL(message.message) &&
        this.checkImageURL(message.message)
      ) {
        return (
          <div>
            <div>
              <p className="message">
                {" "}
                <div
                  style={{
                    fontSize: 16,
                    color: "#7289DA",
                    padding:
                      this.props.user.username !== message.username
                        ? "0px"
                        : "8px 15px"
                  }}
                >
                  {this.props.user.username !== message.username
                    ? `${message.username}:`
                    : ""}
                </div>
              </p>
            </div>
            <br />
            <div
              className="img-align"
              style={{
                textAlign:
                  this.props.user.username === message.username
                    ? "right"
                    : "left"
              }}
            >
              <img
                style={{ maxWidth: "60vh" }}
                src={`${message.message}`}
                alt="image"
              />
              <br></br>{" "}
              <div
                style={{
                  fontSize: "10px",
                  display: "inline",
                  opacity: "0.5",
                  align: "right"
                }}
              >
                {`${weekDay} ${date.substring(11, 16)}`}
              </div>
            </div>

            <br />
            <br />
          </div>
        );
      }
      return this.props.user.username !== message.username ? (
        <div className="yours messages">
          <div className={this.props.darkmode ? "message" : "message-light"}>
            <div
              style={
                this.props.darkmode
                  ? { fontSize: 16, color: "#7289DA", paddingRight: "0px" }
                  : { fontSize: 16, color: "#4a57a8", paddingRight: "0px" }
              }
            >
              {message.username}{" "}
            </div>
            <div style={{ fontSize: 13 }}> {message.message}</div>
            <div
              style={{
                fontSize: "10px",
                display: "inline",
                opacity: "0.5",
                align: "right"
              }}
            >
              {`${weekDay} ${date.substring(11, 16)}`}
            </div>
          </div>
        </div>
      ) : (
        <div
          className={
            this.props.darkmode ? "mine messages" : "mine messages light"
          }
        >
          <div align="right">
            <div
              className={this.props.darkmode ? "message" : "message-light"}
              style={{
                padding: "8px 15px",
                marginTop: "0px",
                marginBottom: "0px"
              }}
            >
              <div style={{ fontSize: 13 }}> {message.message}</div>{" "}
              <div
                style={{
                  fontSize: "10px",
                  display: "inline",
                  opacity: "0.5"
                }}
              >
                {`${weekDay} ${date.substring(11, 16)}`}
              </div>
            </div>
          </div>
        </div>
      );
    });

    return (
      <div>
        {this.props.loading ? (
          <div>
            <Loading />
            <div
              style={{ float: "left", clear: "both" }}
              ref={el => {
                this.messagesEnd = el;
              }}
            ></div>
          </div>
        ) : (
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
            <ChatBar
              channelID={this.state.channelID}
              onSubmit={this.onSubmit}
            />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    messages: state.messages,
    loading: state.manager.loading,
    darkmode: state.manager.darkmode,
    corona: state.corona
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchMessages: (channelID, timestamp) =>
      dispatch(fetchMessages(channelID, timestamp)),
    postMessage: (channelID, message) =>
      dispatch(postMessage(channelID, message)),
    fetchCoronaData: country => dispatch(fetchCoronaData(country))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chat);
