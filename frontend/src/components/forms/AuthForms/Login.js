import React, { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
import "./LoginForm.css";
import { FaEyeSlash } from "react-icons/fa/index.esm";
import { FaEye } from "react-icons/fa";
import { ExternalLink } from "react-external-link";

function LoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [credSelect, setCredSelect] = useState(false);
  const [noCreds, setNoCreds] = useState(false);
  const [authErr, setAuthErr] = useState(false);
  const [password, setPassword] = useState("");
  const [noPassword, setNoPassword] = useState(false);
  const [errors, setErrors] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);
  const history = useHistory();

  const demoLogin = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };
  useEffect(() => {
    for (let i = 0; i < errors.length; i++) {
      const err = errors[i];
      if (err.includes("email")) setNoCreds(true);
      if (err.includes("password")) setNoPassword(true);
      if (err.includes("credentials")) setAuthErr(true);
    }
  }, [errors]);
  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  if (sessionUser) return <Redirect to="/" />;
  return (
    <div className="login__form__div">
      <form onSubmit={handleSubmit} className="login__form">
        {/* <img src="/BNB.svg" className="boat__bnb__logo" /> */}
        <h2>Welcome back! Please Log in</h2>

        <div className={authErr || noCreds ? "login__form__input__container__error" : "login__form__input__container"}>
          {authErr || credSelect || noCreds || credential ? (
            <div
              className={
                authErr || noCreds ? "login__input__header__selected__error" : "login__input__header__selected"
              }
            >
              Email
              {noCreds ? <span className="login__credential__error"> - *Valid e-mail required</span> : null}
              {authErr ? <span className="login__credential__error"> - *Invalid Credentials</span> : null}
            </div>
          ) : null}

          <input
            className="login__form__input"
            type="text"
            placeholder={credSelect || authErr || noCreds ? null : "Email"}
            onFocus={() => setCredSelect(true)}
            onBlur={() => setCredSelect(false)}
            value={credential}
            onChange={(e) => {
              setAuthErr(false);
              setNoCreds(false);
              setCredential(e.target.value);
            }}
          />
        </div>
        <div
          className={
            noPassword || authErr
              ? "login__form__password__input__container__error"
              : "login__form__password__input__container"
          }
        >
          <input
            className={noPassword ? "login__form__input__error" : "login__form__input"}
            type={passwordShow ? "text" : "password"}
            placeholder={noPassword ? `Password -*Required` : "Password"}
            value={password}
            onChange={(e) => {
              setNoPassword(false);
              setAuthErr(false);
              setPassword(e.target.value);
            }}
          />
          {passwordShow ? (
            <FaEye className="password__show__hide" onClick={() => setPasswordShow(false)}></FaEye>
          ) : (
            <FaEyeSlash className="password__show__hide" onClick={() => setPasswordShow(true)}></FaEyeSlash>
          )}
          {/* <div>eye</div> */}
        </div>

        <button className="login__form__button" type="submit">
          Log In
        </button>
      </form>
      <div className="demo__user__login" onClick={demoLogin}>
        Click here to login as a demo user!
      </div>
      <div className="login__form__break"></div>
      <div className="about__links__auth__container">
        <div>
          <ExternalLink
            className="about__links__auth__container__external__link"
            href="https://github.com/ChrisThreadgill"
          >
            <div className="about__links__github__icon"></div>
            <div>Chris' GitHub</div>
          </ExternalLink>
        </div>
        <div>
          <div>
            <ExternalLink
              className="about__links__auth__container__external__link"
              href="https://www.linkedin.com/in/chris-threadgill-b05090185/"
            >
              <img
                className="about__links__linkedin__icon"
                src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original-wordmark.svg"
              />
              <div>Chris' LinkedIn</div>
            </ExternalLink>
          </div>
        </div>
        <div>
          <ExternalLink
            className="about__links__auth__container__external__link"
            href="https://christhreadgill.github.io/"
          >
            <div className="about__links__portfolio__icon">CT</div>
            <div>Chris' Portfolio</div>
          </ExternalLink>
        </div>
      </div>
      <div className="login__form__redirect">
        New to BoatBNB? |<div onClick={() => history.push("/sign-up")}> Sign up</div>
      </div>
    </div>
  );
}

export default LoginForm;
