import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import { login, signup, resetErrors } from "../redux/actions";
import { connect } from "react-redux";

class RegistationForm extends Component {
  state = {
    username: "",
    password: ""
  };

  componentWillUnmount = () => {
    if (this.props.errors.length) this.props.resetErrors();
  };

  handleChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  handleSubmitLogin = event => {
    event.preventDefault();
    this.props.login(this.state);
  };

  handleSubmitSignup = event => {
    event.preventDefault();
    this.props.signup(this.state);
  };

  render() {
    const type = this.props.match.url.substring(1);
    const { username, password } = this.state;
    const { errors } = this.props;
    return (
      <div
        className={
          this.props.darkmode
            ? "card col-6 mx-auto p-0 mt-5"
            : "card col-6 mx-auto p-0 mt-5 light"
        }
      >
        {this.props.user ? <Redirect to="/secret" /> : <></>}
        <div className="card-body">
          <h5
            className={
              this.props.darkmode ? "card-title mb-4" : "card-title mb-4 light"
            }
          >
            {type === "login"
              ? "Login to send messages"
              : "Register an account"}
          </h5>
          <form
            onSubmit={
              type === "login"
                ? this.handleSubmitLogin
                : this.handleSubmitSignup
            }
          >
            {!!errors.length && (
              <div className="alert alert-danger" role="alert">
                {errors.map(error => (
                  <p key={error}>{error}</p>
                ))}
              </div>
            )}
            <div className="form-group">
              <input
                className={
                  this.props.darkmode ? "form-control" : "form-control light"
                }
                type="text"
                placeholder="Username"
                value={username}
                name="username"
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                className={
                  this.props.darkmode ? "form-control" : "form-control light"
                }
                type="password"
                placeholder="Password"
                value={password}
                name="password"
                onChange={this.handleChange}
              />
            </div>
            <input
              className={
                this.props.darkmode
                  ? "btn btn-primary"
                  : "btn btn-primary light"
              }
              type="submit"
              value={type.replace(/^\w/, c => c.toUpperCase())}
            />
          </form>
        </div>
        <div className="card-footer">
          <Link
            to={type === "login" ? "/signup" : "/login"}
            className="btn btn-small btn-link"
          >
            {type === "login"
              ? "register an account"
              : "login with an existing account"}
          </Link>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: userData => dispatch(login(userData)),
    signup: userData => dispatch(signup(userData)),
    resetErrors: () => dispatch(resetErrors())
  };
};

const mapStateToProps = state => {
  return {
    errors: state.errors.errors,
    user: state.user,
    darkmode: state.manager.darkmode
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(RegistationForm);
