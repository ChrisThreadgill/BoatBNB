import "./BoatPageRatingDisplay.css";
import { FaStar, FaSoap, FaCouch, FaWrench } from "react-icons/fa";

const moment = require("moment");

function BoatPageRatingDisplay({ boatRating }) {
  // console.log(boatRating, "------------------------");
  //

  return (
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
  );
}

export default BoatPageRatingDisplay;
