import "./UserReviewCardRatingDisplay.css";
import { useEffect, useState } from "react";
import { FaStar, FaRegSmile, FaRegHandshake, FaRegClock } from "react-icons/fa";
const moment = require("moment");

function UserReviewCardRatingDisplay({ userRating }) {
  // console.log(userRating, "in the rating card display");
  // console.log(average);

  return (
    <div className="average__rating__review__display">
      <div className="user__review__card__average__rating__container">
        <div>
          {[...Array(userRating.average)].map((star, idx) => {
            return <FaStar key={idx} color={"#72d4ba"} size={17}></FaStar>;
          })}
        </div>
        <div>{`(${userRating.average}/5) Average`}</div>
      </div>
      <div className="user__review__card__rating__container">
        <div>
          {[...Array(userRating.friendliness)].map((star, idx) => {
            return <FaRegSmile key={idx} color={"#72d4ba"} size={13}></FaRegSmile>;
          })}
        </div>
        <div>{`(${userRating.friendliness}/5) Kind`}</div>
      </div>

      <div className="user__review__card__rating__container">
        <div>
          {[...Array(userRating.trustworthy)].map((star, idx) => {
            return <FaRegHandshake key={idx} color={"#72d4ba"} size={13}></FaRegHandshake>;
          })}
        </div>
        <div>{`(${userRating.trustworthy}/5) Trustworthy`}</div>
      </div>

      <div className="user__review__card__rating__container">
        <div>
          {[...Array(userRating.punctuality)].map((star, idx) => {
            return <FaRegClock key={idx} color={"#72d4ba"} size={13}></FaRegClock>;
          })}
        </div>
        <div>{`(${userRating.punctuality}/5) Punctual`}</div>
      </div>
      <div className="user__rating__date">{moment(userRating.createdAt).format("MMMM Do YYYY")}</div>
    </div>
  );
}

export default UserReviewCardRatingDisplay;
