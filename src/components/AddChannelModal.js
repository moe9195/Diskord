import React, { Component } from "react";
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusCircle, faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { postChannel } from "../redux/actions";
import { Link } from "react-router-dom";
import ReactImageFallback from "react-image-fallback";
import plusIcon from "./plusIcon.png";

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
          <div
            style={{
              borderBottomStyle: "solid",
              borderBottomWidth: "thin",
              borderBottomColor: "#2c2f33"
            }}
          >
            <span
              className="nav-link"
              style={{ paddingBottom: "20px" }}
              data-toggle="modal"
              data-target="#staticBackdrop"
            >
              <ReactImageFallback
                src={plusIcon}
                style={{
                  width: "40px",
                  height: "40px",
                  overflow: "hidden"
                }}
                fallbackImage="https://raw.githubusercontent.com/moe9195/Chatr2.0-UI/master/src/assets/plusIcon.png"
                initialImage="loader.gif"
                alt="plusIcon"
                className="channel-img"
              />
              <text style={{ verticalAlign: "middle", padding: "10px" }}>
                {/* Add Channel */}
              </text>
            </span>
          </div>
        ) : (
          <Link className="nav-link heading" to="/login">
            <span class="fa-layers fa-fw">
              <FontAwesomeIcon
                className="font-awesome-plus-circle"
                icon={faPlusCircle}
              />
            </span>
            <text style={{ verticalAlign: "top", padding: "10px" }}>
              {/* Add Channel */}
            </text>
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
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend"></div>
                      <input
                        type="url"
                        placeholder="Add Channel Name..."
                        className="form-control"
                        name="image_url"
                        value={this.state.image_url}
                        onChange={this.onTextChange}
                        autoComplete="off"
                      />
                    </div>
                    <div className="modal-footer">
                      <button
                        type="button"
                        placeholder="Add Image URL..."
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
