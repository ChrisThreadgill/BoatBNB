import React, { useState } from "react";
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
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);
  const history = useHistory();

  if (sessionUser) return <Redirect to="/" />;

  const demoLogin = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential: "demo@user.io", password: "password" })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  return (
    <div className="login__form__div">
      <form onSubmit={handleSubmit} className="login__form">
        {/* <img src="/BNB.svg" className="boat__bnb__logo" /> */}
        <h2>Welcome back! Please Log in</h2>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx} className="list__errors__signin">
              {error}
            </li>
          ))}
        </ul>

        <div className="login__form__input__container">
          <input
            className="login__form__input"
            type="text"
            placeholder="Email"
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
          />
        </div>
        <div className="login__form__input__container">
          <input
            className="login__form__input"
            type={passwordShow ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
            href="https://www.christhreadgill.com"
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
