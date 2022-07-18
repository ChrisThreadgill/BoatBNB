import "./BoatInformationCard.css";
import { FaDharmachakra, FaTimes } from "react-icons/fa";
import BoatRatingDisplay from "../../../Ratings/BoatRatingDisplay";

function BoatInformationCard({ boat }) {
  //

  return (
    <>
      <h1>
        {boat.year} {boat.model}
      </h1>
      <div className="boat__page__rating__display__container">
        <BoatRatingDisplay boat={boat}></BoatRatingDisplay>
        <div className="boat__page__city__state">
          {boat.city}, <span>{boat.state}</span>
        </div>

        {boat?.captain ? (
          <div className="boat__card__captain__container">
            {" "}
            <FaDharmachakra className="boat__page__captain" size={25}></FaDharmachakra>
            <div className="boat__page__captain__text">Captained</div>
          </div>
        ) : (
          <div className="boat__card__captain__container">
            <FaTimes className="boat__page__no__captain" size={22}></FaTimes>
            <div className="boat__page__no__captain__text">No Captain</div>
          </div>
        )}
      </div>
      <div className="boat__information__about">
        <h3>Boat will be docked/picked up at</h3>
        <div>{boat.marina}</div>
      </div>
      <div className="boat__information__about">
        <h3>About the boat</h3>

        <div>{boat.accessories}</div>
      </div>
    </>
  );
}

export default BoatInformationCard;
