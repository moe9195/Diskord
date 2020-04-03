import React from "react";
import { connect } from "react-redux";

const Footer = ({ darkmode }) => (
  <footer className={darkmode ? "sticky-footer" : "sticky-footer light"}>
    <div className="container">
      <div className="text-center">
        <small>Copyright © LAZGA Diskord 2020</small>
      </div>
    </div>
  </footer>
);

const mapStateToProps = (state) => {
  return {
    darkmode: state.manager.darkmode,
  };
};

export default connect(mapStateToProps)(Footer);
