import React from "react";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import PropTypes from "prop-types";

const Logo = (props) => {
  const {onClick} = props;
  return (
    <div className="logo">
      <Link
        to={AppRoute.ROOT}
        className="logo__link"
        onClick={onClick}
      >
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </Link>
    </div>
  );
};

Logo.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Logo;
