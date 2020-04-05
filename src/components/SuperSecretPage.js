import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class SuperSecretPage extends Component {
  state = {
    toggleSecret: false
  };
  toggleSecret = () => {
    this.setState({ toggleSecret: !this.state.toggleSecret });
  };
  render() {
    if (!this.props.user) return <Redirect to="/login" />;
    var secrets = <h5 onClick={this.toggleSecret}>"secret"</h5>,
      space = " ";
    return (
      <div>
        <h1 className="message-title d-flex justify-content-center">
          Choose a channel to start chatting with your friends**
        </h1>
        <h5 className="message-text  d-flex justify-content-center">
          🧂 Try to enjoy 🧂
        </h5>
        <h5 className="message-title d-flex justify-content-center text-center">
          Be careful while chatting, dont reveal passwords, personal
          informations, or any other &nbsp; {secrets}
        </h5>
        <div className="d-flex justify-content-center">
          {!this.state.toggleSecret ? (
            <img
              src={"https://media.giphy.com/media/wDGCA2dv9VJxC/giphy.gif"}
            />
          ) : (
            <img
              src={"https://media.giphy.com/media/snrDtXJBEiZwY/giphy.gif"}
            />
          )}
        </div>
        <p className="message-title sticky-bottom text-right mt-5">
          **If you have any..
        </p>
      </div>
    );
  }
}

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(SuperSecretPage);
