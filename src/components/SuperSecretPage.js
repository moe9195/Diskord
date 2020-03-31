import React from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SuperSecretPage = ({ user }) => {
  if (!user) return <Redirect to="/login" />;
  return (
    <div>
      <h1 className="message-title">this page has all the secrets</h1>
      <p className="message-text">
        now that you're logged in you can see this page
      </p>
    </div>
  );
};

const mapStateToProps = ({ user }) => ({
  user
});

export default connect(mapStateToProps)(SuperSecretPage);
