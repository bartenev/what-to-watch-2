import React, {createRef} from "react";
import {Operations} from "../../reducer/user/user";
import PropTypes from "prop-types";
import {connect} from "react-redux";

const SignIn = (props) => {
  const {logIn, onCloseButtonClick} = props;
  const emailRef = createRef();
  const passwordRef = createRef();

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <div className="logo">
          <a href="main.html"
            className="logo__link"
            onClick={(evt) => {
              evt.preventDefault();
              onCloseButtonClick();
            }}
          >
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
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
                id="user-email" ref={emailRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input className="sign-in__input" type="password" placeholder="Password" name="user-password"
                id="user-password" ref={passwordRef}/>
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button className="sign-in__btn" type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <footer className="page-footer">
        <div className="logo">
          <a href="main.html" className="logo__link logo__link--light">
            <span className="logo__letter logo__letter--1">W</span>
            <span className="logo__letter logo__letter--2">T</span>
            <span className="logo__letter logo__letter--3">W</span>
          </a>
        </div>

        <div className="copyright">
          <p>© 2019 What to watch Ltd.</p>
        </div>
      </footer>
    </div>
  );
};

SignIn.propTypes = {
  logIn: PropTypes.func.isRequired,
  onCloseButtonClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  logIn(data) {
    dispatch(Operations.logIn(data));
  },
});

export {SignIn};

export default connect(null, mapDispatchToProps)(SignIn);
