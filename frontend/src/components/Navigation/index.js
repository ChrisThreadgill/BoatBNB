import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import LoggedInNav from "./LoggedInNav";
import * as sessionActions from "../../store/session";
import "./Navigation.css";
import MenuButton from "./MenuButton";

function Navigation({ isLoaded }) {
  const sessionUser = useSelector((state) => state.session.user);

  const dispatch = useDispatch();

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  let sessionLinks;
  if (sessionUser) {
    sessionLinks = (
      <>
        <LoggedInNav></LoggedInNav>
        <MenuButton />
        {/* <NavLink to="/login">test</NavLink>
        <NavLink to="/signup">test sesssion</NavLink>
        <button onClick={logout}>hello</button> */}
      </>
    );
  } else {
    sessionLinks = (
      <>
        <nav className="visitor__nav">
          <NavLink to="/login">Log In</NavLink>
          <NavLink to="/sign-up">Sign Up</NavLink>
        </nav>
      </>
    );
  }

  return <nav className="nav__bar__container">{isLoaded && sessionLinks}</nav>;
}

export default Navigation;
