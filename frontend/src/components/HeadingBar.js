import React from "react";
import PropTypes from "prop-types";

const HeadingBar = (props) => {
  return (
    <div className="container-fluid border-bottom py-3 fw-light">
      <div className="container">
        <span className="fw-bolder fs-5">{props.heading}</span>
      </div>
    </div>
  );
};

HeadingBar.propTypes = {
  heading: PropTypes.string.isRequired,
};

export default HeadingBar;
