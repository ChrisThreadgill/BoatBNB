import "./BoatPageInformation.css";

import { FaDharmachakra, FaTimes } from "react-icons/fa";
import BoatRatingDisplay from "../../Ratings/BoatRatingDisplay";
import OwnerInformationCard from "./OwnerInformation/OwnerInformationCard";
import BoatInformationCard from "./BoatInformation/BoatInformationCard";

function BoatPageInformation({ boat }) {
  //

  return (
    <div className="boat__information__container">
      <BoatInformationCard boat={boat}></BoatInformationCard>
      <OwnerInformationCard boat={boat}></OwnerInformationCard>
    </div>
  );
}

export default BoatPageInformation;
