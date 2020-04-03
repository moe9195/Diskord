import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { connect } from "react-redux";

const SearchBar = ({ onChange, darkmode }) => (
  <div className="form-group searchbar">
    <div className="input-group-append">
      <input
        className={
          darkmode
            ? "form-control search-box-borders"
            : "form-control search-box-borders light"
        }
        type="text"
        onChange={event => onChange(event.target.value)}
      />
      <div className="input-group-append">
        <button
          type="submit"
          data-toggle="false"
          value="message"
          className={
            darkmode
              ? "btn btn-primary btn-static"
              : "btn btn-primary btn-static light"
          }
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  </div>
);

const mapStateToProps = state => {
  return {
    darkmode: state.manager.darkmode
  };
};

export default connect(mapStateToProps)(SearchBar);
