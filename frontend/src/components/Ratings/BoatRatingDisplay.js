import { useSelector } from "react-redux";
import "../Boats/BoatCSS/BoatCard.css";

import {
  FaStar,
  // FaUserClock,
  FaRegSmile,
  // FaHandshakeAltSlash,
  FaRegHandshake,
  FaRegClock,
  FaWrench,
  FaSoap,
  FaCouch,
  // FaAirbnb,
  // FaRegCalendarAlt,
  // FaRegCalendarCheck,
  // FaRegCalendarMinus,
  // FaWrench,
} from "react-icons/fa";

function BoatRatingDisplay({ boat }) {
  console.log(boat);
  const boatRatings = boat?.BoatRatings;
  // console.log(boat, "in the boat rating display");

  const averageBoatRatings = boatRatings?.reduce(
    (prev, curr, idx) => {
      prev.average = prev.average + curr.average;

      prev.functional = prev.functional + curr.functional;
      prev.comfort = prev.comfort + curr.comfort;
      prev.cleanliness = prev.cleanliness + curr.cleanliness;
      prev.count = ++idx;
      if (prev.count === boatRatings.length) {
        prev.average = Math.ceil(prev.average / prev.count);

        prev.functional = Math.ceil(prev.functional / prev.count);
        prev.comfort = Math.ceil(prev.comfort / prev.count);
        prev.cleanliness = Math.ceil(prev.cleanliness / prev.count);
      }
      return prev;
    },
    { average: null, functional: null, comfort: null, cleanliness: null, count: null }
  );

  return (
    <div>
      {/* {sessionUser?.id === userProfile.id ? <h1>What others are saying about your boat!</h1> : null} */}
      {averageBoatRatings?.average && averageBoatRatings?.average >= 1 && (
        <div className="boat__rating__display__container">
          <div>
            {[...Array(averageBoatRatings?.average)].map((star, idx) => {
              return <FaStar size={15} color="#72d4ba" key={idx}></FaStar>;
            })}
          </div>
          <div className="boat__rating__display__average">
            {averageBoatRatings?.average}
            {/* <span>({boatRatings?.length + boat.boatReviewsNoRating.length} ratings)</span> */}
          </div>

          {/* <div>
            <h2>Functionality</h2>
            <div>
              {[...Array(averageBoatRatings?.functional)].map((smile, idx) => {
                return <FaWrench key={idx} color={"#ffc107"}></FaWrench>;
              })}
            </div>
          </div>
          <div>
            <h2>Comfort</h2>
            <div>
              {[...Array(averageBoatRatings?.comfort)].map((clock, idx) => {
                return <FaCouch key={idx} color={"#ffc107"}></FaCouch>;
              })}
            </div>
          </div>
          <div>
            <h2>Cleanliness</h2>
            <div>
              {[...Array(averageBoatRatings?.cleanliness)].map((handshake, idx) => {
                return <FaSoap key={idx} color={"#ffc107"}></FaSoap>;
              })}
            </div>
          </div> */}
        </div>
      )}
    </div>
  );
}

export default BoatRatingDisplay;
