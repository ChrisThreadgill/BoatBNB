import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "./LoggedInNav";
import * as sessionActions from "../../store/session";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Navigation.css";
import MenuButton from "./MenuButton";
import LoginFormModal from "../../context/LoginFormModal";
import SignUpFormModal from "../../context/SignUpFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  // console.log(process.env.DB_HOST);
  const credential = "demo@user.io";
  const password = "password";
  const dispatch = useDispatch();
  const demoLogin = () => {
    setErrors([]);
    return dispatch(sessionActions.login({ credential, password })).catch(async (res) => {
      const data = await res.json();
      if (data && data.errors) setErrors(data.errors);
    });
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <LoggedInNav></LoggedInNav>
      </>
    );
  } else {
    sessionLinks = (
      <>
        <nav className="logged__in__nav">
          <div className="home__nav__div">
            <NavLink to="/">
              <FaDharmachakra className="home__button__nav"></FaDharmachakra>
            </NavLink>
          </div>
          <div className="nav__bar__center">
            <NavLink to={`/`}>
              <img src="/BNB.svg" className="boat__bnb__logo" />
            </NavLink>
          </div>
          <div className="sign__out__button__container">
            <div className="profile__nav__links">
              <SignUpFormModal></SignUpFormModal>
              <h4>Sign-Up</h4>
            </div>
            <div className="sign__in__buttons__div">
              <LoginFormModal className="login__nav__button"></LoginFormModal>

              <h4>Login</h4>
              <button className="demo__login__button" onClick={demoLogin}>
                Login As Demo
              </button>
            </div>
          </div>
        </nav>
      </>
    );
  }

  return <nav className="nav__bar__container">{isLoaded && sessionLinks}</nav>;
}

export default Navigation;
