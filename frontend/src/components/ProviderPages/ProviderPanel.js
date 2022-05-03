import { NavLink } from "react-router-dom";
import "./ProviderPagesCSS/ProviderPanel.css";

function ProviderPanel({ userId }) {
  //TODO make these routes after setting up database
  return (
    <div className="provider__nav__panel">
      <NavLink to={`/${userId}/boats`}>Manage Boats</NavLink>
      <NavLink to={`/${userId}/bookings`}>Bookings</NavLink>
      <NavLink to={`/${userId}/inbox`}>Inbox</NavLink>
      {/* <NavLink to={`/users/${userId}/profile}`}>Edit Profile</NavLink> */}
    </div>
  );
}

export default ProviderPanel;
