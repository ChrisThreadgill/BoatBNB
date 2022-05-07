import { NavLink, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import "./Navigation.css";
import { Redirect } from "react-router-dom";
import { FaHome } from "react-icons/fa";

import { useEffect } from "react";
import * as sessionActions from "../../store/session";

function LoggedInNav() {
  const history = useHistory();
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = sessionUser;
  console.log(sessionUser);

  // const [isLoaded, setIsLoaded] = useState(false);
  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
    // dispatch(sessionActions.restoreUser()).then(() => setIsLoaded(true)
    history.push("/");
  };
  const profilePic = sessionUser.profilePicture;
  console.log(sessionUser.profilePicture);

  return (
    <nav className="logged__in__nav">
      <div className="home__nav__div">
        <NavLink to="/">
          <FaHome className="home__button__nav"></FaHome>
        </NavLink>
      </div>
      <div className="profile__nav__links">
        <NavLink to={`/users/${id}/profile`}>Welcome Back {sessionUser && sessionUser.firstName}!</NavLink>
        <NavLink to={`/users/${id}/profile`}>
          {sessionUser && <img className="nav__profile__picture" src={`/api/images/${profilePic}`} />}
        </NavLink>
        <div>
          <button onClick={logout}>Logout</button>
        </div>
      </div>
      {/* <button onClick={logout}>hello</button> */}
    </nav>
  );
}

export default LoggedInNav;
