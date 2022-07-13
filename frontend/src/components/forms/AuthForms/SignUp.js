import { useEffect, useState } from "react";
import * as sessionActions from "../../../store/session";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEyeSlash } from "react-icons/fa/index.esm";
import { FaEye } from "react-icons/fa";
import "./SignUpForm.css";
import axios from "axios";

import { Redirect } from "react-router-dom";

function SignUpForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);

  const [roleId, setRoleId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [file, setFile] = useState(null);
  const [fileError, setFileError] = useState("");
  const [errors, setErrors] = useState([]);
  const [passwordShow, setPasswordShow] = useState(false);
  const history = useHistory();

  async function postImage({ image }) {
    const formData = new FormData();
    formData.append("image", image);

    const result = await axios.post("/api/images", formData, { headers: { "Content-Type": "multipart/form-data" } });
    return result.data;
  }

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const result = await postImage({ image: file });
      const profilePicture = result.url;

      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password, profilePicture, roleId })).catch(
        async (res) => {
          const data = await res.json();
          if (!data.errors) {
            setRoleId("");
            setFirstName("");
            setLastName("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");
          }

          if (data && data.errors) setErrors(data.errors);
        }
      );
    }
    return setErrors(["Confirm Password field must be the same as the Password field"]);
  };

  return (
    <div className="signup__form__container">
      <div className="sign__up__form__header">
        {/* <img src="/BNB.svg" className="boat__bnb__logo" /> */}
        <>Sign up</>
        {/* <h3>Welcome to Boat BNB!</h3> */}
      </div>
      <form onSubmit={handleSubmit} className="signup__form">
        {/* <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul> */}
        <div className="sign__up__input__container">
          <input
            className="signup__form__inputs"
            placeholder="First name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="sign__up__input__container">
          <input
            className="signup__form__inputs"
            placeholder="Last name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="sign__up__input__container">
          <input
            className="signup__form__inputs"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="sign__up__input__container">
          <input
            className="signup__form__inputs"
            placeholder="Password"
            type={passwordShow ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {passwordShow ? (
            <FaEye className="password__show__hide" onClick={() => setPasswordShow(false)}></FaEye>
          ) : (
            <FaEyeSlash className="password__show__hide" onClick={() => setPasswordShow(true)}></FaEyeSlash>
          )}
        </div>
        <div className="sign__up__input__container">
          <input
            className="signup__form__inputs"
            placeholder="Confirm password"
            type={passwordShow ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
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
          <div className="sign__up__github__icon"></div>
          <span>Github</span>
        </div>
        <div className="sign__up__about__container">
          <img
            className="sign__up__linkedin__icon"
            src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linkedin/linkedin-original.svg"
          />

          <span>LinkedIn</span>
        </div>
        <div className="sign__up__about__container">
          <div className="sign__up__portfolio__icon">CT</div>
          <span>Portfolio</span>
        </div>
      </div>
      <div className="sign__up__form__redirect">
        Already have an account? |<div onClick={() => history.push("/login")}> Log In</div>
      </div>
    </div>
  );
}

export default SignUpForm;
