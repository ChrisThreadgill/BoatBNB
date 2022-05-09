import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import "./UserLoginForm.css";

function UserLoginForm() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) return <Redirect to="/" />;

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
        <img src="/BNB.svg" className="boat__bnb__logo" />
        <h2>Welcome to Boat BnB!</h2>
        <h3>Let's get signed in!</h3>
        <ul>
          {errors.map((error, idx) => (
            <li key={idx}>{error}</li>
          ))}
        </ul>

        <div>
          <input type="text" placeholder="EMAIL" value={credential} onChange={(e) => setCredential(e.target.value)} />
        </div>
        <div>
          <input
            type="password"
            placeholder="PASSWORD"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button className="login__form__button" type="submit">
          Log In
        </button>
      </form>
    </div>
  );
}

export default UserLoginForm;
