import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const Loading = () => (
  <div className="spinner mx-auto text-center">
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <br /> {/* no, no, no... use margin-top */}
    <FontAwesomeIcon icon={faSpinner} spin size="4x" />
  </div>
);

export default Loading;
