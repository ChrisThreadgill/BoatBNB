import ProviderBoard from "./ProviderBoard";

import { Switch, Route } from "react-router-dom";
import ProviderBoats from "./ProviderBoats";
import ProviderBookings from "./ProviderBookings";
import UserInbox from "../UserInbox";
import ProviderPanel from "./ProviderPanel";
import "./ProviderPagesCSS/ProviderView.css";
function ProviderView({ userId }) {
  return (
    <div className="provider__view">
      <div className="provider__nav__panel">
        <ProviderPanel userId={userId} />
      </div>
      <div className="provider__board">
        <ProviderBoats />

        <ProviderBookings />

        <UserInbox />
      </div>
    </div>
  );
}

export default ProviderView;
