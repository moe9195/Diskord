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
              <div className={this.props.darkmode ? "" : "light"}>
                <FontAwesomeIcon
                  icon={faPlusCircle}
                  style={{ fontSize: "40px" }}
                  label="ha"
                />
                <text
                  style={{
                    verticalAlign: "super",
                    padding: "10px"
                  }}
                >
                  Add Channel
                </text>
              </div>
            </span>
          </div>
        ) : (
          <Link className="nav-link heading" to="/login">
            <div
              style={{
                borderBottomStyle: "solid",
                borderBottomWidth: "thin",
                borderBottomColor: "#2c2f33"
              }}
            >
              <span className="nav-link" style={{ paddingBottom: "20px" }}>
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
                  Add Channel
                </text>
              </span>
            </div>
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
              <div
                className={
                  this.props.darkmode ? "modal-content" : "modal-content light"
                }
              >
                <div
                  className={
                    this.props.darkmode ? "modal-header" : "modal-header light"
                  }
                >
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Add Channel
                  </h5>
                  <button
                    type="button"
                    className={this.props.darkmode ? "close" : "close light"}
                    data-dismiss="modal"
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div
                  className={
                    this.props.darkmode ? "modal-body" : "modal-body light"
                  }
                >
                  <form onSubmit={this.onSubmit}>
                    <div className="input-group mb-3">
                      <div className="input-group-prepend"></div>
                      <input
                        type="text"
                        placeholder="Add Channel..."
                        className={
                          this.props.darkmode
                            ? "form-control"
                            : "form-control light"
                        }
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
                        placeholder="Add Image URL..."
                        className={
                          this.props.darkmode
                            ? "form-control"
                            : "form-control light"
                        }
                        name="image_url"
                        value={this.state.image_url}
                        onChange={this.onTextChange}
                        autoComplete="off"
                      />
                    </div>
                    <div
                      className={
                        this.props.darkmode
                          ? "modal-footer"
                          : "modal-footer light"
                      }
                    >
                      <button
                        type="button"
                        placeholder="Add Image URL..."
                        style={{ borderLeftStyle: "solid" }}
                        className={
                          this.props.darkmode
                            ? "btn btn-secondary"
                            : "btn btn-secondary light"
                        }
                        data-dismiss="modal"
                        onClick={this.clearFields}
                      >
                        Close
                      </button>
                      <button
                        type="submit"
                        data-toggle="false"
                        value="Add Channel"
                        style={{ borderLeftStyle: "solid" }}
                        className={
                          this.props.darkmode
                            ? "btn btn-primary"
                            : "btn btn-primary light"
                        }
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
    user: state.user,
    darkmode: state.manager.darkmode
  };
};
const mapDispatchToProps = dispatch => {
  return {
    postChannel: channel => dispatch(postChannel(channel))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddChannelModal);
