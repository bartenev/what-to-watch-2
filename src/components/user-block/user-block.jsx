import React from "react";
import {AuthorizationStatus} from "../../reducer/user/user";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import {getAuthorizationStatus, getUserInfo} from "../../reducer/user/selectors";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const UserBlock = (props) => {
  const {authorizationStatus, userInfo} = props;

  if (authorizationStatus === AuthorizationStatus.AUTH) {
    const {avatar} = userInfo;
    return (
      <div className="user-block">
        <div className="user-block__avatar">
          <Link to={AppRoute.MY_LIST}>
            <img
              src={avatar}
              alt="User avatar"
              width="63"
              height="63"
              onClick={() => {}}
            />
          </Link>
        </div>
      </div>
    );
  } else {
    return (
      <div className="user-block">
        <Link
          to={AppRoute.LOGIN}
          className="user-block__link"
        // onClick={onUserBlockClick}
        >Sign in</Link>
      </div>
    );
  }
};

UserBlock.propTypes = {
  authorizationStatus: PropTypes.oneOf([AuthorizationStatus.AUTH, AuthorizationStatus.NO_AUTH]).isRequired,
  userInfo: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthorizationStatus(state),
  userInfo: getUserInfo(state),
});

export {UserBlock};

export default connect(mapStateToProps, null)(UserBlock);
