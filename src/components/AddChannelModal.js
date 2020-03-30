import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { postChannel } from "../redux/actions";
import { Link } from "react-router-dom";

class AddChannelModal extends Component {
  state = {
    name: "",
    image_url: ""
  };

  onTextChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  clearFields = () => {
    let empty = { name: "", image_url: "" };
    this.setState({ ...empty });
  };
  onSubmit = event => {
    event.preventDefault();
    this.props.postChannel(this.state);
    this.clearFields();
  };
  render() {
    return (
      <div>
        {this.props.user ? (
          <span
            className="nav-link heading"
            data-toggle="modal"
            data-target="#staticBackdrop"
          >
            <span className="nav-link-text mr-2">&nbsp;&nbsp;Channels</span>
            <FontAwesomeIcon icon={faPlusCircle} />
          </span>
        ) : (
          <Link className="nav-link heading" to="/login">
            <span className="nav-link-text mr-2">&nbsp;&nbsp;Channels</span>
            <FontAwesomeIcon icon={faPlusCircle} />
          </Link>
        )}
        <div>
          <div
            className="modal fade"
            id="staticBackdrop"
            data-backdrop="false"
            tabIndex="-1"
            role="dialog"
            aria-labelledby="staticBackdropLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Add Channel
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <form onSubmit={this.onSubmit}>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend"></div>
                      <input
                        type="text"
                        placeholder="Add Channel..."
                        className="form-control"
                        name="name"
                        value={this.state.name}
                        onChange={this.onTextChange}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend"></div>
                      <input
                        type="url"
                        placeholder="Add Channel..."
                        className="form-control"
                        name="image_url"
                        value={this.state.image_url}
                        onChange={this.onTextChange}
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-dismiss="modal"
                        onClick={this.clearFields}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        data-toggle="false"
                        value="Add Channel"
                        className="btn btn-primary"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postChannel: channel => dispatch(postChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChannelModal);
