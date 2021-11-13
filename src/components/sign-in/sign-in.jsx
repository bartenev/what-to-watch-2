import React, {createRef} from "react";
import {Operations} from "../../reducer/user/user";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import {AppRoute} from "../../const";
import Footer from "../footer/footer";

const SignIn = (props) => {
  const {logIn, onLogoClick} = props;
  const emailRef = createRef();
  const passwordRef = createRef();

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <Link
            to={AppRoute.ROOT}
            className="logo__link"
            // onClick={onLogoClick}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </Link>
        </div>

        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form
          action="#"
          className="sign-in__form"
          onSubmit={(evt) => {
            evt.preventDefault();
            logIn({
              email: emailRef.current.value,
              password: passwordRef.current.value,
            });
          }}
        >
          <div className="sign-in__fields">
            <div className="sign-in__field">
              <input className="sign-in__input" type="email" placeholder="Email address" name="user-email"
                id="user-email" ref={emailRef} required/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" ref={passwordRef} required/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
};

SignIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  onLogoClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logIn(data) {
    dispatch(Operations.logIn(data));
  },
});

export {SignIn};

export default connect(null, mapDispatchToProps)(SignIn);
