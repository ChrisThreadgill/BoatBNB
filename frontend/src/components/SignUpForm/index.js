import { useEffect, useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
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
      console.log("working-------------------------");
      console.log(profilePicture);
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
    <div>
      <div className="signup__form__container">
        <div className="sign__up__form__header">
          <img src="/BNB.svg" className="boat__bnb__logo" />
          <h3>Welcome to Boat BNB!</h3>
          <h2>Easy Sign-Up gets you out on the water making memories faster!</h2>
        </div>
        <form onSubmit={handleSubmit} className="signup__form">
          <ul>
            {errors.map((error, idx) => (
              <li key={idx}>{error}</li>
            ))}
          </ul>
          <div className="signup__form__inputs">
            <label>
              First Name
              <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} required />
            </label>
            <label>
              Last Name
              <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} required />
            </label>
            <label>
              Email
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <label>
              Password
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <label>
              Confirm Password
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>
            <div className="radio__buttons">
              <label>
                <input
                  type="radio"
                  value="2"
                  name="renter"
                  checked={roleId === "2"}
                  onChange={(e) => {
                    setRoleId(e.target.value);
                  }}
                />
                Renter?
              </label>
              <label>
                <input
                  type="radio"
                  value="1"
                  name="photoType"
                  checked={roleId === "1"}
                  onChange={(e) => {
                    setRoleId(e.target.value);
                  }}
                />
                Boat Provider?
              </label>
            </div>
            <label>
              Profile Picture
              <input
                onChange={(e) => {
                  setFile(e.target.files[0]);
                }}
                className="choose__file__button"
                type="file"
                name="file"
                accept="image/*"
              />
            </label>
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
