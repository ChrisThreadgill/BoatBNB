import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import * as sessionActions from "../../store/session";

function MenuButton({ user }) {
  // console.log(user, " user in the nav menu button");
  const history = useHistory();
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu, user]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="nav__menu__button__container">
      <div
        className={user.roleId === 1 ? "nav__menu__static__options__owner" : "nav__menu__static__options"}
        onClick={() => history.push("/new-listing")}
      >
        List Your Boat
      </div>
      <div
        className={user.roleId === 1 ? "nav__menu__static__options__owner" : "nav__menu__static__options"}
        onClick={() => history.push("/bookings")}
      >
        Bookings
      </div>

      {user.profilePicture ? (
        <img
          className="nav__profile__picture"
          src={user.profilePicture ? `${user.profilePicture}` : null}
          onClick={openMenu}
        />
      ) : (
        <div className="nav__menu__no__profile" onClick={openMenu}>
          {user.firstName.slice(0, 1).toUpperCase()}
          {user.lastName.slice(0, 1).toUpperCase()}
        </div>
      )}

      <div className="nav__menu__picture__container"></div>
      {showMenu && (
        <div className={user.roleId === 1 ? "nav__menu__dropdown" : "nav__menu__dropdown__no__owner"}>
          <div
            className={user.roleId === 1 ? "nav__menu__username__container__owner" : "nav__menu__username__container"}
          >
            <span>Hi, {`${user.firstName.slice(0, 1).toUpperCase()}${user.firstName.slice(1)}`}</span>
            <div
              onClick={() => {
                history.push(`/users/${user.id}`);
                window.location.reload();
              }}
            >
              View Profile
            </div>
          </div>
          {user.roleId === 1 ? (
            <div className="nav__menu__options__owner">
              {/* <span>Owner dashboard</span> */}
              <span onClick={() => history.push("/manage-boats")}>My boats</span>
            </div>
          ) : (
            <div className="nav__menu__options">
              {/* <span>Owner dashboard</span> */}
              <span onClick={() => history.push("/bookings")}>My bookings</span>
            </div>
          )}

          <div className={user.roleId === 1 ? "nav__menu__options__owner" : "nav__menu__options"}>
            <span onClick={() => history.push("/account-settings")}>My account</span>
            <span onClick={() => history.push("/new-listing")}>List your boat</span>
          </div>
          <div className={user.roleId === 1 ? "logout__button__owner" : "logout__button"} onClick={logout}>
            Log Out
          </div>
        </div>
      )}
    </div>
  );
}

export default MenuButton;
