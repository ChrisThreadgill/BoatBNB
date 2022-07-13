import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import * as sessionActions from "../../store/session";

function MenuButton({ user }) {
  // console.log(user);
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
  }, [showMenu]);

  const logout = (e) => {
    e.preventDefault();
    dispatch(sessionActions.logout());
  };

  return (
    <div className="nav__menu__button__container">
      <div className="nav__menu__static__options">List Your Boat</div>
      <div className="nav__menu__static__options">Bookings</div>
      <img className="nav__profile__picture" src={`/api/images/${user.profilePicture}`} onClick={openMenu} />
      <div className="nav__menu__picture__container"></div>
      {showMenu && (
        <div className="nav__menu__dropdown">
          <div className="nav__menu__username__container">
            <span>Hi, {user.firstName}</span>
            <div>View Profile</div>
          </div>
          <div className="nav__menu__options">
            <span>Owner dashboard</span>
            <span>My boats</span>
          </div>
          <div className="nav__menu__options">
            <span>My account</span>
            <span>List your boat</span>
          </div>
          <div className="logout__button" onClick={logout}>
            Log Out
          </div>
        </div>
      )}
      {/* <img className="nav__profile__picture" src={`/api/images/${user.profilePicture}`} onClick={openMenu} /> */}

      {/* <button onClick={openMenu}>MENU</button> */}
    </div>
  );
}

export default MenuButton;
