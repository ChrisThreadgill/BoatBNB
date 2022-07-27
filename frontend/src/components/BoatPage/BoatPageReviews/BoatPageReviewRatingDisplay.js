import "./BoatPageRatingDisplay.css";
import { FaStar, FaSoap, FaCouch, FaWrench } from "react-icons/fa";
import { useHistory } from "react-router-dom";

const moment = require("moment");

function BoatPageReviewRatingDisplay({ rating }) {
  const history = useHistory();
  // console.log(rating, "------------------------");
  //

  return (
    <>
      <div className="average__rating__review__display">
        <div className="user__review__card__average__rating__container">
          <div>
            {[...Array(rating.average)].map((star, idx) => {
              return <FaStar key={idx} color={"#72d4ba"} size={17}></FaStar>;
            })}
          </div>
          <div>{`(${rating.average}/5) Average`}</div>
        </div>
        <div className="user__review__card__rating__container">
          <div>
            {[...Array(rating.cleanliness)].map((star, idx) => {
              return <FaSoap key={idx} color={"#72d4ba"} size={13}></FaSoap>;
            })}
          </div>
          <div>{`(${rating.cleanliness}/5) Cleanliness`}</div>
        </div>

        <div className="user__review__card__rating__container">
          <div>
            {[...Array(rating.functional)].map((star, idx) => {
              return <FaWrench key={idx} color={"#72d4ba"} size={13}></FaWrench>;
            })}
          </div>
          <div>{`(${rating.functional}/5) Functionality`}</div>
        </div>

        <div className="user__review__card__rating__container">
          <div>
            {[...Array(rating.comfort)].map((star, idx) => {
              return <FaCouch key={idx} color={"#72d4ba"} size={13}></FaCouch>;
            })}
          </div>
          <div>{`(${rating.comfort}/5) Comfort`}</div>
        </div>
        <div className="user__rating__date">{moment(rating.createdAt).format("MMMM Do YYYY")}</div>
      </div>
    </>
  );
}

export default BoatPageReviewRatingDisplay;
