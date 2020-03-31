import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

// Scripts
import main from "./assets/js/main";
import { connect } from "react-redux";
// Components
import NavBar from "./components/Navigation/NavBar";
import Footer from "./components/Footer";
import Welcome from "./components/Welcome";
import RegistrationForm from "./components/RegistrationForm";
import SuperSecretPage from "./components/SuperSecretPage";
import Chat from "./Chat";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    return (
      <div className="content-wrapper">
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/secret" component={SuperSecretPage} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/private" component={SuperSecretPage} />
          {/* <Redirect to={this.props.user ? "/secret" : "/welcome"} /> */}
          <Route path="/channels/:channelID" component={Chat} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(mapStateToProps)(App);
