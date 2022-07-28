import "./BoatPageRatingDisplay.css";
import { FaStar, FaSoap, FaCouch, FaWrench } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const moment = require("moment");

function BoatPageRatingDisplay({ boatRating }) {
  const history = useHistory();
  // console.log(boatRating, "------------------------");
  //

  return (
    <div className="boat__review__card__container">
      <div className="review__card__user__profile">
        {boatRating.User.profilePicture ? (
          <img
            className="boat__information__profile__picture"
            onClick={() => history.push(`/users/${boatRating.User.id}`)}
            src={boatRating.User.profilePicture ? `${boatRating.User.profilePicture}` : null}
          ></img>
        ) : (
          <div
            className="boat__information__no__profile__picture"
            onClick={() => history.push(`/users/${boatRating.User.id}`)}
          >
            {boatRating.User.firstName.slice(0, 1).toUpperCase()}
          </div>
        )}
        <div>{`${boatRating.User.firstName.slice(0, 1).toUpperCase()}${boatRating.User.firstName.slice(1)}`}</div>
      </div>

      <div className="average__rating__review__display">
        <div className="user__review__card__average__rating__container">
          <div>
            {[...Array(boatRating.average)].map((star, idx) => {
              return <FaStar key={idx} color={"#72d4ba"} size={17}></FaStar>;
            })}
          </div>
          <div>{`(${boatRating.average}/5) Average`}</div>
        </div>
        <div className="user__review__card__rating__container">
          <div>
            {[...Array(boatRating.cleanliness)].map((star, idx) => {
              return <FaSoap key={idx} color={"#72d4ba"} size={13}></FaSoap>;
            })}
          </div>
          <div>{`(${boatRating.cleanliness}/5) Cleanliness`}</div>
        </div>

        <div className="user__review__card__rating__container">
          <div>
            {[...Array(boatRating.functional)].map((star, idx) => {
              return <FaWrench key={idx} color={"#72d4ba"} size={13}></FaWrench>;
            })}
          </div>
          <div>{`(${boatRating.functional}/5) Functionality`}</div>
        </div>

        <div className="user__review__card__rating__container">
          <div>
            {[...Array(boatRating.comfort)].map((star, idx) => {
              return <FaCouch key={idx} color={"#72d4ba"} size={13}></FaCouch>;
            })}
          </div>
          <div>{`(${boatRating.comfort}/5) Comfort`}</div>
        </div>
        <div className="user__rating__date">{moment(boatRating.createdAt).format("MMMM Do YYYY")}</div>
      </div>
    </div>
  );
}

export default BoatPageRatingDisplay;
