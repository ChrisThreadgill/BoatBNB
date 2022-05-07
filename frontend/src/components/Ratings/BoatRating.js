import { useEffect } from "react";
import "./BoatRating/BoatRatingCard.css";

import {
  FaStar,
  // FaUserClock,
  // FaRegSmile,
  // FaWheelchair,
  FaSoap,
  FaCouch,
  // FaHandshakeAltSlash,
  // FaHammer,
  // FaRegHandshake,
  // FaRegClock,
  // FaHorse,
  // FaHorseHead,
  // FaAirbnb,
  // FaRegCalendarAlt,
  // FaRegCalendarCheck,
  // FaRegCalendarMinus,
  FaWrench,
} from "react-icons/fa";
import "./Rating.css";

function BoatRating({
  rating,
  setRating,
  hover,
  setHover,
  func,
  setFunc,
  funcHover,
  setFuncHover,
  comfort,
  setComfort,
  comfortHover,
  setComfortHover,
  clean,
  setClean,
  cleanHover,
  setCleanHover,
  boat,
}) {
  useEffect(() => {
    const average = (func + comfort + clean) / 3;
    const overall = Math.ceil(average);
    setRating(overall);
  }, [setRating, func, comfort, clean]);
  return (
    <div className="star__rating__form">
      <h1>Average</h1>
      <div>
        {[...Array(5)].map((star, idx) => {
          const currentVal = idx + 1;
          return (
            <label key={idx + 1}>
              <input
                className="star__radio__buttons"
                type="radio"
                name="rating"
                value={currentVal}
                onClick={() => {
                  setRating(currentVal);
                  setFunc(currentVal);
                  setComfort(currentVal);
                  setClean(currentVal);
                }}
              ></input>
              <FaStar
                size={30}
                color={currentVal <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                className="user__stars"
                onMouseEnter={() => setHover(currentVal)}
                onMouseLeave={() => setHover(null)}
              ></FaStar>
            </label>
          );
        })}
      </div>

      <h1>Functionality</h1>
      <div>
        {[...Array(5)].map((star, idx) => {
          const currentVal = idx + 1;
          return (
            <label key={idx + 1}>
              <input
                className="star__radio__buttons"
                type="radio"
                name="rating"
                value={currentVal}
                onClick={() => setFunc(currentVal)}
              ></input>
              <FaWrench
                size={22}
                color={currentVal <= (funcHover || func) ? "#ffc107" : "#e4e5e9"}
                className="user__stars"
                onMouseEnter={() => setFuncHover(currentVal)}
                onMouseLeave={() => setFuncHover(null)}
              ></FaWrench>
            </label>
          );
        })}
      </div>

      <h1>Comfort</h1>
      <div>
        {[...Array(5)].map((star, idx) => {
          const currentVal = idx + 1;
          return (
            <label key={idx + 1}>
              <input
                className="star__radio__buttons"
                type="radio"
                name="rating"
                value={currentVal}
                onClick={() => setComfort(currentVal)}
              ></input>
              <FaCouch
                size={22}
                color={currentVal <= (comfortHover || comfort) ? "#ffc107" : "#e4e5e9"}
                className="user__stars"
                onMouseEnter={() => setComfortHover(currentVal)}
                onMouseLeave={() => setComfortHover(null)}
              ></FaCouch>
            </label>
          );
        })}
      </div>

      <div>
        <h1>Cleanliness</h1>
        {[...Array(5)].map((star, idx) => {
          const currentVal = idx + 1;
          return (
            <label key={idx + 1}>
              <input
                className="star__radio__buttons"
                type="radio"
                name="rating"
                value={currentVal}
                onClick={() => setClean(currentVal)}
              ></input>
              <FaSoap
                size={22}
                color={currentVal <= (cleanHover || clean) ? "#ffc107" : "#e4e5e9"}
                className="user__stars"
                onMouseEnter={() => setCleanHover(currentVal)}
                onMouseLeave={() => setCleanHover(null)}
              ></FaSoap>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default BoatRating;
