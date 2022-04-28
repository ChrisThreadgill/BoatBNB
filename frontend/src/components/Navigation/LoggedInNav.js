import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import * as sessionActions from "../../store/session";

function LoggedInNav() {
  const dispatch = useDispatch();
  const sessionUser = useSelector((state) => state.session.user);
  const { id } = sessionUser;

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <nav className="logged__in__nav">
      <div>
        <NavLink to="/">Home</NavLink>
      </div>
      <div>
        <NavLink to={`/users/${id}/inbox`}>Inbox</NavLink>
        <NavLink to={`/users/${id}/profile`}>{(sessionUser.firstName, sessionUser.lastName)}</NavLink>
        <NavLink to="/signup">dont press</NavLink>
        <button onClick={logout}>Logout</button>
      </div>
      {/* <button onClick={logout}>hello</button> */}
    </nav>
  );
}

export default LoggedInNav;
