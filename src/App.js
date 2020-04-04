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
import Chat from "./components/Chat";
import Style from "style-it";

class App extends Component {
  componentDidMount() {
    main();
  }

  render() {
    const scrollbarTrack = this.props.darkmode ? "#2c2f33" : "#cbdce7";
    const scrollbarThumb = this.props.darkmode ? "#1f2223" : "#99aab5";
    const scrollbarHover = this.props.darkmode ? "#151819" : "#8596a1";

    return Style.it(
      `
      ::-webkit-scrollbar {
        width: 10px;
      }
      ::-webkit-scrollbar-track {
        border-radius: 10px;
        background: ${scrollbarTrack};
      }
      ::-webkit-scrollbar-thumb {
        background: ${scrollbarThumb};
        border-radius: 10px;
      }
      ::-webkit-scrollbar-thumb:hover {
        background: ${scrollbarHover};
      }
    `,
      <div
        className={
          this.props.darkmode ? "content-wrapper" : "content-wrapper light"
        }
      >
        <NavBar />
        <Switch>
          <Route path="/welcome" component={Welcome} />
          <Route path="/(login|signup)" component={RegistrationForm} />
          <Route path="/secret" component={SuperSecretPage} />
          <Route path="/channels/:channelID" component={Chat} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user,
    darkmode: state.manager.darkmode,
  };
};

export default connect(mapStateToProps)(App);
