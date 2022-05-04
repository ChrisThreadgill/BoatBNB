import { useEffect } from "react";

import {
  FaStar,
  FaUserClock,
  FaRegSmile,
  FaHandshakeAltSlash,
  FaRegHandshake,
  FaRegClock,
  FaAirbnb,
  FaRegCalendarAlt,
  FaRegCalendarCheck,
  FaRegCalendarMinus,
  FaWrench,
} from "react-icons/fa";
import "./Rating.css";

function UserRating({
  rating,
  setRating,
  hover,
  setHover,
  friend,
  setFriend,
  friendHover,
  setFriendHover,
  punc,
  setPunc,
  puncHover,
  setPuncHover,
  trust,
  setTrust,
  trustHover,
  setTrustHover,
  user,
}) {
  useEffect(() => {
    const average = (friend + punc + trust) / 3;
    const overall = Math.ceil(average);
    setRating(overall);
  }, [friend, punc, trust]);
  return (
    <div>
      <h1>Average</h1>
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
                setFriend(currentVal);
                setPunc(currentVal);
                setTrust(currentVal);
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

      <h1>Friendliness</h1>
      {[...Array(5)].map((star, idx) => {
        const currentVal = idx + 1;
        return (
          <label key={idx + 1}>
            <input
              className="star__radio__buttons"
              type="radio"
              name="rating"
              value={currentVal}
              onClick={() => setFriend(currentVal)}
            ></input>
            <FaRegSmile
              size={22}
              color={currentVal <= (friendHover || friend) ? "#ffc107" : "#e4e5e9"}
              className="user__stars"
              onMouseEnter={() => setFriendHover(currentVal)}
              onMouseLeave={() => setFriendHover(null)}
            ></FaRegSmile>
          </label>
        );
      })}
      <h1>Punctuality</h1>
      {[...Array(5)].map((star, idx) => {
        const currentVal = idx + 1;
        return (
          <label key={idx + 1}>
            <input
              className="star__radio__buttons"
              type="radio"
              name="rating"
              value={currentVal}
              onClick={() => setPunc(currentVal)}
            ></input>
            <FaRegClock
              size={22}
              color={currentVal <= (puncHover || punc) ? "#ffc107" : "#e4e5e9"}
              className="user__stars"
              onMouseEnter={() => setPuncHover(currentVal)}
              onMouseLeave={() => setPuncHover(null)}
            ></FaRegClock>
          </label>
        );
      })}
      <h1>Trustworthy</h1>
      {[...Array(5)].map((star, idx) => {
        const currentVal = idx + 1;
        return (
          <label key={idx + 1}>
            <input
              className="star__radio__buttons"
              type="radio"
              name="rating"
              value={currentVal}
              onClick={() => setTrust(currentVal)}
            ></input>
            <FaRegHandshake
              size={22}
              color={currentVal <= (trustHover || trust) ? "#ffc107" : "#e4e5e9"}
              className="user__stars"
              onMouseEnter={() => setTrustHover(currentVal)}
              onMouseLeave={() => setTrustHover(null)}
            ></FaRegHandshake>
          </label>
        );
      })}
    </div>
  );
}

export default UserRating;
