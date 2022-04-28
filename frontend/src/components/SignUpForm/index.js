import { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import "./SignUpForm.css";

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
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors([]);
      return dispatch(sessionActions.signup({ firstName, lastName, email, password, roleId })).catch(async (res) => {
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
      });
    }
    return setErrors(["Confirm Password field must be the same as the Password field"]);
  };

  return (
    <div>
      <h1>hello from the form signup page</h1>
      <div className="signup__form__container">
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
            <button type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;
