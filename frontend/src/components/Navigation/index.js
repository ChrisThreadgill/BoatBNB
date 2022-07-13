import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "./LoggedInNav";
import * as sessionActions from "../../store/session";
import { useHistory } from "react-router-dom";
import { FaHome, FaDharmachakra, FaSignOutAlt, FaSignInAlt } from "react-icons/fa";
import "./Navigation.css";
import MenuButton from "./MenuButton";
import LoginFormModal from "../../context/LoginFormModal";
import SignUpFormModal from "../../context/SignUpFormModal";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);
  const [errors, setErrors] = useState([]);
  const history = useHistory();

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
            <NavLink to={`/`}>
              <img src="/BNB.svg" className="boat__bnb__logo" />
            </NavLink>
          </div>

          <div className="visitor__nav__auth">
            {/* <div className="sign__in__buttons__div"> */}
            <div onClick={() => history.push("/sign-up")}>Sign up</div>
            <div onClick={() => history.push("/login")}>Log in</div>
            {/* </div> */}
          </div>
        </nav>
      </>
    );
  }

  return <nav className="nav__bar__container">{isLoaded && sessionLinks}</nav>;
}

export default Navigation;
