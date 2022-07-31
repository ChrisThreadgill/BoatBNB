import { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash } from "react-icons/fa/index.esm";
import { FaEye } from "react-icons/fa";
import { ExternalLink } from "react-external-link";
import "./SignUpForm.css";
import axios from "axios";

import { Redirect } from "react-router-dom";

function SignUpForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [roleId, setRoleId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameSelected, setFirstNameSelected] = useState(false);
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [noFirstNameErr, setNoFirstNameErr] = useState(false);
  const [lastName, setLastName] = useState("");
  const [lastNameSelected, setLastNameSelected] = useState(false);
  const [lastNameErr, setLastNameErr] = useState(false);
  const [noLastNameErr, setNoLastNameErr] = useState(false);
  const [email, setEmail] = useState("");
  const [emailSelected, setEmailSelected] = useState(false);
  const [emailErr, setEmailErr] = useState(false);
  const [newEmailErr, setNewEmailErr] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordMatch, setPasswordMatch] = useState(false);
  const [passwordErr, setPasswordErr] = useState(false);
  const [passwordLengthErr, setPasswordLengthErr] = useState(false);
  const [confirmPasswordLengthErr, setConfirmPasswordLengthErr] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);

  const [submitted, setSubmitted] = useState(false);
  const history = useHistory();

  useEffect(() => {}, [dispatch]);

  const emailExp = new RegExp(
    /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/
  );

  useEffect(() => {
    setEmailErr(false);
    setFirstNameErr(false);
    setLastNameErr(false);
    setPasswordMatch(false);
    setConfirmPasswordLengthErr(false);
    setPasswordLengthErr(false);
    if (submitted && !emailExp.test(email)) setEmailErr(true);
    if (emailExp.test(email)) setEmailErr(false);
    if (firstName.length > 75) setFirstNameErr(true);
    if (firstName.length < 75) setFirstNameErr(false);
    if (lastName.length > 75) setLastNameErr(true);
    if (lastName.length < 75) setLastNameErr(false);
    if (submitted && password.length < 6) setPasswordLengthErr(true);
    if (password.length > 6) setPasswordLengthErr(false);
    if (submitted && confirmPassword.length < 6) setConfirmPasswordLengthErr(true);
    if (confirmPassword.length > 6) setConfirmPasswordLengthErr(false);
  }, [email, firstName, lastName, password, confirmPassword]);

  const checkErrors = async () => {
    let err = 0;
    if (firstName.length > 75) {
      err++;
      setFirstNameErr(true);
    }
    if (!firstName.trim()) {
      err++;
      setNoFirstNameErr(true);
    }
    if (lastName.length > 75) {
      err++;
      setLastNameErr(true);
    }
    if (!lastName.trim()) {
      err++;
      setNoLastNameErr(true);
    }
    if (!emailExp.test(email)) {
      err++;
      setEmailErr(true);
    }
    if (!password.trim() || !confirmPassword.trim()) {
      err++;
      setPasswordErr(true);
    }
    if (password.length < 6) {
      err++;
      setPasswordLengthErr(true);
    }
    if (confirmPassword.length < 6) {
      err++;
      setConfirmPasswordLengthErr(true);
    }

    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);
    if (password === confirmPassword) {
      const errs = await checkErrors();
      if (errs > 0) return;

      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password })).catch(async (res) => {
        const data = await res.json();
        console.log(data, "---------------");
        if (data.errors) setNewEmailErr(true);
        if (!data.errors) {
          setRoleId("");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
        }
      });
    }
    return setPasswordMatch(true);
  };

  if (sessionUser) return <Redirect to="/" />;
  return (
    <div className="signup__form__container">
      <div className="sign__up__form__header">
        {/* <img src="/BNB.svg" className="boat__bnb__logo" /> */}
        Sign up
        {/* <h3>Welcome to Boat BNB!</h3> */}
      </div>
      <form onSubmit={handleSubmit} className="signup__form">
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <div
          className={
            firstNameErr || noFirstNameErr ? "sign__up__input__container__error" : "sign__up__input__container"
          }
        >
          {firstNameSelected || noFirstNameErr || firstNameErr || firstName ? (
            <div className="sign__up__input__header__selected">
              First Name
              {noFirstNameErr ? <span className="sign__up__input__header__selected__error"> - *Required</span> : null}
              {firstNameErr ? (
                <span className="sign__up__input__header__selected__error"> - *75 character limit</span>
              ) : null}
            </div>
          ) : null}

          <input
            className="signup__form__inputs"
            placeholder={firstNameSelected || noFirstNameErr || firstNameErr ? null : "First Name"}
            type="text"
            onFocus={() => {
              setFirstNameSelected(true);
              setNoFirstNameErr(false);
            }}
            onBlur={() => setFirstNameSelected(false)}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            // required
          />
        </div>
        <div
          className={noLastNameErr || lastNameErr ? "sign__up__input__container__error" : "sign__up__input__container"}
        >
          {lastNameSelected || noLastNameErr || lastNameErr || lastName ? (
            <div className="sign__up__input__header__selected">
              Last Name
              {noLastNameErr ? <span className="sign__up__input__header__selected__error"> - *Required</span> : null}
              {lastNameErr ? (
                <span className="sign__up__input__header__selected__error"> - *75 character limit</span>
              ) : null}
            </div>
          ) : null}

          <input
            className="signup__form__inputs"
            placeholder={lastNameSelected || noLastNameErr || lastNameErr ? null : "Last Name"}
            onFocus={() => {
              setLastNameSelected(true);
              setNoLastNameErr(false);
            }}
            onBlur={() => setLastNameSelected(false)}
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            // required
          />
        </div>
        <div className={emailErr || newEmailErr ? "sign__up__input__container__error" : "sign__up__input__container"}>
          {emailSelected || emailErr || newEmailErr || email ? (
            <div className="sign__up__input__header__selected">
              Email
              {emailErr ? (
                <span className="sign__up__input__header__selected__error"> - *Valid e-mail required</span>
              ) : null}
              {newEmailErr ? (
                <span className="sign__up__input__header__selected__error">
                  {" "}
                  - *Email is already in use please login or try another email
                </span>
              ) : null}
            </div>
          ) : null}

          <input
            className="signup__form__inputs"
            placeholder={emailSelected || emailErr ? null : "Email"}
            onFocus={() => {
              setNewEmailErr(false);
              setEmailSelected(true);
            }}
            onBlur={() => setEmailSelected(false)}
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            // required
          />
        </div>
        <div
          className={
            passwordErr || passwordMatch || passwordLengthErr
              ? "sign__up__password__headers__errors "
              : "sign__up__password__headers"
          }
        >
          Password {passwordErr ? <span className="sign__up__input__header__selected__error"> - *Required</span> : null}{" "}
          {passwordMatch ? (
            <span className="sign__up__input__header__selected__error"> - *Passwords must match</span>
          ) : null}{" "}
        </div>
        {passwordLengthErr ? (
          <span className="sign__up__input__header__selected__error"> - *Must be at least 6 characters</span>
        ) : null}{" "}
        <div
          className={
            passwordErr || passwordMatch || passwordLengthErr
              ? "sign__up__password__input__container__errors"
              : "sign__up__password__input__container"
          }
        >
          <input
            className="signup__form__inputs"
            onFocus={() => setPasswordErr(false)}
            type={passwordShow ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            // required
          />
          {passwordShow ? (
            <FaEye className="password__show__hide" onClick={() => setPasswordShow(false)}></FaEye>
          ) : (
            <FaEyeSlash className="password__show__hide" onClick={() => setPasswordShow(true)}></FaEyeSlash>
          )}
        </div>
        <div
          className={
            passwordErr || passwordMatch || confirmPasswordLengthErr
              ? "sign__up__password__headers__errors"
              : "sign__up__password__headers"
          }
        >
          Confirm password{" "}
          {passwordErr ? <span className="sign__up__input__header__selected__error"> - *Required</span> : null}{" "}
          {passwordMatch ? (
            <span className="sign__up__input__header__selected__error"> - *Passwords must match</span>
          ) : null}{" "}
        </div>
        {confirmPasswordLengthErr ? (
          <span className="sign__up__input__header__selected__error"> - *Must be at least 6 characters</span>
        ) : null}{" "}
        <div
          className={
            passwordErr || passwordMatch || confirmPasswordLengthErr
              ? "sign__up__password__input__container__errors"
              : "sign__up__password__input__container"
          }
        >
          <input
            className="signup__form__inputs"
            type={passwordShow ? "text" : "password"}
            onFocus={() => setPasswordErr(false)}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            // required
          />
          {passwordShow ? (
            <FaEye className="password__show__hide" onClick={() => setPasswordShow(false)}></FaEye>
          ) : (
            <FaEyeSlash className="password__show__hide" onClick={() => setPasswordShow(true)}></FaEyeSlash>
          )}
        </div>
        <div></div>
        <button className="sign__up__button" type="submit">
          SIGN UP
        </button>
      </form>
      <div className="signup__form__break"></div>
      <div className="sign__up__about__links">
        <div className="sign__up__about__container">
          <ExternalLink
            className="about__links__auth__container__external__link__signup"
            href="https://github.com/ChrisThreadgill"
          >
            <div className="sign__up__github__icon"></div>
            <span>Github</span>
          </ExternalLink>
        </div>
        <div className="sign__up__about__container">
          <ExternalLink
            className="about__links__auth__container__external__link__signup"
            href="https://www.linkedin.com/in/chris-threadgill-b05090185/"
          >
            <img
              className="sign__up__linkedin__icon"
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
            />

            <span>LinkedIn</span>
          </ExternalLink>
        </div>
        <div className="sign__up__about__container">
          <ExternalLink
            className="about__links__auth__container__external__link__signup"
            href="https://www.christhreadgill.com"
          >
            <div className="sign__up__portfolio__icon">CT</div>
            <span>Portfolio</span>
          </ExternalLink>
        </div>
      </div>
      <div className="sign__up__form__redirect">
        Already have an account? |<div onClick={() => history.push("/login")}> Log In</div>
      </div>
    </div>
  );
}

export default SignUpForm;
