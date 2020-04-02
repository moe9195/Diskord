import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onChange }) => (
  <div className="form-group searchbar">
    <div className="input-group-append">
      <input
        className="form-control search-box-borders"
        type="text"
        onChange={event => onChange(event.target.value)}
      />
      <div className="input-group-append">
        <button
          type="submit"
          data-toggle="false"
          value="message"
          className="btn btn-primary btn-static "
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    </div>
  </div>
);

export default SearchBar;
