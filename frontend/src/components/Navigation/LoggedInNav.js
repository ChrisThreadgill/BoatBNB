import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Navigation.css";
import { Redirect } from "react-router-dom";
import { FaHome, FaDharmachakra, FaSignOutAlt } from "react-icons/fa";

import { useEffect } from "react";
import * as sessionActions from "../../store/session";
import * as profileActions from "../../store/userProfile";

function LoggedInNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = sessionUser;

  const clearUser = (e) => {
    // e.preventDefault();
    dispatch(profileActions.profileCleanUp());
    dispatch(profileActions.getUserProfile(id));
  };
  // const [isLoaded, setIsLoaded] = useState(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)
    history.push("/");
  };
  const profilePic = sessionUser.profilePicture;

  return (
    <nav className="logged__in__nav">
      <div className="home__nav__div">
        <NavLink to="/">
          <FaDharmachakra className="home__button__nav"></FaDharmachakra>
        </NavLink>
      </div>
      <div className="nav__bar__center">
        <img src="/BNB.svg" className="boat__bnb__logo" />
        <NavLink to={`/users/${id}/profile`}>Welcome Back {sessionUser && sessionUser.firstName}!</NavLink>
      </div>
      <div className="sign__out__button__container">
        <div className="profile__nav__links">
          <NavLink to={`/users/${id}/profile`} onClick={clearUser}>
            {sessionUser && <img className="nav__profile__picture" src={`/api/images/${profilePic}`} />}
          </NavLink>
          <h4>Profile</h4>
        </div>
        <div onClick={logout} className="sign__out__button__div">
          {/* <button onClick={logout}>
          </button> */}
          <FaSignOutAlt className="sign__out__button"></FaSignOutAlt>
          <h4>Sign-Out</h4>
        </div>
      </div>
      {/* <button onClick={logout}>hello</button> */}
    </nav>
  );
}

export default LoggedInNav;
